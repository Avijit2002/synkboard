"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

type Props = {};

const SearchInput = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        placeholder="Search Boards..."
        onChange={handleChange}
        value={value}
        className="w-full h-12 pl-10 max-w-[516px] bg-color-c text-md"
      />
    </div>
  );
};

export default SearchInput;
