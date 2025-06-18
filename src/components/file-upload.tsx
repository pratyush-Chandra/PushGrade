"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, FileText, Image, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  uploadType?: "image" | "pdf" | "document" | "resume";
  className?: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  acceptedFileTypes = ["image/*", "application/pdf", ".doc", ".docx"],
  maxFileSize = 4 * 1024 * 1024, // 4MB
  maxFiles = 1,
  uploadType = "document",
  className = ""
}: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadingFile: UploadingFile = {
      file,
      progress: 0,
      status: "uploading"
    };

    setUploadingFiles(prev => [...prev, uploadingFile]);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadingFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, progress: Math.min(f.progress + 10, 90) }
              : f
          )
        );
      }, 200);

      // In a real implementation, you would use UploadThing's useUploadThing hook
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);

      // Simulate successful upload
      const mockUrl = `https://example.com/uploads/${file.name}`;
      
      setUploadingFiles(prev => 
        prev.map(f => 
          f.file === file 
            ? { ...f, progress: 100, status: "success", url: mockUrl }
            : f
        )
      );

      onUploadComplete?.(mockUrl);
    } catch (error) {
      setUploadingFiles(prev => 
        prev.map(f => 
          f.file === file 
            ? { ...f, status: "error", error: "Upload failed" }
            : f
        )
      );
      onUploadError?.("Upload failed");
    }
  }, [onUploadComplete, onUploadError]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      uploadFile(file);
    });
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    maxFiles,
    multiple: maxFiles > 1
  });

  const removeFile = (file: File) => {
    setUploadingFiles(prev => prev.filter(f => f.file !== file));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (file.type === "application/pdf") return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to select files
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Accepted formats: {acceptedFileTypes.join(", ")}</p>
              <p>Max file size: {formatFileSize(maxFileSize)}</p>
              <p>Max files: {maxFiles}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadingFiles.map((uploadingFile, index) => (
          <motion.div
            key={`${uploadingFile.file.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(uploadingFile.file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {uploadingFile.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploadingFile.file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadingFile.status === "uploading" && (
                      <div className="w-16">
                        <Progress value={uploadingFile.progress} className="h-2" />
                      </div>
                    )}
                    
                    {uploadingFile.status === "success" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    
                    {uploadingFile.status === "error" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(uploadingFile.file)}
                      className="h-6 w-6"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {uploadingFile.error && (
                  <p className="text-xs text-red-500 mt-2">{uploadingFile.error}</p>
                )}
                
                {uploadingFile.url && (
                  <p className="text-xs text-green-500 mt-2">
                    Uploaded successfully: {uploadingFile.url}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 