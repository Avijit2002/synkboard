"use client";

import { createBoard, noFavourite, noResult } from "../../../../public/svgExport";
import EmptyPage from "./EmptyPage";

type Props = {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

const BoardList = ({ orgId, query }: Props) => {
  const data = []; // TODO : API Call

  if (!data.length && query.search) {
    return <EmptyPage
    image={noResult}
    heading="No matching board found"
    label="Try searching something else"
    size="sm"
  />;
  }

  if (!data.length && query.favorites) {
    return <EmptyPage
    image={noFavourite}
    heading="You have no favourite board yet"
    label="Mark a board as favourite"
    size="sm"
  />;
  }

  if (!data.length) {
    return (
      <EmptyPage
        image={createBoard}
        heading="You have not created a board yet"
        label="Create a board to get started"
        buttonLabel="Create Board"
      />
    );
  }

  return <div>{JSON.stringify(query)}</div>;
};

export default BoardList;
