import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  Upload,
  Image,
  Trash2,
  Eye,
  Download,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Photo {
  id: string;
  url: string;
  filename: string;
  uploadDate: string;
  jobId: string;
  category: "before" | "progress" | "after" | "issue" | "safety";
  description?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  tags: string[];
  uploadedBy: string;
}

const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80",
      filename: "foundation_before.jpg",
      uploadDate: "2024-01-15T10:30:00Z",
      jobId: "JOB-001",
      category: "before",
      description: "Foundation area before excavation",
      location: {
        lat: 40.7128,
        lng: -74.006,
        address: "123 Construction St, New York, NY",
      },
      tags: ["foundation", "excavation"],
      uploadedBy: "John Smith",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
      filename: "framing_progress.jpg",
      uploadDate: "2024-01-20T14:15:00Z",
      jobId: "JOB-001",
      category: "progress",
      description: "Framing work in progress",
      location: {
        lat: 40.7128,
        lng: -74.006,
        address: "123 Construction St, New York, NY",
      },
      tags: ["framing", "structure"],
      uploadedBy: "Mike Johnson",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
      filename: "safety_issue.jpg",
      uploadDate: "2024-01-22T09:45:00Z",
      jobId: "JOB-002",
      category: "safety",
      description: "Safety hazard identified - loose scaffolding",
      location: {
        lat: 40.7589,
        lng: -73.9851,
        address: "456 Build Ave, New York, NY",
      },
      tags: ["safety", "scaffolding", "hazard"],
      uploadedBy: "Sarah Wilson",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    category: "progress" as Photo["category"],
    description: "",
    tags: "",
  });

  const filteredPhotos = photos.filter((photo) => {
    const categoryMatch =
      selectedCategory === "all" || photo.category === selectedCategory;
    const jobMatch = selectedJob === "all" || photo.jobId === selectedJob;
    return categoryMatch && jobMatch;
  });

  const getCategoryColor = (category: Photo["category"]) => {
    switch (category) {
      case "before":
        return "bg-blue-100 text-blue-800";
      case "progress":
        return "bg-yellow-100 text-yellow-800";
      case "after":
        return "bg-green-100 text-green-800";
      case "issue":
        return "bg-red-100 text-red-800";
      case "safety":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log("Files selected:", files);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId));
  };

  const uniqueJobs = [...new Set(photos.map((photo) => photo.jobId))];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Job Photos</h1>
            <p className="text-slate-600 mt-1">
              Manage and organize construction site photos
            </p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Photos</DialogTitle>
                <DialogDescription>
                  Add photos to document job progress and issues
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo-upload">Select Photos</Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPhoto.category}
                    onValueChange={(value) =>
                      setNewPhoto({
                        ...newPhoto,
                        category: value as Photo["category"],
                      })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before">Before</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                      <SelectItem value="after">After</SelectItem>
                      <SelectItem value="issue">Issue</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this photo shows..."
                    value={newPhoto.description}
                    onChange={(e) =>
                      setNewPhoto({ ...newPhoto, description: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="foundation, concrete, inspection"
                    value={newPhoto.tags}
                    onChange={(e) =>
                      setNewPhoto({ ...newPhoto, tags: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Photos
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-48">
                <Label htmlFor="category-filter">Filter by Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="before">Before</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="after">After</SelectItem>
                    <SelectItem value="issue">Issue</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-48">
                <Label htmlFor="job-filter">Filter by Job</Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {uniqueJobs.map((jobId) => (
                      <SelectItem key={jobId} value={jobId}>
                        {jobId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Image className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Photos
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {photos.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Progress Photos
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {photos.filter((p) => p.category === "progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Issues Documented
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {
                      photos.filter(
                        (p) =>
                          p.category === "issue" || p.category === "safety",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Locations
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {new Set(photos.map((p) => p.location?.address)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getCategoryColor(photo.category)}>
                    {photo.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {photo.filename}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {photo.jobId}
                    </Badge>
                  </div>
                  {photo.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {photo.description}
                    </p>
                  )}
                  <div className="flex items-center text-xs text-slate-500 space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(photo.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                  {photo.location && (
                    <div className="flex items-center text-xs text-slate-500 space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{photo.location.address}</span>
                    </div>
                  )}
                  <div className="flex items-center text-xs text-slate-500">
                    <span>By {photo.uploadedBy}</span>
                  </div>
                  {photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Image className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No photos found
              </h3>
              <p className="text-slate-600 mb-4">
                No photos match your current filters.
              </p>
              <Button
                onClick={() => setUploadDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload First Photo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Photos;
