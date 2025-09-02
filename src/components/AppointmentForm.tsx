import React, { useState } from "react";
import { format } from "date-fns";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface AppointmentFormProps {
  onSubmit?: (formData: AppointmentFormData) => void;
  className?: string;
}

interface AppointmentFormData {
  doctorId: string;
  date: Date | undefined;
  timeSlotId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  className,
}) => {
  // Mock data for doctors
  const doctors: Doctor[] = [
    { id: "1", name: "Dr. Sarah Johnson", specialization: "General Dentistry" },
    { id: "2", name: "Dr. Michael Chen", specialization: "Orthodontics" },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatric Dentistry",
    },
    { id: "4", name: "Dr. David Kim", specialization: "Periodontics" },
  ];

  // Mock data for time slots
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour < 18; hour++) {
      const time = `${hour}:00 ${hour < 12 ? "AM" : "PM"}`;
      slots.push({
        id: `slot-${hour}`,
        time: time
          .replace("13:00 PM", "1:00 PM")
          .replace("14:00 PM", "2:00 PM")
          .replace("15:00 PM", "3:00 PM")
          .replace("16:00 PM", "4:00 PM")
          .replace("17:00 PM", "5:00 PM"),
        available: Math.random() > 0.3, // Randomly set some slots as unavailable
      });
    }
    return slots;
  };

  // Form state
  const [formData, setFormData] = useState<AppointmentFormData>({
    doctorId: "",
    date: undefined,
    timeSlotId: "",
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    notes: "",
  });

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDoctorChange = (value: string) => {
    setFormData({ ...formData, doctorId: value });
    // In a real app, you might fetch available slots for this doctor
    setTimeSlots(generateTimeSlots());
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({ ...formData, date });
    // In a real app, you might fetch available slots for this date
    setTimeSlots(generateTimeSlots());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Show success message
    setIsSubmitted(true);

    // In a real app, you would send this data to your backend
    console.log("Appointment form submitted:", formData);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md",
          className,
        )}
      >
        <Card className="border-none shadow-none">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl mb-2">
              Appointment Requested
            </CardTitle>
            <CardDescription className="text-base">
              Thank you for booking with us! We'll confirm your appointment
              shortly via email.
            </CardDescription>
            <Button
              className="mt-6 w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Book Another Appointment
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "w-full max-w-md mx-auto bg-white rounded-xl shadow-md",
        className,
      )}
    >
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">
            Book Your Appointment
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to schedule your dental visit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select
                value={formData.doctorId}
                onValueChange={handleDoctorChange}
                required
              >
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Choose your dentist" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => {
                      // Disable past dates and weekends in this example
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {formData.date && formData.doctorId && (
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      type="button"
                      variant={
                        formData.timeSlotId === slot.id ? "default" : "outline"
                      }
                      className={cn(
                        "text-xs h-9",
                        !slot.available && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={!slot.available}
                      onClick={() =>
                        setFormData({ ...formData, timeSlotId: slot.id })
                      }
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, patientEmail: e.target.value })
                    }
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, patientPhone: e.target.value })
                    }
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any specific concerns or questions?"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            onClick={handleSubmit}
            disabled={
              !formData.doctorId ||
              !formData.date ||
              !formData.timeSlotId ||
              !formData.patientName ||
              !formData.patientEmail ||
              !formData.patientPhone
            }
          >
            Request Appointment
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AppointmentForm;
