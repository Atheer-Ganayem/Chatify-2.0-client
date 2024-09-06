"use client";
import React from "react";
import Input from "../ui/Input";
import FormBtn from "../ui/FormBtn";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Search = () => {
  const path = usePathname();
  const router = useRouter();

  function submitHandler(formData: FormData) {
    const term = formData.get("search");
    if (term) {
      router.push(`${path}?search=${term}`);
    }
  }

  return (
    <form className="mx-auto flex items-center" action={submitHandler}>
      <Input
        name="search"
        placeholder="Type friend's name"
        type="text"
        className="rounded-r-none"
      />
      <FormBtn color="primary" className="h-[44px] rounded-l-none">
        <SearchIcon />
      </FormBtn>
    </form>
  );
};

export default Search;
