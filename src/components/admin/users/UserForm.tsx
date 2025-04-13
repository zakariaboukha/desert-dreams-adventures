
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface NewUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (userId: number) => void;
}

const initialFormData: NewUserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'customer',
  password: ''
};

const UserForm: React.FC<UserFormProps> = ({ open, onOpenChange, onSuccess }) => {
  const [formData, setFormData] = useState<NewUserFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
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
      // In a real implementation, this would come from the backend
      const newUserId = Math.floor(Math.random() * 1000) + 7;
      
      console.log("User created (mock):", {
        id: newUserId,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: formData.role,
        status: 'active',
        lastLogin: 'Never',
        actions: 0
      });

      // Close dialog and notify parent of success
      onOpenChange(false);
      onSuccess(newUserId);
      
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName">Last name</label>
                <Input 
                  id="lastName" 
                  placeholder="Enter last name"
                  value={formData.lastName}
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
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role">Role</label>
              <select 
                id="role" 
                className="w-full border border-input rounded-md p-2"
                value={formData.role}
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
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
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
  );
};

export default UserForm;
