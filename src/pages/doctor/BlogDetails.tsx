import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Save,
  Calendar,
  Clock,
  User,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/doctor/Sidebar";
import { useToast } from "@/components/ui/use-toast";

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

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock blog post data - in a real app, this would be fetched based on the ID
  const [post, setPost] = useState<BlogPost>({
    id: id || "1",
    title: "The Importance of Regular Dental Checkups",
    content: `Regular dental checkups are essential for maintaining good oral health and preventing serious dental problems. During these visits, your dentist can detect issues early, when they're easier and less expensive to treat.

## Why Regular Checkups Matter

Dental checkups typically include:

1. **Professional Cleaning**: Removes plaque and tartar that regular brushing can't eliminate
2. **Oral Examination**: Checks for cavities, gum disease, and other oral health issues
3. **X-rays**: May be taken to detect problems not visible during the visual exam
4. **Oral Cancer Screening**: Early detection of potentially serious conditions

## Recommended Frequency

Most dental professionals recommend visiting every 6 months, though some patients may need more frequent visits based on their oral health status.

## Benefits of Prevention

Regular checkups can help prevent:
- Tooth decay and cavities
- Gum disease
- Tooth loss
- Bad breath
- Oral infections

Remember, prevention is always better than treatment. Schedule your next dental checkup today!`,
    excerpt:
      "Learn why regular dental visits are crucial for your oral health and overall wellbeing.",
    status: "published",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 15),
    author: "Dr. Sarah Johnson",
    readTime: 5,
  });

  const [editForm, setEditForm] = useState({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    status: post.status,
  });

  const handleSave = () => {
    setPost({
      ...post,
      title: editForm.title,
      content: editForm.content,
      excerpt: editForm.excerpt,
      status: editForm.status,
      updatedAt: new Date(),
      readTime: Math.ceil(editForm.content.split(" ").length / 200),
    });
    setIsEditing(false);
    toast({
      title: "Post Updated",
      description: "Your blog post has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/doctor/blog")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog Posts
            </Button>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Post
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Blog Post Content */}
          <Card>
            <CardHeader>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="text-2xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={editForm.excerpt}
                      onChange={(e) =>
                        setEditForm({ ...editForm, excerpt: e.target.value })
                      }
                      className="min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          status: e.target.value as "draft" | "published",
                        })
                      }
                      className="flex h-9 w-32 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-3xl">{post.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {post.excerpt}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(post.createdAt, "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime} min read
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Updated {format(post.updatedAt, "MMM d, yyyy")}
                    </div>
                  </div>
                </>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editForm.content}
                    onChange={(e) =>
                      setEditForm({ ...editForm, content: e.target.value })
                    }
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Write your blog post content here..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Estimated read time:{" "}
                    {Math.ceil(editForm.content.split(" ").length / 200)}{" "}
                    minutes
                  </p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  {post.content.split("\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-xl font-semibold mt-6 mb-3"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h1
                          key={index}
                          className="text-2xl font-bold mt-6 mb-4"
                        >
                          {paragraph.replace("# ", "")}
                        </h1>
                      );
                    }
                    if (paragraph.trim() === "") {
                      return <br key={index} />;
                    }
                    if (paragraph.match(/^\d+\./)) {
                      return (
                        <li key={index} className="ml-4 mb-2">
                          {paragraph.replace(/^\d+\.\s*/, "")}
                        </li>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-4 mb-2 list-disc">
                          {paragraph.replace("- ", "")}
                        </li>
                      );
                    }
                    if (
                      paragraph.startsWith("**") &&
                      paragraph.endsWith("**")
                    ) {
                      return (
                        <p key={index} className="mb-4">
                          <strong>
                            {paragraph.replace(/\*\*/g, "").replace(":", ":")}
                          </strong>
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetails;
