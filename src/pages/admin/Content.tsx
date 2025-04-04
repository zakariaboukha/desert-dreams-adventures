
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

const Content: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Content Management</h1>
        <p className="text-muted-foreground">
          Manage website content and pages.
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Content Management System</CardTitle>
          <CardDescription>
            This section is under development. Coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-10">
          <div className="text-center space-y-3">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium">Content Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              We're building tools to help you manage your website content, pages, and blog posts.
              This module will be available in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;
