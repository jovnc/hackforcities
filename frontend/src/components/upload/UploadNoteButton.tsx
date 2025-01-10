"use client"
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UploadNoteForm } from './UploadNoteForm'

export default function UploadNoteButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Notes</Button>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle>Upload Lesson Materials</DialogTitle>
          <DialogDescription>
            Upload your lesson materials here. You can upload PDFs only.
          </DialogDescription>
        </DialogHeader>

        <UploadNoteForm setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}
