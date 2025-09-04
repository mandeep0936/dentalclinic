import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/doctor/Sidebar";
import AppointmentCalendar from "@/components/doctor/AppointmentCalendar";

const AppointmentManagement = () => {
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
            <h1 className="text-3xl font-bold tracking-tight">
              Appointment Management
            </h1>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                Manage your upcoming appointments and patient requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
