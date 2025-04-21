import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  defaultValue={user?.name?.split(" ")[0] || "Admin"}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  defaultValue={user?.name?.split(" ")[1] || "User"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email || "admin@example.com"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+971 4 123 4567" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" defaultValue="Administrator" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Management" />
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/avatars/01.png" alt="@admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>

            <div className="space-y-2 w-full">
              <Button variant="outline" className="w-full">
                Upload New Picture
              </Button>
              <Button variant="outline" className="w-full">
                Remove Picture
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Update your password and security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by enabling
                two-factor authentication.
              </p>
              <Button variant="outline">
                Enable Two-Factor Authentication
              </Button>
            </div>

            <Button>Update Security Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
