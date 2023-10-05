"use client";

import { useState, useEffect, ChangeEvent } from "react";

import PromptCard from "./PromptCard";
import { postType } from "../../types";
type PromptCardListProps = {
  data: postType[] | undefined;
  handleTagClick: (tag: string) => void;
};
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<postType[] | undefined>(undefined);

  // Search states
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<
    postType[] | undefined
  >([]);
  // Search states

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    console.log({ datajjjj: data });
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string): postType[] | undefined => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts?.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    // debounce method
    const x = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
    setSearchTimeout(x);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult: postType[] | undefined = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
