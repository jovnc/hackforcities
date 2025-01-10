"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "../dark-mode/DarkModeToggle";

export default function NavLinks({
  navItems,
}: {
  navItems: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <div className="hidden items-center space-x-4 md:flex">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={idx + "desktop"}
            href={item.href}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <DarkModeToggle />
      {/* {session?.user && (
        <ProfileMenu
          username={session.user.name}
          avatarUrl={session.user.image}
        />
      )} */}
    </div>
  );
}
