"use client";

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import Item from "./Item";

type Props = {};

const List = (props: Props) => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if(!userMemberships.data?.length) return null

  return <ul className="space-y-4">
    {userMemberships.data.map(mem=>{
        return <Item 
            key={mem.organization.id}
            name={mem.organization.name}
            id={mem.organization.id}
            imageurl={mem.organization.imageUrl}
        />
    })}
  </ul>;
};

export default List;
