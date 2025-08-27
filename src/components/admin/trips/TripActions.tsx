import React, { useState } from 'react';
import { 
  Edit, 
  Trash, 
  Copy,
  Eye,
  EyeOff,
  MoreVertical 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Trip {
  id: string;
  name: string;
  price: number;
  category: string;
  active: boolean;
  created: string;
  bookings: number;
}

interface TripActionsProps {
  trip: Trip;
  onUpdate?: (id: string, data: Partial<Trip>) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const TripActions: React.FC<TripActionsProps> = ({ 
  trip,
  onUpdate = () => {},
  onDelete = () => {},
  onDuplicate = () => {} 
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleToggleStatus = () => {
    const newStatus = !trip.active;
    // This would be a call to Supabase in a real implementation
    onUpdate(trip.id, { active: newStatus });
    
    toast.success(`Trip ${newStatus ? 'activated' : 'deactivated'} successfully`);
  };

  const handleDuplicate = () => {
    // This would be a call to Supabase in a real implementation
    onDuplicate(trip.id);
    toast.success('Trip duplicated successfully');
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // This would be a call to Supabase in a real implementation
    onDelete(trip.id);
    setShowDeleteDialog(false);
    toast.success('Trip deleted successfully');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onClick={() => toast.info('Edit feature coming soon')}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
          {trip.active ? (
            <DropdownMenuItem className="cursor-pointer" onClick={handleToggleStatus}>
              <EyeOff className="h-4 w-4 mr-2" />
              Deactivate
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer" onClick={handleToggleStatus}>
              <Eye className="h-4 w-4 mr-2" />
              Activate
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{trip.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TripActions;