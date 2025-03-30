
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RecentBookings() {
  const bookings = [
    {
      id: 'B-1234',
      customer: { name: 'John Doe', email: 'john.doe@example.com', avatar: '/images/avatars/john.jpg' },
      excursion: 'Desert Safari Adventure',
      date: '2023-06-15',
      amount: '$350',
      status: 'confirmed'
    },
    {
      id: 'B-1235',
      customer: { name: 'Jane Smith', email: 'jane.smith@example.com', avatar: '/images/avatars/jane.jpg' },
      excursion: 'Oasis Expedition',
      date: '2023-06-17',
      amount: '$480',
      status: 'pending'
    },
    {
      id: 'B-1236',
      customer: { name: 'Robert Johnson', email: 'robert@example.com', avatar: '' },
      excursion: 'Ancient Ruins Tour',
      date: '2023-06-18',
      amount: '$290',
      status: 'confirmed'
    },
    {
      id: 'B-1237',
      customer: { name: 'Sarah Williams', email: 'sarah@example.com', avatar: '/images/avatars/sarah.jpg' },
      excursion: 'Mountain Trek',
      date: '2023-06-20',
      amount: '$520',
      status: 'cancelled'
    },
    {
      id: 'B-1238',
      customer: { name: 'Michael Brown', email: 'michael@example.com', avatar: '' },
      excursion: 'Cultural Village Tour',
      date: '2023-06-21',
      amount: '$210',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Excursion</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={booking.customer.avatar} />
                    <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{booking.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{booking.customer.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{booking.excursion}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.amount}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`capitalize ${
                    booking.status === 'confirmed' ? 'text-green-600 border-green-600' : 
                    booking.status === 'pending' ? 'text-yellow-600 border-yellow-600' : 
                    'text-red-600 border-red-600'
                  }`}
                >
                  {booking.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
