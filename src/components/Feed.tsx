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
  // serach filter function
  const filterPrompts = (searchtext: string): postType[] | undefined => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts?.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  /**
   *what happens when the user types in the search bar
   * 1. the search text is updated
   * 2.the old timeout is cleared to start a new time for the new search text debounce
   * 3. the new timeout is set
   * 4. the filter function is called with the new search text
   */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      console.log("cleared");
    }
    setSearchText(e.target.value);

    // debounce method
    const x = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
    setSearchTimeout(x);
    // clearTimeout(x); // this is not working because settimeout is async and the clear timeout is called before the timeout is set
    console.log({ x });
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
