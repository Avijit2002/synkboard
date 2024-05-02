import React from "react";

type Props = {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: Function;
  disabled: boolean;
};

const Footer = ({ isFavorite, title, authorLabel, createdAtLabel }: Props) => {
  return (
    <div className="p-4 bg-white">
      <h3 className="text-lg truncate max-w-[calc(100%-20px)]">{title}</h3>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
    </div>
  );
};

export default Footer;
