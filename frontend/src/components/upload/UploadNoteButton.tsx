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

export default function UploadNoteButton({role}: {role: string}) {
  const [open, setOpen] = useState(false);
  const isAllowed = role === 'Teacher';
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={!isAllowed}>
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
