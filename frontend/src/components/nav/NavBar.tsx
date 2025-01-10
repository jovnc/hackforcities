import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { LoginModal } from "../auth/LoginModal";
import { ProfileMenu } from "./ProfileMenu";
import NavLinks from "./NavLinks";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

export async function Navbar({}) {
  const session = await auth();

  return (
    <nav className="w-full">
      <div className="px-10 sm:px-8 lg:px-10">
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <NavLinks navItems={navItems} />
            {!session?.user && <LoginModal />}
            {session?.user && <ProfileMenu username={session?.user?.name as string} avatarUrl={session?.user?.image as string}/>}
          </div>
        </div>
      </div>
    </nav>
  );
}
