import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-full flex-col bg-primary/5">
      <div className="grid items-center justify-between p-8 md:grid-cols-2">
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
        <div className="xs:p-16 w-full px-32 py-16 md:p-16 xl:p-32">
          <Image
            src="/logo.png"
            alt="WorksheetGen Logo"
            width={400}
            height={400}
            className="flex w-full items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
}
