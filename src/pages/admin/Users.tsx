
import React, { useState } from 'react';
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
import { Search, Plus, UserPlus, MoreHorizontal, Eye, Edit, Key, Ban, MoveDown, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

interface NewUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

const initialFormData: NewUserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'customer',
  password: ''
};

const Users: React.FC = () => {
  const [newUserFormData, setNewUserFormData] = useState<NewUserFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdUserId, setCreatedUserId] = useState<number | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewUserFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUserFormData(prev => ({ ...prev, role: e.target.value }));
  };

  const isFormValid = () => {
    return (
      newUserFormData.firstName.trim() !== '' &&
      newUserFormData.lastName.trim() !== '' &&
      newUserFormData.email.trim() !== '' &&
      newUserFormData.password.trim() !== ''
    );
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create a mock new user ID
      const newUserId = Math.max(...users.map(user => user.id)) + 1;
      setCreatedUserId(newUserId);
      
      console.log("User created (mock):", {
        id: newUserId,
        name: `${newUserFormData.firstName} ${newUserFormData.lastName}`,
        email: newUserFormData.email,
        role: newUserFormData.role,
        status: 'active',
        lastLogin: 'Never',
        actions: 0
      });

      // Show success dialog
      setShowSuccessDialog(true);
      setDialogOpen(false);
      
      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setNewUserFormData(initialFormData);
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <form onSubmit={handleCreateUser}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName">First name</label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter first name"
                      value={newUserFormData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName">Last name</label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter last name"
                      value={newUserFormData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input 
                    id="email" 
                    placeholder="Enter email address" 
                    type="email"
                    value={newUserFormData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role">Role</label>
                  <select 
                    id="role" 
                    className="w-full border border-input rounded-md p-2"
                    value={newUserFormData.role}
                    onChange={handleRoleChange}
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password">Temporary Password</label>
                  <Input 
                    id="password" 
                    placeholder="Generate password" 
                    type="password"
                    value={newUserFormData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !isFormValid()}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </DialogFooter>
            </form>
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

      {/* User Creation Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-xl">User Created Successfully</DialogTitle>
            <p className="text-muted-foreground mt-2">
              The user "<span className="font-medium">{newUserFormData.firstName} {newUserFormData.lastName}</span>" has been created.
            </p>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border-t border-b py-4">
              <p className="text-center text-sm text-muted-foreground">
                What would you like to do next?
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={handleCreateAnotherUser}
            >
              Create Another User
            </Button>
            <Button 
              className="w-full sm:w-auto"
              onClick={handleCloseSuccessDialog}
            >
              Back to Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
