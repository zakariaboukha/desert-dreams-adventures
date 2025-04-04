
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, UserPlus, MoreHorizontal, Eye, Edit, Key, Ban, MoveDown } from 'lucide-react';

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

const Users: React.FC = () => {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default">Admin</Badge>;
      case 'staff':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-600">Staff</Badge>;
      default:
        return <Badge variant="outline">Customer</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">Active</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-600">Inactive</Badge>;
    }
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name">First name</label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name">Last name</label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input id="email" placeholder="Enter email address" type="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="role">Role</label>
                <select id="role" className="w-full border border-input rounded-md p-2">
                  <option value="customer">Customer</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Temporary Password</label>
                <Input id="password" placeholder="Generate password" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MoveDown className="h-4 w-4 mr-2" />
                            Impersonate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Key className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Ban className="h-4 w-4 mr-2" />
                            Disable Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
