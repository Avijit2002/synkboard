import React from "react";
import { type typeBoard } from "@repo/common";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";

const BoardCard = ({ board }: { board: typeBoard }) => {
  const { userId } = useAuth();

  const authorLabel = userId === board.authorId ? "You" : board.userName;
  const createdAtLabel = formatDistanceToNow(board.createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${board.id}`} className="h-[22rem] w-full max-w-[18rem]">
      <div className="group rounded-lg border flex flex-col h-full w-full justify-center"> 
      {/* group is used to change style of any other element if some event occurs here  */}
        <div className="relative bg-blue-100 flex-1 rounded-t-lg">
          <Image
            src={board.imageUrl}
            height={100}
            width={100}
            alt={board.title}
            className="h-full w-full"
          />
          <Overlay />
        </div>
        <Footer
          isFavorite={false}
          title={board.title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

export default BoardCard;
