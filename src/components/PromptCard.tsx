"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { postType, sessionUser } from "../../types";
type PromptCardProps = {
  post: postType;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleTagClick?: (tag: string) => void;
};
type userType =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      id?: string | null | undefined;
    }
  | undefined;
const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}: PromptCardProps) => {
  const { data: session } = useSession();
  const user: userType = session?.user; // user is the current logged in user
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState<string | null | boolean>(null);

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === user?.id) return router.push("/profile"); // if the user is the creator of the post, redirect to your  profile page

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`); // if the user is not the creator of the post, redirect to the creator's profile page
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000); // it is important for the copy icon to be visible for at least 3 seconds
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700  break-words">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {user?.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
