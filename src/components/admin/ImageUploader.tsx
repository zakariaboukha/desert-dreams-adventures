
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X, UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  progress: number;
  error?: string;
  uploaded?: boolean;
}

export interface ImageUploaderProps {
  maxFiles?: number;
  maxSize?: number; // in bytes
  onImagesChange?: (images: UploadedImage[]) => void;
  className?: string;
}

const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxFiles = 5,
  maxSize = 2 * 1024 * 1024, // 2MB default
  onImagesChange,
  className,
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // Send images to parent when they change
  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(uploadedImages);
    }
  }, [uploadedImages, onImagesChange]);

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      uploadedImages.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [uploadedImages]);

  const simulateUpload = useCallback((image: UploadedImage) => {
    // Mock upload function with progress simulation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedImages(prevImages => 
        prevImages.map(img => 
          img.id === image.id 
            ? { ...img, progress } 
            : img
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        // Mark as uploaded after 100% progress
        setUploadedImages(prevImages => 
          prevImages.map(img => 
            img.id === image.id 
              ? { ...img, uploaded: true, progress: 100 } 
              : img
          )
        );
        console.log(`File uploaded (mock): ${image.file.name}`, {
          size: bytesToMB(image.file.size).toFixed(2) + 'MB',
          type: image.file.type,
          lastModified: new Date(image.file.lastModified).toISOString()
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files first
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(rejectedFile => {
        const { file, errors } = rejectedFile;
        let errorMessage = "Invalid file";
        
        if (errors[0]?.code === 'file-too-large') {
          errorMessage = `File too large: ${file.name} (max ${bytesToMB(maxSize)}MB)`;
        } else if (errors[0]?.code === 'file-invalid-type') {
          errorMessage = `Invalid file type: ${file.name} (only JPEG/PNG allowed)`;
        }
        
        toast({
          title: "File rejected",
          description: errorMessage,
          variant: "destructive"
        });
      });
    }

    // Check if adding accepted files would exceed the max limit
    if (uploadedImages.length + acceptedFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${maxFiles} images`,
        variant: "destructive"
      });
      
      // Only take what we can fit
      acceptedFiles = acceptedFiles.slice(0, Math.max(0, maxFiles - uploadedImages.length));
    }

    // Process accepted files
    const newImages = acceptedFiles.map(file => {
      const newImage: UploadedImage = {
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      };
      
      // Start simulated upload for this file
      setTimeout(() => simulateUpload(newImage), 300);
      
      return newImage;
    });

    if (newImages.length > 0) {
      setUploadedImages(prev => [...prev, ...newImages]);
      toast({
        title: "Files added",
        description: `Added ${newImages.length} file(s) to upload queue`,
      });
    }
  }, [uploadedImages, maxFiles, maxSize, simulateUpload]);

  const removeImage = (id: string) => {
    setUploadedImages(prevImages => {
      // Find the image to remove so we can revoke its object URL
      const imageToRemove = prevImages.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      
      return prevImages.filter(image => image.id !== id);
    });
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize,
    noClick: true, // We'll handle clicks manually with our button
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  // Determine drop zone border color based on drag state
  const getBorderColor = () => {
    if (isDragReject) return 'border-destructive';
    if (isDragAccept) return 'border-primary';
    if (isDragActive) return 'border-primary';
    return 'border-border';
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-md p-6 
          flex flex-col items-center justify-center
          transition-all duration-200
          ${getBorderColor()}
          ${isDragActive ? 'bg-primary/5' : 'bg-background'}
        `}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-center text-muted-foreground mb-2">
          Drag and drop images here or click to upload
        </p>
        <Button variant="secondary" size="sm" onClick={open}>
          Choose Files
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} images, JPEG or PNG, max {bytesToMB(maxSize)}MB each
        </p>
      </div>

      {uploadedImages.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected Images ({uploadedImages.length}/{maxFiles})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {uploadedImages.map(image => (
              <div 
                key={image.id} 
                className="relative rounded-md border overflow-hidden group"
              >
                <div className="aspect-square w-full h-full relative">
                  <img 
                    src={image.preview} 
                    alt={image.file.name}
                    className="object-cover w-full h-full"
                  />
                  {/* Progress overlay */}
                  {image.progress < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                      <div className="w-full px-3">
                        <div className="h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-200" 
                            style={{ width: `${image.progress}%` }}
                          />
                        </div>
                        <div className="text-xs mt-1 text-center">{image.progress}%</div>
                      </div>
                    </div>
                  )}
                  {/* Success indicator */}
                  {image.uploaded && (
                    <div className="absolute bottom-1 right-1">
                      <CheckCircle2 className="h-5 w-5 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                {/* File name */}
                <div className="px-2 py-1 text-xs truncate">
                  {image.file.name}
                </div>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                  className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
