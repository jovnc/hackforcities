import { getRoleByUserId } from '@/actions/user'
import { auth } from '@/auth'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import DashboardShell from '@/components/dashboard/DashboardShell'
import UploadNoteButton from '@/components/upload/UploadNoteButton'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { Button } from '@/components/ui/button'
import React from 'react'

export default async function page() {
    const session = await auth();
    const name = session?.user?.name as string;
    const role = await getRoleByUserId(session?.user?.id as string) as string;
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your SLS eLearning dashboard.">
        <UploadNoteButton role={role}/>
      </DashboardHeader>
    <WelcomeCard name={name} role={role} />
    </DashboardShell>
  )
}
