"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)

      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from("article-images").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from("article-images").getPublicUrl(filePath)

      onChange(data.publicUrl)
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        })
        return
      }

      uploadImage(file)
    }
  }

  return (
    <div className="space-y-4">
      <Label>Featured Image</Label>

      {value ? (
        <div className="relative group">
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
            <Image src={value || "/placeholder.svg"} alt="Featured image" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Upload an image for your article</p>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Choose Image"}
            </Button>
          </div>
        </div>
      )}

      <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF. Max size: 5MB</p>
    </div>
  )
}
