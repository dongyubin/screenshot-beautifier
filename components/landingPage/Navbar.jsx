"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import logo2 from "@public/images/logo2.jpg";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LangSwitcher } from "@/components/header/LangSwitcher";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [currentHref, setCurrentHref] = useState('');
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    setCurrentHref(window.location.href);
  }, []);

  const links = [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    // {
    //   label: "Wall of Love",
    //   href: "#WallOfLove",
    // },
    {
      label: "FAQ",
      href: "#faqs",
    },
  ];

  return (
    <div className="inset-0 bg-transparent flex justify-center items-center bg-red-500">
      <nav class="w-full z-50 top-0 start-0 border-b-[1px] border-gray-200 bg-foreground/10 border-opacity-10">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image class=" rounded h-7 w-8" alt="logo" src={logo2} />
            <span class="self-center text-2xl max-md:text-xl font-semibold whitespace-nowrap ">
              Shotune
            </span>
          </Link>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

            {session ? (
              <Button onClick={handleSignOut}>Log Out</Button>
            ) : (
              <div className="flex md:gap-3 gap-1">
                <Button
                  variant="secondary"
                  className=""
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </Button>
                <Button
                  className="max-md:hidden"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}

            <LangSwitcher />

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg md:hidden  dark:text-gray-400 ml-0">
                <IoMenu className="w-12 h-12" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={""}>Home</Link>
                </DropdownMenuItem>
                {links.map((link) => (
                  <DropdownMenuItem>
                    <Link
                      key={link.label}
                      href={`${currentHref.endsWith('tools') ? '/' : ''}${link.href}`}
                      aria-label={link.label}
                      title={link.label}
                      className="tracking-wide transition-colors duration-200 font-norma"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {session && (
                  <DropdownMenuItem>
                    <Link href={"/billings"}>Billings</Link>
                  </DropdownMenuItem>
                )}
                {!session && (
                  <DropdownMenuItem>
                    <Button
                      className=""
                      onClick={() => router.push("/auth/signup")}
                    >
                      Sign Up
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
              {links.map((link) => (
                <li>
                  <Link
                    key={link.label}
                    href={`${currentHref.endsWith('tools') ? '/' : ''}${link.href}`}
                    aria-label={link.label}
                    title={link.label}
                    class="block py-2 px-3  rounded md:bg-transparent md:p-0 "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {session && (
                <li>
                  <Link
                    href={"/billings"}
                    class="block py-2 px-3  rounded    md:p-0    "
                  >
                    Billings
                  </Link>
                </li>
              )}
            </ul>
          </div>

        </div>

      </nav>
    </div>
  );
};

export default Navbar;
