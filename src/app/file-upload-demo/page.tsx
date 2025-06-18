"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { FileUpload } from "@/components/file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Image, File, CheckCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

export default function FileUploadDemoPage() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleUploadComplete = (url: string) => {
    setUploadedFiles(prev => [...prev, url]);
  };

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">File Upload Demo</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Test different file upload types with UploadThing integration
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Upload className="h-3 w-3" />
                Drag & Drop
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                Progress Tracking
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <File className="h-3 w-3" />
                Multiple Formats
              </Badge>
            </div>
          </motion.div>

          {/* Upload Types Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="image" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDFs
                </TabsTrigger>
                <TabsTrigger value="document" className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Resumes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Image Upload</CardTitle>
                    <CardDescription>
                      Upload images for profile pictures, portfolio, or interview materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      uploadType="image"
                      acceptedFileTypes={["image/*"]}
                      maxFileSize={4 * 1024 * 1024} // 4MB
                      maxFiles={3}
                      onUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pdf" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>PDF Upload</CardTitle>
                    <CardDescription>
                      Upload PDF documents for reference materials or study guides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      uploadType="pdf"
                      acceptedFileTypes={["application/pdf"]}
                      maxFileSize={8 * 1024 * 1024} // 8MB
                      maxFiles={1}
                      onUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="document" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Upload</CardTitle>
                    <CardDescription>
                      Upload various document formats including PDF, Word, and text files
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      uploadType="document"
                      acceptedFileTypes={[
                        "application/pdf",
                        "text/plain",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      ]}
                      maxFileSize={8 * 1024 * 1024} // 8MB
                      maxFiles={5}
                      onUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Upload</CardTitle>
                    <CardDescription>
                      Upload your resume for AI analysis and interview preparation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      uploadType="resume"
                      acceptedFileTypes={[
                        "application/pdf",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      ]}
                      maxFileSize={4 * 1024 * 1024} // 4MB
                      maxFiles={1}
                      onUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Files</CardTitle>
                  <CardDescription>
                    Files that have been successfully uploaded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {uploadedFiles.map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">{url}</span>
                        </div>
                        <Badge variant="secondary">Uploaded</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <CardTitle>Drag & Drop</CardTitle>
                  </div>
                  <CardDescription>
                    Intuitive drag and drop interface for easy file uploads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Simply drag files from your computer and drop them into the upload area.
                    The interface provides visual feedback and supports multiple file types.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <CardTitle>Progress Tracking</CardTitle>
                  </div>
                  <CardDescription>
                    Real-time progress indicators and status updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Watch upload progress in real-time with visual progress bars.
                    Get immediate feedback on successful uploads or errors.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-primary" />
                    <CardTitle>File Validation</CardTitle>
                  </div>
                  <CardDescription>
                    Automatic file type and size validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Files are automatically validated for type and size before upload.
                    Invalid files are rejected with clear error messages.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Technical Information */}
          <motion.div variants={itemVariants} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Implementation</CardTitle>
                <CardDescription>
                  Details about the UploadThing integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• UploadThing integration for reliable file storage</li>
                      <li>• React Dropzone for drag & drop functionality</li>
                      <li>• Progress tracking with animated progress bars</li>
                      <li>• File type and size validation</li>
                      <li>• Multiple file upload support</li>
                      <li>• Error handling and user feedback</li>
                      <li>• Responsive design for all devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">UploadThing</Badge>
                      <Badge variant="outline">React Dropzone</Badge>
                      <Badge variant="outline">Framer Motion</Badge>
                      <Badge variant="outline">Radix UI</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
} 