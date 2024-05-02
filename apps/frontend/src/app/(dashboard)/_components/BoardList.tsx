"use client";

import {
  createBoard,
  noFavourite,
  noResult,
} from "../../../../public/svgExport";
import EmptyPage from "./EmptyPage";
import CreateBoard from "./CreateBoard";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/api/dashboard";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import BoardCard from "./board-cards/card";
import { typeBoard } from "@repo/common";

type Props = {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

const BoardList = ({ orgId, query }: Props) => {
  const { organization } = useOrganization();
  const { getToken } = useAuth();

  const { data } = useQuery({
    queryKey: ["boards", organization?.id], // Each query cache is uniquely identified so storing boards data of different orgs in different cache.
    queryFn: async () => {
      const token = await getToken();

      if (!token) throw new Error("No token!");
      if (!organization) throw new Error("No organization selected!");

      return getBoards(token, organization.id);
    },
  });

  const boards: typeBoard[] = data?.data?.data;
  console.log(boards)

  if (!boards && query.search) {
    // TODO: This don't work now because search api call nt implemented yet
    return (
      <EmptyPage
        image={noResult}
        heading="No matching board found"
        label="Try searching something else"
        size="sm"
      />
    );
  }

  if (!boards && query.favorites) {
    return (
      <EmptyPage
        image={noFavourite}
        heading="You have no favourite board yet"
        label="Mark a board as favourite"
        size="sm"
      />
    );
  }

  if (!boards?.length) {
    return (
      <EmptyPage
        image={createBoard}
        heading="You have not created a board yet"
        label="Create a board to get started"
        buttonLabel="Create Board"
      >
        <CreateBoard />
      </EmptyPage>
    );
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4 gap-8 pb-10 justify-items-center">
        {boards?.map((board: typeBoard) => (
         <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
