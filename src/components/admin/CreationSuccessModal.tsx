
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CreationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAnother: () => void;
  entityId?: string;
  entityName: string;
  entityType: string;
  viewPath: string;
}

const CreationSuccessModal: React.FC<CreationSuccessModalProps> = ({
  open,
  onOpenChange,
  onCreateAnother,
  entityId = '1', // Default ID for mock
  entityName,
  entityType,
  viewPath,
}) => {
  const navigate = useNavigate();

  const handleViewEntity = () => {
    onOpenChange(false);
    navigate(`${viewPath}/${entityId}`);
  };

  const handleCreateAnother = () => {
    onCreateAnother();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-xl">{entityType} Created Successfully</DialogTitle>
          <p className="text-muted-foreground mt-2">
            Your {entityType.toLowerCase()} "<span className="font-medium">{entityName}</span>" has been created.
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
            onClick={handleCreateAnother}
          >
            Create Another {entityType}
          </Button>
          <Button 
            className="w-full sm:w-auto"
            onClick={handleViewEntity}
          >
            View {entityType} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreationSuccessModal;
