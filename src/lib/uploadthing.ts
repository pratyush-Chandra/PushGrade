import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      return { userId: "user123" }; // Add user ID from auth
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

  pdfUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("PDF upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

  documentUploader: f({ 
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
    text: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB", maxFileCount: 1 }
  })
    .middleware(async ({ req }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

  resumeUploader: f({ 
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(async ({ req }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter; 