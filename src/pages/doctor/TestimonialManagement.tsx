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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Star, User, MessageSquare } from "lucide-react";
import Sidebar from "@/components/doctor/Sidebar";
import { useToast } from "@/components/ui/use-toast";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
  isDefault: boolean;
  createdAt: Date;
}

const TestimonialManagement = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      text: "Exceptional care and a wonderful team. My family has been coming here for years and we couldn't be happier with the service.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      isDefault: true,
      createdAt: new Date(2024, 0, 1),
    },
    {
      id: "2",
      name: "Michael Chen",
      rating: 5,
      text: "Professional, gentle, and thorough. The staff made me feel comfortable throughout my entire treatment process.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      isDefault: true,
      createdAt: new Date(2024, 0, 2),
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      rating: 5,
      text: "Amazing results with my smile makeover! The team is skilled and caring. Highly recommend to anyone looking for quality dental care.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      isDefault: true,
      createdAt: new Date(2024, 0, 3),
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    text: "",
    image: "",
  });

  const handleCreateTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: formData.name,
      rating: formData.rating,
      text: formData.text,
      image:
        formData.image ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name.toLowerCase().replace(" ", "")}`,
      isDefault: false,
      createdAt: new Date(),
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({ name: "", rating: 5, text: "", image: "" });
    setIsCreateDialogOpen(false);
    toast({
      title: "Testimonial Added",
      description: "New testimonial has been added successfully.",
    });
  };

  const handleEditTestimonial = () => {
    if (!selectedTestimonial) return;

    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === selectedTestimonial.id
        ? {
            ...testimonial,
            name: formData.name,
            rating: formData.rating,
            text: formData.text,
            image: formData.image || testimonial.image,
          }
        : testimonial,
    );

    setTestimonials(updatedTestimonials);
    setFormData({ name: "", rating: 5, text: "", image: "" });
    setSelectedTestimonial(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Testimonial Updated",
      description: "Testimonial has been updated successfully.",
    });
  };

  const handleDeleteTestimonial = (testimonialId: string) => {
    const testimonial = testimonials.find((t) => t.id === testimonialId);
    if (testimonial?.isDefault) {
      toast({
        title: "Cannot Delete",
        description: "Default testimonials cannot be deleted.",
        variant: "destructive",
      });
      return;
    }

    setTestimonials(
      testimonials.filter((testimonial) => testimonial.id !== testimonialId),
    );
    toast({
      title: "Testimonial Deleted",
      description: "Testimonial has been deleted successfully.",
    });
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      rating: testimonial.rating,
      text: testimonial.text,
      image: testimonial.image,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", rating: 5, text: "", image: "" });
    setSelectedTestimonial(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

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
              <h1 className="text-3xl font-bold tracking-tight">
                Testimonial Management
              </h1>
              <p className="text-muted-foreground">
                Manage patient testimonials displayed on your landing page
              </p>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={resetForm}
                  className="bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Testimonial</DialogTitle>
                  <DialogDescription>
                    Add a new patient testimonial to display on your landing
                    page
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Patient Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseInt(e.target.value),
                        })
                      }
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text">Testimonial Text</Label>
                    <Textarea
                      id="text"
                      value={formData.text}
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                      placeholder="Enter the testimonial text"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL (Optional)</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="Enter image URL or leave blank for auto-generated avatar"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTestimonial}
                    disabled={!formData.name || !formData.text}
                  >
                    Add Testimonial
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Testimonials Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Patient Testimonials ({testimonials.length})
              </CardTitle>
              <CardDescription>
                Manage testimonials that appear on your landing page. Default
                testimonials will be shown if you haven't added any custom ones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Testimonial</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium">
                              {testimonial.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {testimonial.text}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            testimonial.isDefault ? "secondary" : "default"
                          }
                        >
                          {testimonial.isDefault ? "Default" : "Custom"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!testimonial.isDefault && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Testimonial
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this
                                    testimonial from "{testimonial.name}"? This
                                    action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteTestimonial(testimonial.id)
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Update the testimonial information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Patient Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter patient name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rating">Rating</Label>
              <select
                id="edit-rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseInt(e.target.value),
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-text">Testimonial Text</Label>
              <Textarea
                id="edit-text"
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                placeholder="Enter the testimonial text"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL (Optional)</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditTestimonial}
              disabled={!formData.name || !formData.text}
            >
              Update Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialManagement;
