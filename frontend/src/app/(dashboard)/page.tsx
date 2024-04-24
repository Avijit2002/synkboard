"use client";

import { logo2 } from "../../../public/svgExport";
import BoardList from "./_components/BoardList";
import EmptyPage from "./_components/EmptyPage";
import { useOrganization } from "@clerk/nextjs";

type Props = {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

const Dashboard = ({ searchParams }: Props) => {
  const { organization } = useOrganization();
  return (
    <div className="flex-1 bg-color-background h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyPage
          image={logo2}
          label="Create an organization to get started"
          heading="Welcome to Synkboard"
          buttonLabel="Create Organization"
        />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default Dashboard;
