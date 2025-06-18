# UploadThing Setup Guide

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# UploadThing Configuration
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
```

## Setup Steps

1. **Sign up for UploadThing** at [uploadthing.com](https://uploadthing.com)

2. **Create a new project** in the UploadThing dashboard

3. **Get your API keys** from the project settings

4. **Add the environment variables** to your `.env.local` file

5. **Update the upload configuration** in `src/lib/uploadthing.ts` if needed

## File Upload Types

The current configuration supports:

- **Images**: JPG, PNG, GIF, WebP (max 4MB)
- **PDFs**: PDF documents (max 8MB)
- **Documents**: PDF, Word, Text files (max 8MB)
- **Resumes**: PDF, Word documents (max 4MB)

## Usage

Visit `/file-upload-demo` to test the file upload functionality.

## Integration with Real UploadThing

To connect with real UploadThing:

1. Replace the mock upload in `FileUpload` component with `useUploadThing` hook
2. Add proper error handling for upload failures
3. Store file URLs in your database for later use

## Example with useUploadThing

```tsx
import { useUploadThing } from "@uploadthing/react";

const { startUpload, isUploading } = useUploadThing("imageUploader");

const uploadFile = async (file: File) => {
  const uploaded = await startUpload([file]);
  if (uploaded) {
    const url = uploaded[0].url;
    // Handle successful upload
  }
};
``` 