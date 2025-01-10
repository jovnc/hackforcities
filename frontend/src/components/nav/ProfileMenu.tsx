"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../auth/LogoutButton";
import { Separator } from "../ui/separator";

interface ProfileMenuProps {
  username: string;
  avatarUrl: string;
  role: string;
}

export function ProfileMenu({ username, avatarUrl, role }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true); // Mark the component as hydrated after mounting
  }, []);

  if (!hydrated) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border p-2 hover:bg-muted">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium">{username}</span>
        <span className="text-2xs">{role}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex w-56 flex-col gap-2">
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onSelect={(e: any) => e.preventDefault()}
        >
          Test
        </DropdownMenuItem>


        <Separator />
        <DropdownMenuItem className="text-red-500 hover:cursor-pointer" asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
