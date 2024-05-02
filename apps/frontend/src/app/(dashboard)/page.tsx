"use client";

import { useEffect } from "react";
import { logo2 } from "../../../public/svgExport";
import BoardList from "./_components/BoardList";
import EmptyPage from "./_components/EmptyPage";
import {
  CreateOrganization,
  auth,
  useAuth,
  useOrganization,
} from "@clerk/nextjs";
import { DialogContent } from "@/components/ui/dialog";

type Props = {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

const Dashboard = ({ searchParams }: Props) => {
  const { organization } = useOrganization();
  //const { getToken } = useAuth();

  return (
    <div className="flex-1 bg-color-background h-[calc(100%-80px)] p-9 overflow-y-scroll">
      {!organization ? (
        <EmptyPage
          image={logo2}
          label="Create an organization to get started"
          heading="Welcome to Synkboard"
          buttonLabel="Create Organization"
        >
          <DialogContent className="border-none p-0 bg-transparent max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </EmptyPage>
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default Dashboard;
