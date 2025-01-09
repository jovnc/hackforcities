import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { LoginModal } from "../auth/LoginModal";
import LogoutButton from "../auth/LogoutButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/shop", label: "Buy / Sell" },
  { href: "/donate", label: "Donate" },
  { href: "/admin", label: "Admin" },
];

export async function Navbar({}) {
  const session = await auth();

  return (
    <nav className="w-full bg-primary-foreground shadow-md">
      <div className="px-10 sm:px-8 lg:px-10">
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-4">
            {!session?.user && <LoginModal />}
            {session?.user && <LogoutButton />}
            {/* Desktop menu */}

            {/* Mobile menu button */}
          </div>
        </div>
      </div>
    </nav>
  );
}
