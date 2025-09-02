import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, addDays, isSameDay } from "date-fns";
import {
  Check,
  X,
  Clock,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: Date;
  time: string;
  status: "pending" | "approved" | "rejected";
  notes?: string;
  avatar?: string;
}

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const AppointmentCalendar = ({
  appointments = [
    {
      id: "1",
      patientName: "John Doe",
      patientEmail: "john.doe@example.com",
      patientPhone: "(555) 123-4567",
      date: new Date(),
      time: "10:00 AM",
      status: "pending",
      notes: "Regular checkup and cleaning",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientEmail: "jane.smith@example.com",
      patientPhone: "(555) 987-6543",
      date: addDays(new Date(), 1),
      time: "2:30 PM",
      status: "approved",
      notes: "Tooth extraction",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "3",
      patientName: "Robert Johnson",
      patientEmail: "robert.j@example.com",
      patientPhone: "(555) 456-7890",
      date: addDays(new Date(), 2),
      time: "11:15 AM",
      status: "rejected",
      notes: "Root canal treatment",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    },
    {
      id: "4",
      patientName: "Emily Wilson",
      patientEmail: "emily.w@example.com",
      patientPhone: "(555) 234-5678",
      date: addDays(new Date(), 3),
      time: "9:00 AM",
      status: "pending",
      notes: "Dental implant consultation",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    {
      id: "5",
      patientName: "Michael Brown",
      patientEmail: "michael.b@example.com",
      patientPhone: "(555) 876-5432",
      date: addDays(new Date(), 4),
      time: "3:45 PM",
      status: "approved",
      notes: "Teeth whitening",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
  ],
  onApprove = () => {},
  onReject = () => {},
}: AppointmentCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter appointments based on selected date
  const dateAppointments = appointments.filter(
    (appointment) => date && isSameDay(appointment.date, date),
  );

  // Filter appointments based on active tab
  const filteredAppointments =
    activeTab === "all"
      ? dateAppointments
      : dateAppointments.filter(
          (appointment) => appointment.status === activeTab,
        );

  // Function to handle appointment selection
  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  // Function to handle appointment approval
  const handleApprove = (id: string) => {
    onApprove(id);
    setIsDialogOpen(false);
  };

  // Function to handle appointment rejection
  const handleReject = (id: string) => {
    onReject(id);
    setIsDialogOpen(false);
  };

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span>Calendar</span>
            </CardTitle>
            <CardDescription>
              Select a date to view appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Appointments List Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Appointments</span>
              </div>
              <span className="text-sm font-normal text-muted-foreground">
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </span>
            </CardTitle>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="all"
                onClick={() => setActiveTab("all")}
                className={
                  activeTab === "all" ? "data-[state=active]:bg-blue-50" : ""
                }
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                onClick={() => setActiveTab("pending")}
                className={
                  activeTab === "pending"
                    ? "data-[state=active]:bg-blue-50"
                    : ""
                }
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                onClick={() => setActiveTab("approved")}
                className={
                  activeTab === "approved"
                    ? "data-[state=active]:bg-blue-50"
                    : ""
                }
              >
                Approved
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsContent value="all" className="mt-0">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => handleAppointmentSelect(appointment)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={appointment.avatar}
                              alt={appointment.patientName}
                            />
                            <AvatarFallback>
                              {appointment.patientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">
                              {appointment.patientName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">
                      No appointments for this date
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select another date or create a new appointment
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                {/* Content for pending tab is handled by the filtered appointments */}
              </TabsContent>
              <TabsContent value="approved" className="mt-0">
                {/* Content for approved tab is handled by the filtered appointments */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  {format(selectedAppointment.date, "MMMM d, yyyy")} at{" "}
                  {selectedAppointment.time}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedAppointment.avatar}
                      alt={selectedAppointment.patientName}
                    />
                    <AvatarFallback>
                      {selectedAppointment.patientName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedAppointment.patientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getStatusBadge(selectedAppointment.status)}
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedAppointment.patientPhone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedAppointment.patientEmail}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Notes:</span>
                      <p className="text-sm text-muted-foreground">
                        {selectedAppointment.notes || "No notes provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                {selectedAppointment.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedAppointment.id)}
                      className="flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedAppointment.id)}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
                {selectedAppointment.status !== "pending" && (
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="ml-auto"
                  >
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentCalendar;
