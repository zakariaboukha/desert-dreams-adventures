
import React from 'react';
import { Edit, Copy, EyeOff, Eye, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Excursion {
  id: string;
  name: string;
  price: number;
  category: string;
  active: boolean;
  created: string;
  bookings: number;
}

interface ExcursionActionsProps {
  excursion: Excursion;
}

const ExcursionActions: React.FC<ExcursionActionsProps> = ({ excursion }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/admin/excursions/edit/${excursion.id}`);
  };
  
  const handleDuplicate = () => {
    toast.success(`"${excursion.name}" has been duplicated`);
  };
  
  const handleToggleStatus = () => {
    const newStatus = excursion.active ? 'deactivated' : 'activated';
    toast.success(`"${excursion.name}" has been ${newStatus}`);
  };
  
  const handleDelete = () => {
    toast.success(`"${excursion.name}" has been deleted`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
          <span className="sr-only">Open menu</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </DropdownMenuItem>
        {excursion.active ? (
          <DropdownMenuItem onClick={handleToggleStatus} className="cursor-pointer">
            <EyeOff className="h-4 w-4 mr-2" />
            Deactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleToggleStatus} className="cursor-pointer">
            <Eye className="h-4 w-4 mr-2" />
            Activate
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleDelete} className="text-destructive cursor-pointer">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExcursionActions;
