"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex h-[500px] items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-6xl font-bold text-blue-800">404</h1>
          <h2 className="mb-6 text-3xl font-semibold text-muted-foreground">
            Page Not Found
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 text-xl text-muted-foreground"
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/"
            className="rounded-lg px-6 py-3 transition-colors duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
