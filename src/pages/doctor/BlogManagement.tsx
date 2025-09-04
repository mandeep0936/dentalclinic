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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  Search,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/doctor/Sidebar";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
  author: string;
  readTime: number;
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "The Importance of Regular Dental Checkups",
      content:
        "Regular dental checkups are essential for maintaining good oral health...",
      excerpt:
        "Learn why regular dental visits are crucial for your oral health and overall wellbeing.",
      status: "published",
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
      author: "Dr. Sarah Johnson",
      readTime: 5,
    },
    {
      id: "2",
      title: "Understanding Root Canal Treatment",
      content:
        "Root canal treatment is a procedure used to treat infected or severely decayed teeth...",
      excerpt:
        "Everything you need to know about root canal procedures and what to expect.",
      status: "published",
      createdAt: new Date(2024, 0, 10),
      updatedAt: new Date(2024, 0, 12),
      author: "Dr. Sarah Johnson",
      readTime: 8,
    },
    {
      id: "3",
      title: "Tips for Better Oral Hygiene",
      content:
        "Maintaining good oral hygiene is the foundation of dental health...",
      excerpt:
        "Simple daily habits that can significantly improve your oral health.",
      status: "draft",
      createdAt: new Date(2024, 0, 8),
      updatedAt: new Date(2024, 0, 8),
      author: "Dr. Sarah Johnson",
      readTime: 4,
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    status: "draft" as "draft" | "published",
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || post.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      status: formData.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Dr. Sarah Johnson",
      readTime: Math.ceil(formData.content.split(" ").length / 200),
    };

    setPosts([newPost, ...posts]);
    setFormData({ title: "", content: "", excerpt: "", status: "draft" });
    setIsCreateDialogOpen(false);
  };

  const handleEditPost = () => {
    if (!selectedPost) return;

    const updatedPosts = posts.map((post) =>
      post.id === selectedPost.id
        ? {
            ...post,
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            status: formData.status,
            updatedAt: new Date(),
            readTime: Math.ceil(formData.content.split(" ").length / 200),
          }
        : post,
    );

    setPosts(updatedPosts);
    setFormData({ title: "", content: "", excerpt: "", status: "draft" });
    setSelectedPost(null);
    setIsEditDialogOpen(false);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const openEditDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", excerpt: "", status: "draft" });
    setSelectedPost(null);
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
                Blog Management
              </h1>
              <p className="text-muted-foreground">
                Create and manage your blog posts
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
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                  <DialogDescription>
                    Write a new blog post to share with your patients
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter post title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      placeholder="Brief description of the post"
                      className="min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Write your blog post content here..."
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "draft" | "published",
                        })
                      }
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
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
                    onClick={handleCreatePost}
                    disabled={!formData.title || !formData.content}
                  >
                    Create Post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
              <CardDescription>
                Manage your blog posts and their publication status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Read Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {post.excerpt}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            post.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {format(post.createdAt, "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {post.readTime} min
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/doctor/blog/${post.id}`)
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePost(post.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No posts found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Create your first blog post to get started"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update your blog post content and settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter post title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-excerpt">Excerpt</Label>
              <Textarea
                id="edit-excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Brief description of the post"
                className="min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your blog post content here..."
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "draft" | "published",
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
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
              onClick={handleEditPost}
              disabled={!formData.title || !formData.content}
            >
              Update Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
