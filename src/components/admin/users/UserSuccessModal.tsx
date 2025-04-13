
import React from 'react';
import CreationSuccessModal from '@/components/admin/CreationSuccessModal';
import { NewUserFormData } from './UserForm';

interface UserSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAnother: () => void;
  userId?: number;
  userData: NewUserFormData;
}

const UserSuccessModal: React.FC<UserSuccessModalProps> = ({
  open,
  onOpenChange,
  onCreateAnother,
  userId = 1,
  userData,
}) => {
  return (
    <CreationSuccessModal
      open={open}
      onOpenChange={onOpenChange}
      onCreateAnother={onCreateAnother}
      entityId={userId?.toString()}
      entityName={`${userData.firstName} ${userData.lastName}`}
      entityType="User"
      viewPath="/admin/users"
    />
  );
};

export default UserSuccessModal;
