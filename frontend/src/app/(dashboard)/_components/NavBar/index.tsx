"use client";
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import InviteButton from "./inviteButton";

type Props = {};

const NavBar = (props: Props) => {
  const { organization } = useOrganization();
  return (
    <div className="bg-color-a items-center w-full h-[80px] flex gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden xl:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
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
      </div>
      {organization ? (
        <div>
          <InviteButton />
        </div>
      ) : null}
      <UserButton />
    </div>
  );
};

export default NavBar;
