"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { logo2 } from "../../../../../public/svgExport";
import { OrganizationSwitcher } from "@clerk/nextjs/app-beta";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {};

const OrgNav = (props: Props) => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className="hidden lg:flex items-center flex-col bg-color-a space-y-6 px-4 py-5">
      <Link href={"/"}>
        <div className="flex">
          <Image src={logo2} alt="Logo" height={120} width={150} />
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "#fef1f5",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "myvar_1" : "myvar_2"}
          asChild
          size={"xl"}
          className="font-normal px-2 w-full justify-start"
        >
          <Link
            href={{
              pathname: "/",
            }}
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            <span className="text-lg">Team Boards</span>
          </Link>
        </Button>
        <Button
          variant={favorites ? "myvar_2" : "myvar_1"}
          asChild
          size={"xl"}
          className="font-normal px-2 w-full justify-start"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-5 w-5 mr-2" />
            <span className="text-lg">Favorite Boards</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgNav;
