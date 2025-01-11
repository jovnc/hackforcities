"use client"
import React from 'react'
import { Button } from '../ui/button'
import { changeRole } from '@/actions/user'
import { toast } from 'sonner';
import Spinner from '../ui/spinner';
import { useRouter } from 'next/navigation';

export default function ChangeRoleButton({userId, role}: {userId: string, role: string}) {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const newRole = role === 'Student' ? 'Teacher' : 'Student';
    const handleClick = async () => {
        setLoading(true);
        await changeRole(userId, newRole);
        toast(`Role changed to ${newRole} successfully`);
        router.refresh();
        setLoading(false);
    }
  return (
    <Button variant="profile" onClick={handleClick} className='w-full'>{loading ? <Spinner /> : "Switch Role"}</Button>
  )
}
