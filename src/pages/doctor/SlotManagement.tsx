import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/doctor/Sidebar";

const SlotManagement = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Time Slot Management
            </h1>
            <Button>
              <Clock className="mr-2 h-4 w-4" />
              Add Time Slot
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Working Hours Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
                <CardDescription>
                  Set your daily working hours for each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      day: "Monday",
                      enabled: true,
                      start: "09:00",
                      end: "17:00",
                    },
                    {
                      day: "Tuesday",
                      enabled: true,
                      start: "09:00",
                      end: "17:00",
                    },
                    {
                      day: "Wednesday",
                      enabled: true,
                      start: "09:00",
                      end: "17:00",
                    },
                    {
                      day: "Thursday",
                      enabled: true,
                      start: "09:00",
                      end: "17:00",
                    },
                    {
                      day: "Friday",
                      enabled: true,
                      start: "09:00",
                      end: "17:00",
                    },
                    {
                      day: "Saturday",
                      enabled: true,
                      start: "09:00",
                      end: "14:00",
                    },
                    {
                      day: "Sunday",
                      enabled: false,
                      start: "09:00",
                      end: "17:00",
                    },
                  ].map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={schedule.enabled}
                          className="rounded"
                          readOnly
                        />
                        <span className="font-medium w-20">{schedule.day}</span>
                      </div>
                      {schedule.enabled && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={schedule.start}
                            className="border rounded px-2 py-1"
                            readOnly
                          />
                          <span className="text-muted-foreground">to</span>
                          <input
                            type="time"
                            value={schedule.end}
                            className="border rounded px-2 py-1"
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Working Hours</Button>
              </CardFooter>
            </Card>

            {/* Appointment Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Settings</CardTitle>
                <CardDescription>
                  Configure appointment duration and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Duration (minutes)
                    </label>
                    <select className="w-full border rounded px-3 py-2">
                      <option value="15">15 minutes</option>
                      <option value="30" selected>
                        30 minutes
                      </option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Buffer Time (minutes)
                    </label>
                    <select className="w-full border rounded px-3 py-2">
                      <option value="0">No buffer</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15" selected>
                        15 minutes
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Max Advance Booking (days)
                    </label>
                    <select className="w-full border rounded px-3 py-2">
                      <option value="7">1 week</option>
                      <option value="14">2 weeks</option>
                      <option value="30" selected>
                        1 month
                      </option>
                      <option value="60">2 months</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>

            {/* Break Times */}
            <Card>
              <CardHeader>
                <CardTitle>Break Times</CardTitle>
                <CardDescription>
                  Set your lunch breaks and other unavailable periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Lunch Break</h4>
                      <p className="text-sm text-muted-foreground">
                        Daily lunch break period
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value="12:00"
                        className="border rounded px-2 py-1"
                        readOnly
                      />
                      <span className="text-muted-foreground">to</span>
                      <input
                        type="time"
                        value="13:00"
                        className="border rounded px-2 py-1"
                        readOnly
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    Add Break Time
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Time Slots Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots Preview</CardTitle>
                <CardDescription>
                  Preview of available appointment slots for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {[
                    "9:00 AM",
                    "9:30 AM",
                    "10:00 AM",
                    "10:30 AM",
                    "11:00 AM",
                    "11:30 AM",
                    "2:00 PM",
                    "2:30 PM",
                    "3:00 PM",
                    "3:30 PM",
                    "4:00 PM",
                    "4:30 PM",
                    "5:00 PM",
                    "5:30 PM",
                  ].map((time, index) => (
                    <Button
                      key={time}
                      variant={index % 3 === 0 ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      disabled={index % 5 === 0}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Blue: Available | Gray: Booked | Disabled: Break time
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SlotManagement;
