"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import { postType } from "../../../types";

// import Profile from "@components/Profile";
type userType =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      id?: string | null | undefined;
    }
  | undefined;
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user: userType = session?.user; // user is the current logged in user

  const [myPosts, setMyPosts] = useState<undefined | postType[]>(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${user?.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (user?.id) fetchPosts();
  }, [user?.id]);

  const handleEdit = (post: postType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: postType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts?.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
