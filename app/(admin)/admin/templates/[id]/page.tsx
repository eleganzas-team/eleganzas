"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Loader2, Upload, X, ImagePlus, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const categories = ["wedding", "graduation", "birthday", "anniversary", "engagement", "baby-shower", "corporate"];
const themes = ["luxury", "elegant", "natural", "modern", "dark", "vintage", "floral", "minimalist"];
const tiers = ["undangan", "portofolio", "sekolah", "bisnis", "other"];

interface GalleryImage {
  id: string;
  url: string;
  file?: File;
  isUploading: boolean;
  isExisting?: boolean;
}

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    price: 150000,
    type_template: "undangan",
    category: "wedding",
    theme: "standard",
    thumbnail: "",
    images: [] as string[],
    demo_url: "",
    sales: 0,
    rating: 3.1,
    features: [] as string[],
    tags: [] as string[],
  });
  const [featureInput, setFeatureInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  
  // Fetch template data
  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      
      setIsFetching(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setFormData({
            name: data.name || "",
            slug: data.slug || "",
            tagline: data.tagline || "",
            description: data.description || "",
            price: data.price || 150000,
            type_template: data.type_template || "undangan",
            category: data.category || "wedding",
            theme: data.theme || "standard",
            thumbnail: data.thumbnail || "",
            images: data.images || [],
            demo_url: data.demo_url || "",
            sales: data.sales || 0,
            rating: data.rating || 3.1,
            features: data.features || [],
            tags: data.tags || [],
          });
          
          setFeatureInput((data.features || []).join(", "));
          setTagsInput((data.tags || []).join(", "));
          
          // Set existing gallery images
          if (data.images && data.images.length > 0) {
            const existingImages: GalleryImage[] = data.images.map((url: string, index: number) => ({
              id: `existing-${index}-${Date.now()}`,
              url: url,
              isUploading: false,
              isExisting: true
            }));
            setGalleryImages(existingImages);
          }
          
          // Set thumbnail preview if exists
          if (data.thumbnail) {
            setThumbnailPreview(data.thumbnail);
          }
        }
      } catch (error: any) {
        console.error("Error fetching template:", error);
        toast.error(error.message || "Failed to fetch template data");
        router.push("/admin/templates");
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchTemplate();
  }, [id, router]);
  
  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };
  
  // Handle name change and auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({ 
      ...formData, 
      name,
      slug: generateSlug(name)
    });
  };
  
  // Upload single file to Supabase storage
  const uploadFile = async (file: File, bucket: string = "templates"): Promise<string | null> => {
    const supabase = createClient();
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  
  // Delete image from Supabase storage
  const deleteFromStorage = async (imageUrl: string) => {
    const supabase = createClient();
    
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `thumbnails/${fileName}`;
      
      const { error } = await supabase.storage
        .from("templates")
        .remove([filePath]);
      
      if (error) {
        console.error("Error deleting from storage:", error);
        // Don't throw, just log - we can still delete the record even if storage deletion fails
      }
    } catch (error) {
      console.error("Error in deleteFromStorage:", error);
    }
  };
  
  // Handle thumbnail file selection
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    
    setThumbnailFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };
  
  // Handle gallery files selection
  const handleGallerySelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const newImages: GalleryImage[] = [];
    let hasError = false;
    
    Array.from(files).forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        hasError = true;
        return;
      }
      
      // Validate file size (max 5MB per file)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        hasError = true;
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      newImages.push({
        id: `temp-${Date.now()}-${Math.random().toString(36).substring(2)}`,
        url: previewUrl,
        file: file,
        isUploading: false,
        isExisting: false
      });
    });
    
    if (newImages.length > 0) {
      setGalleryImages(prev => [...prev, ...newImages]);
      toast.success(`${newImages.length} image(s) added`);
    }
    
    // Reset file input
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };
  
  // Remove gallery image
  const removeGalleryImage = (image: GalleryImage) => {
    // If it's an existing image, mark for deletion
    if (image.isExisting && !image.url.startsWith('blob:')) {
      setDeletedImages(prev => [...prev, image.url]);
    }
    
    // Revoke blob URL if needed
    if (image.url.startsWith('blob:')) {
      URL.revokeObjectURL(image.url);
    }
    
    setGalleryImages(prev => prev.filter(img => img.id !== image.id));
  };
  
  // Handle drop files
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleGallerySelect(files);
    }
  }, []);
  
  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  
  // Handle drag leave
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);
  
  // Update gallery image order
  const moveImage = (fromIndex: number, toIndex: number) => {
    setGalleryImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return newImages;
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const supabase = createClient();
    
    try {
      // Validate required fields
      if (!formData.name || !formData.slug) {
        toast.error("Name and slug are required");
        setIsLoading(false);
        return;
      }
      
      // Upload new thumbnail if exists
      let thumbnailUrl = formData.thumbnail;
      if (thumbnailFile) {
        setIsUploading(true);
        const uploadedUrl = await uploadFile(thumbnailFile);
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl;
        }
      }
      
      // Delete removed existing images from storage
      for (const imageUrl of deletedImages) {
        await deleteFromStorage(imageUrl);
      }
      
      // Upload new gallery images
      const newImageUrls: string[] = [];
      
      // Keep existing images that weren't deleted
      const existingImageUrls = galleryImages
        .filter(img => img.isExisting && !img.url.startsWith('blob:'))
        .map(img => img.url);
      
      // Upload new images
      const newImagesToUpload = galleryImages.filter(img => !img.isExisting && img.file);
      
      if (newImagesToUpload.length > 0) {
        setIsUploading(true);
        
        // Update all new images to uploading state
        setGalleryImages(prev => prev.map(img => 
          !img.isExisting ? { ...img, isUploading: true } : img
        ));
        
        for (const image of newImagesToUpload) {
          if (image.file) {
            try {
              const uploadedUrl = await uploadFile(image.file);
              if (uploadedUrl) {
                newImageUrls.push(uploadedUrl);
              }
            } catch (error) {
              console.error(`Failed to upload ${image.file.name}:`, error);
              toast.error(`Failed to upload ${image.file.name}`);
            }
          }
        }
      }
      
      // Combine existing and new images
      const allImageUrls = [...existingImageUrls, ...newImageUrls];
      
      const { error } = await supabase
        .from("templates")
        .update({
          name: formData.name,
          slug: formData.slug,
          tagline: formData.tagline,
          description: formData.description,
          price: formData.price,
          type_template: formData.type_template,
          category: formData.category,
          theme: formData.theme,
          thumbnail: thumbnailUrl,
          images: allImageUrls,
          demo_url: formData.demo_url,
          features: featureInput.split(",").map(feature => feature.trim()).filter(Boolean),
          tags: tagsInput.split(",").map(tag => tag.trim()).filter(Boolean),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Template updated successfully");
      router.push(`/admin/templates`);
    } catch (error: any) {
      console.error("Error updating template:", error);
      toast.error(error.message || "Failed to update template");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };
  
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/templates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="font-heading text-3xl font-bold">Edit Template</h1>
          <p className="text-muted-foreground">Edit template details</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g., Serenity Gold"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., serenity-gold"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Auto-generated from name. You can edit it manually.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g., Minimalis dengan sentuhan emas"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your template..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="feature">Features (comma separated)</Label>
                  <Input
                    id="feature"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g., Modern, Elegant, Gold"
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData({ ...formData, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select 
                      value={formData.theme} 
                      onValueChange={(v) => setFormData({ ...formData, theme: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map(theme => (
                          <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="price">Price (Rp)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      min={0}
                      step={10000}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type_template">Type Template</Label>
                    <Select 
                      value={formData.type_template} 
                      onValueChange={(v) => setFormData({ ...formData, type_template: v as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiers.map(tier => (
                          <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g., Modern, Elegant, Gold"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Thumbnail Section */}
                <div>
                  <Label className="text-base font-semibold">Thumbnail</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload a thumbnail image for your template
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => thumbnailInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        <ImagePlus className="mr-2 h-4 w-4" />
                        {thumbnailPreview ? "Change Image" : "Choose Image"}
                      </Button>
                      {thumbnailPreview && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeThumbnail}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    {thumbnailPreview && (
                      <div className="relative inline-block">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail preview" 
                          className="h-40 w-60 rounded-lg object-cover border shadow-sm"
                        />
                        {thumbnailFile && (
                          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                            New
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Fallback URL input (only show if no thumbnail file selected) */}
                    {!thumbnailFile && (
                      <div>
                        <Label htmlFor="thumbnail-url" className="text-sm">
                          Or enter image URL
                        </Label>
                        <Input
                          id="thumbnail-url"
                          value={formData.thumbnail}
                          onChange={(e) => {
                            setFormData({ ...formData, thumbnail: e.target.value });
                            if (e.target.value) {
                              setThumbnailPreview(e.target.value);
                            }
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="mt-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Separator */}
                <div className="border-t pt-6">
                  <Label className="text-base font-semibold">Gallery Images</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload multiple images for your template gallery
                  </p>
                  
                  <div className="space-y-4">
                    {/* Existing Gallery Images Grid */}
                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                        {galleryImages.map((image, index) => (
                          <div 
                            key={image.id} 
                            className="relative group border rounded-lg overflow-hidden bg-gray-50"
                          >
                            <img 
                              src={image.url} 
                              alt={`Gallery ${index + 1}`} 
                              className="h-32 w-full object-cover"
                            />
                            
                            {image.isUploading && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-white" />
                              </div>
                            )}
                            
                            {/* Image number badge */}
                            <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                              {index + 1}
                            </div>
                            
                            {/* New image badge */}
                            {!image.isExisting && image.file && (
                              <div className="absolute top-1 right-8 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                                New
                              </div>
                            )}
                            
                            {/* Action buttons */}
                            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeGalleryImage(image)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {/* File name for new images */}
                            {image.file && (
                              <div className="p-1.5 bg-white border-t">
                                <p className="text-xs text-gray-600 truncate" title={image.file.name}>
                                  {image.file.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {(image.file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Drag & Drop Zone */}
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`
                        border-2 border-dashed rounded-lg p-8 text-center transition-colors
                        ${dragOver 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-300 hover:border-gray-400'
                        }
                        ${isUploading ? 'opacity-50 pointer-events-none' : ''}
                      `}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <ImagePlus className="h-8 w-8 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Drop images here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supports: JPG, PNG, GIF, WebP (Max 5MB each)
                          </p>
                        </div>
                        <input
                          ref={galleryInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleGallerySelect(e.target.files)}
                          className="hidden"
                          id="gallery-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => galleryInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Browse Files
                        </Button>
                      </div>
                    </div>
                    
                    {/* Gallery stats */}
                    {galleryImages.length > 0 && (
                      <div className="flex items-center justify-between text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                        <span>
                          {galleryImages.length} image{galleryImages.length > 1 ? 's' : ''} total
                          {galleryImages.filter(img => !img.isExisting).length > 0 && (
                            <span className="ml-2 text-blue-600">
                              ({galleryImages.filter(img => !img.isExisting).length} new)
                            </span>
                          )}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            // Revoke all blob URLs
                            galleryImages.forEach(img => {
                              if (img.url.startsWith('blob:')) {
                                URL.revokeObjectURL(img.url);
                              }
                              // Mark all existing images for deletion
                              if (img.isExisting && !img.url.startsWith('blob:')) {
                                setDeletedImages(prev => [...prev, img.url]);
                              }
                            });
                            setGalleryImages([]);
                          }}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Remove All
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Demo URL */}
                <div className="border-t pt-6">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="sales">Sales Count</Label>
                    <Input
                      id="sales"
                      type="number"
                      value={formData.sales}
                      onChange={(e) => setFormData({ ...formData, sales: Number(e.target.value) })}
                      min={0}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Number of times this template has been purchased
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      min={0}
                      max={5}
                      step={0.1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Template rating from 0 to 5
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/templates">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading || isUploading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Update Template"}
          </Button>
        </div>
      </form>
    </div>
  );
}