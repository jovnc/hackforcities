import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to upgrade your SLS experience?</h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of teachers who are already using SLSmart to create interactive lessons
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/dashboard">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
