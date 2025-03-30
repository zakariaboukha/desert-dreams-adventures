
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";

export function BookingsTable() {
  const bookings = [
    {
      id: 'B-1234',
      customer: { name: 'John Doe', email: 'john.doe@example.com', avatar: '/images/avatars/john.jpg' },
      excursion: 'Desert Safari Adventure',
      date: '2023-06-15',
      participants: 2,
      amount: '$350',
      status: 'confirmed'
    },
    {
      id: 'B-1235',
      customer: { name: 'Jane Smith', email: 'jane.smith@example.com', avatar: '/images/avatars/jane.jpg' },
      excursion: 'Oasis Expedition',
      date: '2023-06-17',
      participants: 4,
      amount: '$480',
      status: 'pending'
    },
    {
      id: 'B-1236',
      customer: { name: 'Robert Johnson', email: 'robert@example.com', avatar: '' },
      excursion: 'Ancient Ruins Tour',
      date: '2023-06-18',
      participants: 3,
      amount: '$290',
      status: 'confirmed'
    },
    {
      id: 'B-1237',
      customer: { name: 'Sarah Williams', email: 'sarah@example.com', avatar: '/images/avatars/sarah.jpg' },
      excursion: 'Mountain Trek',
      date: '2023-06-20',
      participants: 2,
      amount: '$520',
      status: 'cancelled'
    },
    {
      id: 'B-1238',
      customer: { name: 'Michael Brown', email: 'michael@example.com', avatar: '' },
      excursion: 'Cultural Village Tour',
      date: '2023-06-21',
      participants: 5,
      amount: '$210',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 border-green-600';
      case 'pending': return 'text-yellow-600 border-yellow-600';
      case 'cancelled': return 'text-red-600 border-red-600';
      default: return '';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Excursion</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="hidden lg:table-cell">Participants</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={booking.customer.avatar} />
                    <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{booking.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{booking.customer.email}</p>
                  </div>
                  <div className="md:hidden">{booking.customer.name.split(' ')[0]}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{booking.excursion}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell className="hidden lg:table-cell">{booking.participants}</TableCell>
              <TableCell>{booking.amount}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`capitalize ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
