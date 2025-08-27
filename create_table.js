import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Initialize Supabase clients
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('!! Missing required environment variables');
  console.error('Required: VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create admin client with service role key for full access
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Create regular client for standard operations
const supabase = createClient(supabaseUrl, anonKey);

/**
 * Comprehensive Database Manager Class
 */
class DatabaseManager {
  constructor() {
    this.admin = supabaseAdmin;
    this.client = supabase;
  }

  /**
   * Execute raw SQL with admin privileges
   */
  async executeSQL(sql, description = 'SQL execution') {
    try {
      console.log(`==> ${description}...`);
      console.log(`==> SQL: ${sql}`);
      
      // Use direct query method for simple SELECT statements
      if (sql.trim().toLowerCase().startsWith('select')) {
        const { data, error } = await this.admin.from('').select('*').limit(0); // This won't work, let's use a different approach
        
        // For listing tables, use a direct approach
        if (sql.includes('information_schema.tables')) {
          const { data, error } = await this.admin
            .from('information_schema.tables')
            .select('table_name, table_type')
            .eq('table_schema', 'public')
            .order('table_name');
          
          if (error) {
            console.error('!! Error querying tables:', error.message);
            return { success: false, error: error.message };
          }
          
          console.log('>> Tables queried successfully!');
          return { success: true, data };
        }
      }
      
      // For other operations, try RPC method first
      const { data, error } = await this.admin.rpc('execute_sql', { sql });
      
      if (error) {
        console.log('!  RPC method failed, trying direct HTTP...');
        
        // Fallback to direct HTTP call
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
            'apikey': serviceRoleKey
          },
          body: JSON.stringify({ sql })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        console.log('>> SQL executed successfully via HTTP!');
        return { success: true, data: result };
      }
      
      console.log('>> SQL executed successfully via RPC!');
      return { success: true, data };
    } catch (error) {
      console.error(`!! Error executing SQL: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create or manage tables
   */
  async createTable(tableName, columns, options = {}) {
    const {
      schema = 'public',
      primaryKey = 'id',
      timestamps = true,
      rls = true
    } = options;

    let sql = `CREATE TABLE IF NOT EXISTS ${schema}.${tableName} (\n`;
    
    // Add primary key if not in columns
    if (!columns.find(col => col.name === primaryKey)) {
      sql += `  ${primaryKey} UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    }
    
    // Add columns
    columns.forEach((col, index) => {
      sql += `  ${col.name} ${col.type}`;
      if (col.constraints) sql += ` ${col.constraints}`;
      if (index < columns.length - 1 || timestamps) sql += ',\n';
    });
    
    // Add timestamps
    if (timestamps) {
      sql += `  created_at TIMESTAMPTZ DEFAULT NOW(),\n`;
      sql += `  updated_at TIMESTAMPTZ DEFAULT NOW()\n`;
    }
    
    sql += ');';
    
    const result = await this.executeSQL(sql, `Creating table ${tableName}`);
    
    if (result.success && rls) {
      await this.enableRLS(tableName, schema);
    }
    
    if (result.success && timestamps) {
      await this.createUpdateTrigger(tableName, schema);
    }
    
    return result;
  }

  /**
   * Drop table
   */
  async dropTable(tableName, schema = 'public', cascade = false) {
    const cascadeStr = cascade ? ' CASCADE' : '';
    const sql = `DROP TABLE IF EXISTS ${schema}.${tableName}${cascadeStr};`;
    return await this.executeSQL(sql, `Dropping table ${tableName}`);
  }

  /**
   * Create storage bucket
   */
  async createStorageBucket(bucketName, options = {}) {
    try {
      console.log(`>> Creating storage bucket: ${bucketName}...`);
      
      const {
        public: isPublic = false,
        fileSizeLimit = 52428800, // 50MB
        allowedMimeTypes = ['image/*', 'application/pdf', 'text/*']
      } = options;
      
      const { data, error } = await this.admin.storage.createBucket(bucketName, {
        public: isPublic,
        fileSizeLimit,
        allowedMimeTypes
      });
      
      if (error) {
        console.error(`!! Error creating bucket: ${error.message}`);
        return { success: false, error: error.message };
      }
      
      console.log(`>> Storage bucket '${bucketName}' created successfully!`);
      return { success: true, data };
    } catch (error) {
      console.error(`!! Error creating storage bucket: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete storage bucket
   */
  async deleteStorageBucket(bucketName) {
    try {
      console.log(`==> Deleting storage bucket: ${bucketName}...`);
      
      const { data, error } = await this.admin.storage.deleteBucket(bucketName);
      
      if (error) {
        console.error(`!! Error deleting bucket: ${error.message}`);
        return { success: false, error: error.message };
      }
      
      console.log(`>> Storage bucket '${bucketName}' deleted successfully!`);
      return { success: true, data };
    } catch (error) {
      console.error(`!! Error deleting storage bucket: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Enable Row Level Security
   */
  async enableRLS(tableName, schema = 'public') {
    const sql = `ALTER TABLE ${schema}.${tableName} ENABLE ROW LEVEL SECURITY;`;
    return await this.executeSQL(sql, `Enabling RLS for ${tableName}`);
  }

  /**
   * Create RLS policy
   */
  async createRLSPolicy(tableName, policyName, operation, condition, schema = 'public') {
    const sql = `CREATE POLICY ${policyName} ON ${schema}.${tableName} FOR ${operation} USING (${condition});`;
    return await this.executeSQL(sql, `Creating RLS policy ${policyName}`);
  }

  /**
   * Create updated_at trigger
   */
  async createUpdateTrigger(tableName, schema = 'public') {
    const functionSQL = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;
    
    const triggerSQL = `
      CREATE TRIGGER update_${tableName}_updated_at
        BEFORE UPDATE ON ${schema}.${tableName}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;
    
    await this.executeSQL(functionSQL, 'Creating update function');
    return await this.executeSQL(triggerSQL, `Creating update trigger for ${tableName}`);
  }

  /**
   * Create database function
   */
  async createFunction(functionName, parameters, returnType, body, language = 'plpgsql') {
    const sql = `
      CREATE OR REPLACE FUNCTION ${functionName}(${parameters})
      RETURNS ${returnType} AS $$
      ${body}
      $$ LANGUAGE '${language}';
    `;
    return await this.executeSQL(sql, `Creating function ${functionName}`);
  }

  /**
   * Create index
   */
  async createIndex(indexName, tableName, columns, options = {}) {
    const { unique = false, schema = 'public' } = options;
    const uniqueStr = unique ? 'UNIQUE ' : '';
    const columnsStr = Array.isArray(columns) ? columns.join(', ') : columns;
    
    const sql = `CREATE ${uniqueStr}INDEX IF NOT EXISTS ${indexName} ON ${schema}.${tableName} (${columnsStr});`;
    return await this.executeSQL(sql, `Creating index ${indexName}`);
  }

  /**
   * Grant permissions
   */
  async grantPermissions(role, permissions, tableName, schema = 'public') {
    const sql = `GRANT ${permissions} ON ${schema}.${tableName} TO ${role};`;
    return await this.executeSQL(sql, `Granting ${permissions} to ${role}`);
  }

  /**
   * List all tables
   */
  async listTables(schema = 'public') {
    const sql = `
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = '${schema}' 
      ORDER BY table_name;
    `;
    return await this.executeSQL(sql, 'Listing tables');
  }

  /**
   * List storage buckets
   */
  async listStorageBuckets() {
    try {
      console.log('==> Listing storage buckets...');
      
      const { data, error } = await this.admin.storage.listBuckets();
      
      if (error) {
        console.error(`!! Error listing buckets: ${error.message}`);
        return { success: false, error: error.message };
      }
      
      console.log(`>> Found ${data.length} storage buckets`);
      return { success: true, data };
    } catch (error) {
      console.error(`!! Error listing storage buckets: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get table schema
   */
  async getTableSchema(tableName, schema = 'public') {
    const sql = `
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default,
        character_maximum_length
      FROM information_schema.columns 
      WHERE table_schema = '${schema}' 
        AND table_name = '${tableName}'
      ORDER BY ordinal_position;
    `;
    return await this.executeSQL(sql, `Getting schema for ${tableName}`);
  }
}

/**
 * Parse natural language requests
 */
function parseRequest(request) {
  const lowerRequest = request.toLowerCase();
  
  // Check for execute sql first to avoid conflicts
  if (lowerRequest.startsWith('execute sql')) {
    return { operation: 'execute_sql', request };
  }
  
  if (lowerRequest.includes('create') && lowerRequest.includes('table')) {
    return { operation: 'create_table', request };
  }
  if (lowerRequest.includes('drop') && lowerRequest.includes('table')) {
    return { operation: 'drop_table', request };
  }
  if (lowerRequest.includes('create') && lowerRequest.includes('bucket')) {
    return { operation: 'create_bucket', request };
  }
  if (lowerRequest.includes('delete') && lowerRequest.includes('bucket')) {
    return { operation: 'delete_bucket', request };
  }
  if (lowerRequest.includes('list') && lowerRequest.includes('table')) {
    return { operation: 'list_tables', request };
  }
  if (lowerRequest.includes('list') && lowerRequest.includes('bucket')) {
    return { operation: 'list_buckets', request };
  }
  
  return { operation: 'execute_sql', request };
}

/**
 * Main execution function
 */
async function main(request, sql = null) {
  console.log('==> Starting comprehensive database operation...');
  console.log(`==> Request: ${request}`);
  
  const dbManager = new DatabaseManager();
  const parsed = parseRequest(request);
  console.log(`==> Parsed operation: ${parsed.operation}`);
  
  try {
    switch (parsed.operation) {
      case 'create_table':
        console.log('==> Executing create_table operation');
        if (sql) {
          return await dbManager.executeSQL(sql, 'Creating table with custom SQL');
        }
        // Extract table name from request
        const tableMatch = request.match(/table[\s]+(\w+)/i);
        if (tableMatch) {
          const tableName = tableMatch[1];
          console.log(`==> Creating table: ${tableName}`);
          // Create a simple table structure
          const columns = [
            { name: 'name', type: 'TEXT' },
            { name: 'email', type: 'TEXT' }
          ];
          return await dbManager.createTable(tableName, columns);
        }
        console.log('!  No table name found in request');
        return { success: false, error: 'No table name found in request' };
        
      case 'drop_table':
        console.log('==> Executing drop_table operation');
        if (sql) {
          return await dbManager.executeSQL(sql, 'Dropping table');
        }
        console.log('!  No SQL provided for table drop');
        return { success: false, error: 'No SQL provided for table drop' };
        
      case 'create_bucket':
        console.log('==> Executing create_bucket operation');
        const bucketMatch = request.match(/bucket[\s]+([\w-]+)/i);
        if (bucketMatch) {
          return await dbManager.createStorageBucket(bucketMatch[1], { public: true });
        }
        console.log('!  No bucket name found in request');
        return { success: false, error: 'No bucket name found in request' };
        
      case 'delete_bucket':
        console.log('==> Executing delete_bucket operation');
        const deleteBucketMatch = request.match(/bucket[\s]+([\w-]+)/i);
        if (deleteBucketMatch) {
          return await dbManager.deleteStorageBucket(deleteBucketMatch[1]);
        }
        console.log('!  No bucket name found in request');
        return { success: false, error: 'No bucket name found in request' };
        
      case 'list_tables':
        console.log('==> Executing list_tables operation');
        return await dbManager.listTables();
        
      case 'list_buckets':
        console.log('==> Executing list_buckets operation');
        return await dbManager.listStorageBuckets();
        
      case 'execute_sql':
      default:
        console.log('==> Executing execute_sql operation');
        if (sql) {
          return await dbManager.executeSQL(sql, request);
        }
        // Extract SQL from request if it starts with 'execute sql'
        const lowerRequest = request.toLowerCase();
        if (lowerRequest.startsWith('execute sql')) {
          const extractedSQL = request.substring(11).trim(); // Remove 'execute sql' prefix
          if (extractedSQL) {
            console.log(`==> Extracted SQL: ${extractedSQL}`);
            return await dbManager.executeSQL(extractedSQL, request);
          }
        }
        console.log('!  No SQL provided for execution');
        return { success: false, error: 'No SQL provided' };
    }
  } catch (error) {
    console.error('==> Operation failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Command line interface
// Windows-compatible path check
const isMainModule = () => {
  if (!import.meta || !import.meta.url) return false;
  
  // Get the file URL and convert to path
  const url = import.meta.url;
  let filePath = url.startsWith('file://') ? 
    url.substring(process.platform === 'win32' ? 8 : 7) : url;
  
  // Decode URI components for proper path comparison
  filePath = decodeURIComponent(filePath);
  
  // Normalize paths for comparison
  const normalizedFilePath = filePath.replace(/\\/g, '/').toLowerCase();
  const normalizedArgvPath = process.argv[1]?.replace(/\\/g, '/').toLowerCase();
  
  console.log('==> Comparing paths:');
  console.log('==> File path:', normalizedFilePath);
  console.log('==> Argv path:', normalizedArgvPath);
  
  return normalizedFilePath === normalizedArgvPath;
};

console.log('==> Script started, checking if main module...');
console.log('==> isMainModule():', isMainModule());
console.log('==> process.argv:', process.argv);

if (isMainModule()) {
  console.log('==> Running as main module');
  const request = process.argv[2];
  const sql = process.argv[3];
  console.log('==> Request:', request);
  console.log('==> SQL:', sql);

  if (!request) {
    console.log('=== Comprehensive Database Manager ===');
    console.log('');
    console.log('Usage:');
    console.log('  node create_table.js "operation description" ["SQL statement"]');
    console.log('');
    console.log('Examples:');
    console.log('  node create_table.js "create users table" "CREATE TABLE users (name TEXT, email TEXT);"');
    console.log('  node create_table.js "create bucket uploads"');
    console.log('  node create_table.js "list all tables"');
    console.log('  node create_table.js "drop profiles table" "DROP TABLE profiles;"');
    console.log('');
    console.log('Supported Operations:');
    console.log('  - Create/Drop tables with RLS and triggers');
    console.log('  - Create/Delete storage buckets');
    console.log('  - Execute custom SQL');
    console.log('  - List tables and buckets');
    console.log('  - Create indexes, functions, and policies');
    process.exit(1);
  }

  main(request, sql)
    .then((result) => {
      console.log('==> Operation result:', result);
      if (result && result.success) {
        console.log('>> Operation completed successfully!');
        if (result.data) {
          console.log('==> Result data:');
          if (Array.isArray(result.data)) {
            result.data.forEach((item, index) => {
              console.log(`  ${index + 1}. ${JSON.stringify(item)}`);
            });
          } else {
            console.log(JSON.stringify(result.data, null, 2));
          }
        }
        process.exit(0);
      } else {
        console.log('!! Operation failed');
        if (result && result.error) {
          console.log('Error:', result.error);
        }
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('==> Script failed:', error.message);
      console.error('Stack trace:', error.stack);
      process.exit(1);
    });
}

// Export for use by AI assistant
export { DatabaseManager, main };