
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Edit } from 'lucide-react';
import UserTable from '@/components/admin/users/UserTable';
import UserForm, { NewUserFormData } from '@/components/admin/users/UserForm';
import UserSuccessModal from '@/components/admin/users/UserSuccessModal';

// Mock users data
const users = [
  {
    id: 1,
    name: 'Ahmed Al-Farsi',
    email: 'ahmed@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 hours ago',
    actions: 35
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'staff',
    status: 'active',
    lastLogin: '1 day ago',
    actions: 18
  },
  {
    id: 3,
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '3 days ago',
    actions: 7
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david@example.com',
    role: 'staff',
    status: 'inactive',
    lastLogin: '2 weeks ago',
    actions: 0
  },
  {
    id: 5,
    name: 'Sara Johnson',
    email: 'sara@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '4 hours ago',
    actions: 12
  },
  {
    id: 6,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '1 week ago',
    actions: 3
  },
];

const initialFormData: NewUserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'customer',
  password: ''
};

const Users: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdUserId, setCreatedUserId] = useState<number | null>(null);
  const [newUserFormData, setNewUserFormData] = useState<NewUserFormData>(initialFormData);

  const handleUserCreated = (userId: number) => {
    setCreatedUserId(userId);
    setShowSuccessDialog(true);
  };

  const handleCreateAnotherUser = () => {
    setShowSuccessDialog(false);
    setNewUserFormData(initialFormData);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their access permissions.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage user accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Bulk Edit
            </Button>
          </div>
          
          <UserTable users={users} />
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserForm 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onSuccess={handleUserCreated} 
      />

      {/* User Creation Success Dialog */}
      <UserSuccessModal
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onCreateAnother={handleCreateAnotherUser}
        userId={createdUserId || undefined}
        userData={newUserFormData}
      />
    </div>
  );
};

export default Users;
