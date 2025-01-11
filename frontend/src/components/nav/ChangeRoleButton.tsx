import React from 'react'
import { Button } from '../ui/button'
import { changeRole } from '@/actions/user'

export default function ChangeRoleButton({userId, role}: {userId: string, role: string}) {
    const newRole = role === 'Student' ? 'Teacher' : 'Student';
  return (
    <Button variant="profile" onClick={() => changeRole(userId, newRole)}>Switch Role</Button>
  )
}
