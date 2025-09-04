import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Settings,
  Home,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/doctor/Sidebar";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard
  const stats = {
    totalAppointments: 24,
    pendingAppointments: 5,
    completedAppointments: 19,
    totalPatients: 156,
    newPatients: 8,
    blogPosts: 12,
  };

  const recentAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "confirmed",
      type: "Cleaning",
    },
    {
      id: 2,
      patient: "Michael Brown",
      date: "2023-06-15",
      time: "11:30 AM",
      status: "pending",
      type: "Consultation",
    },
    {
      id: 3,
      patient: "Emily Davis",
      date: "2023-06-16",
      time: "9:15 AM",
      status: "confirmed",
      type: "Root Canal",
    },
    {
      id: 4,
      patient: "Robert Wilson",
      date: "2023-06-16",
      time: "2:00 PM",
      status: "pending",
      type: "Whitening",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Appointments
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalAppointments}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{stats.pendingAppointments} pending approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPatients}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats.newPatients} new this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Blog Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.blogPosts}</div>
                <p className="text-xs text-muted-foreground">
                  Last published 3 days ago
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs
            defaultValue="overview"
            className="space-y-4"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="overview">
                <Home className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="slots">
                <Clock className="mr-2 h-4 w-4" />
                Time Slots
              </TabsTrigger>
              <TabsTrigger value="blog">
                <FileText className="mr-2 h-4 w-4" />
                Blog
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Weekly Overview */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Weekly Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            Appointments Completed
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stats.completedAppointments}/
                            {stats.totalAppointments}
                          </div>
                        </div>
                        <Progress value={79} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            New Patients
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stats.newPatients}
                          </div>
                        </div>
                        <Progress value={35} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      You have {stats.pendingAppointments} pending appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center">
                          {appointment.status === "confirmed" ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="mr-2 h-4 w-4 text-amber-500" />
                          )}
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {appointment.patient}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {appointment.date} at {appointment.time} -{" "}
                              {appointment.type}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Appointments
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Appointments Tab Content */}
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Management</CardTitle>
                  <CardDescription>
                    View and manage appointments from the dedicated appointments
                    page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Manage Appointments</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Go to the appointments page to view and manage all patient
                      appointments
                    </p>
                    <Button
                      onClick={() =>
                        (window.location.href = "/doctor/appointments")
                      }
                    >
                      Go to Appointments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Time Slots Tab Content */}
            <TabsContent value="slots" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Time Slot Management</CardTitle>
                  <CardDescription>
                    Configure your working hours and time slots from the
                    dedicated slots page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 flex flex-col items-center justify-center text-center">
                    <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Manage Time Slots</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Go to the time slots page to configure your working hours
                      and availability
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/doctor/slots")}
                    >
                      Go to Time Slots
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Tab Content */}
            <TabsContent value="blog" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>
                    Create and manage your blog posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 flex flex-col items-center justify-center text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Manage Your Blog</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Create, edit, and publish blog posts to share with your
                      patients
                    </p>
                    <Button>Create New Post</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
