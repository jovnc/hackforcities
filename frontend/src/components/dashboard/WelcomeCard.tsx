"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeCardProps {
  name: string
  role: string
}

export function WelcomeCard({ name, role }: WelcomeCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full mx-auto">
        <CardContent className="p-6">
          <motion.h2
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome back, <span className="text-primary">{name}</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

