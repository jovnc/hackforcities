import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="mx-auto flex h-full flex-col gap-8">
      <div className="flex flex-row items-center justify-between bg-primary/5 px-20 py-10">
        <div className="text-center md:text-start">
          <h1 className="mb-4 text-4xl font-bold">
            Welcome to <p>SLSmart</p>
          </h1>
          <p className="text-md mb-4 text-muted-foreground">
            Your ultimate solution for generating customized worksheets. Create, customize, and
            download worksheets tailored to your needs.
          </p>
          <Button asChild>
            <Link href="/dashboard">Begin your journey</Link>
          </Button>
        </div>
        <div className="flex w-full items-center justify-center">
          <Image
            src="/logo.png"
            alt="WorksheetGen Logo"
            width={400}
            height={400}
            className="flex items-center justify-center"
          />
        </div>
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
