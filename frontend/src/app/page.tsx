import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col bg-primary/5">
      <div className="grid md:grid-cols-2 items-center justify-between p-8">
        <div className="md:text-start text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <p>SLSmart</p>
          </h1>
          <p className="text-lg mb-4">
            Your ultimate solution for generating customized worksheets. Create,
            customize, and download worksheets tailored to your needs.
          </p>
          <Button>
            <Link href="/auth/login">Begin your journey</Link>
          </Button>
        </div>
        <div className="px-32 py-16 xs:p-16 md:p-16 xl:p-32 w-full">
          <Image
            src="/tes-logo.png"
            alt="WorksheetGen Logo"
            width={400}
            height={400}
            className="flex justify-center items-center w-full"
          />
        </div>
      </div>
    </div>
  );
}
