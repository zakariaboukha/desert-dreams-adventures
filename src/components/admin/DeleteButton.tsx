
import React, { useState } from 'react';
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface DeleteButtonProps {
  itemId: string | number;
  itemType: string;
  itemName?: string;
  onDeleteSuccess: (id: string | number) => void;
}

export function DeleteButton({ 
  itemId, 
  itemType, 
  itemName, 
  onDeleteSuccess 
}: DeleteButtonProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Random success/failure (90% success rate)
          const isSuccess = Math.random() < 0.9;
          if (isSuccess) {
            resolve(true);
          } else {
            reject(new Error('Simulated server error'));
          }
        }, 1000);
      });
      
      // Success case
      toast({
        title: `${itemType} Deleted`,
        description: itemName 
          ? `"${itemName}" has been permanently deleted.`
          : `The ${itemType.toLowerCase()} has been permanently deleted.`,
      });
      
      onDeleteSuccess(itemId);
    } catch (error) {
      // Error case
      toast({
        title: `Failed to Delete ${itemType}`,
        description: `The ${itemType.toLowerCase()} could not be deleted. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleDeleteClick}
        className="hover:bg-red-100 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemName 
                ? `Delete "${itemName}"?`
                : `Delete this ${itemType.toLowerCase()}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              {itemName ? ' selected ' : ' '}
              {itemType.toLowerCase()} and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
