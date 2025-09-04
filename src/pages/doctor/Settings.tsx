import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Clock,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/doctor/Sidebar";

const Settings = () => {
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "doctor@dentalcare.com",
    phone: "(555) 123-4567",
    specialization: "Orthodontist",
    bio: "Experienced orthodontist with over 15 years of practice. Specialized in modern orthodontic treatments and smile makeovers.",
    address: "123 Dental Street, City, State 12345",
    licenseNumber: "DDS-12345",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1",
  });

  const [clinicSettings, setClinicSettings] = useState({
    clinicName: "DentalCare Clinic",
    workingHours: {
      monday: { start: "09:00", end: "17:00", enabled: true },
      tuesday: { start: "09:00", end: "17:00", enabled: true },
      wednesday: { start: "09:00", end: "17:00", enabled: true },
      thursday: { start: "09:00", end: "17:00", enabled: true },
      friday: { start: "09:00", end: "17:00", enabled: true },
      saturday: { start: "09:00", end: "14:00", enabled: true },
      sunday: { start: "09:00", end: "17:00", enabled: false },
    },
    appointmentDuration: "30",
    bufferTime: "15",
    maxAdvanceBooking: "30",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    newAppointments: true,
    cancellations: true,
    blogComments: false,
    systemUpdates: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "60",
    loginAlerts: true,
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleClinicSettingsUpdate = () => {
    toast({
      title: "Clinic Settings Updated",
      description: "Your clinic settings have been saved successfully.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSecurityUpdate = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been updated.",
    });
  };

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-50 to-white">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and clinic preferences
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="clinic" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                Clinic
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal and professional information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={profileData.avatar}
                        alt={profileData.name}
                      />
                      <AvatarFallback className="text-lg">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={profileData.specialization}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            specialization: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input
                        id="license"
                        value={profileData.licenseNumber}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            licenseNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Clinic Address</Label>
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleProfileUpdate}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Clinic Settings */}
            <TabsContent value="clinic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Working Hours</CardTitle>
                  <CardDescription>
                    Set your availability for appointments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {days.map((day) => (
                    <div
                      key={day.key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={clinicSettings.workingHours[day.key].enabled}
                          onCheckedChange={(checked) =>
                            setClinicSettings({
                              ...clinicSettings,
                              workingHours: {
                                ...clinicSettings.workingHours,
                                [day.key]: {
                                  ...clinicSettings.workingHours[day.key],
                                  enabled: checked,
                                },
                              },
                            })
                          }
                        />
                        <Label className="font-medium w-20">{day.label}</Label>
                      </div>
                      {clinicSettings.workingHours[day.key].enabled && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={clinicSettings.workingHours[day.key].start}
                            onChange={(e) =>
                              setClinicSettings({
                                ...clinicSettings,
                                workingHours: {
                                  ...clinicSettings.workingHours,
                                  [day.key]: {
                                    ...clinicSettings.workingHours[day.key],
                                    start: e.target.value,
                                  },
                                },
                              })
                            }
                            className="w-32"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="time"
                            value={clinicSettings.workingHours[day.key].end}
                            onChange={(e) =>
                              setClinicSettings({
                                ...clinicSettings,
                                workingHours: {
                                  ...clinicSettings.workingHours,
                                  [day.key]: {
                                    ...clinicSettings.workingHours[day.key],
                                    end: e.target.value,
                                  },
                                },
                              })
                            }
                            className="w-32"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Settings</CardTitle>
                  <CardDescription>
                    Configure appointment booking preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">
                        Default Duration (minutes)
                      </Label>
                      <Select
                        value={clinicSettings.appointmentDuration}
                        onValueChange={(value) =>
                          setClinicSettings({
                            ...clinicSettings,
                            appointmentDuration: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buffer">Buffer Time (minutes)</Label>
                      <Select
                        value={clinicSettings.bufferTime}
                        onValueChange={(value) =>
                          setClinicSettings({
                            ...clinicSettings,
                            bufferTime: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No buffer</SelectItem>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="advance">
                        Max Advance Booking (days)
                      </Label>
                      <Select
                        value={clinicSettings.maxAdvanceBooking}
                        onValueChange={(value) =>
                          setClinicSettings({
                            ...clinicSettings,
                            maxAdvanceBooking: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">1 week</SelectItem>
                          <SelectItem value="14">2 weeks</SelectItem>
                          <SelectItem value="30">1 month</SelectItem>
                          <SelectItem value="60">2 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleClinicSettingsUpdate}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about important events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            emailNotifications: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            smsNotifications: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded about upcoming appointments
                        </p>
                      </div>
                      <Switch
                        checked={notifications.appointmentReminders}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            appointmentReminders: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Appointments</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when new appointments are booked
                        </p>
                      </div>
                      <Switch
                        checked={notifications.newAppointments}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            newAppointments: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cancellations</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when appointments are cancelled
                        </p>
                      </div>
                      <Switch
                        checked={notifications.cancellations}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            cancellations: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Important system and security updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            systemUpdates: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleNotificationUpdate}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            security.twoFactorAuth ? "default" : "secondary"
                          }
                        >
                          {security.twoFactorAuth ? "Enabled" : "Disabled"}
                        </Badge>
                        <Switch
                          checked={security.twoFactorAuth}
                          onCheckedChange={(checked) =>
                            setSecurity({ ...security, twoFactorAuth: checked })
                          }
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified of new login attempts
                        </p>
                      </div>
                      <Switch
                        checked={security.loginAlerts}
                        onCheckedChange={(checked) =>
                          setSecurity({ ...security, loginAlerts: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after inactivity
                        </p>
                      </div>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) =>
                          setSecurity({ ...security, sessionTimeout: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="480">8 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Change Password</Button>
                  <Button
                    onClick={handleSecurityUpdate}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
