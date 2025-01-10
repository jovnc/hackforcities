import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UploadNoteForm } from './UploadNoteForm'

export default function UploadNoteButton() {
  return (
    <Dialog>
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

        <UploadNoteForm />
      </DialogContent>
    </Dialog>
  )
}
