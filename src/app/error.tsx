"use client"; // Error components must be Client Components

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div className=" flex justify-center items-center w-screen h-screen absolute top-0 flex-col">
      <h1 className="head_text text-center mb-[1rem]">
        {error instanceof Error ? error.message : "An error occurred"}
      </h1>

      <Link href="/" className=" w-fit black_btn text-[3.5rem] mt-[1rem]">
        Try again
      </Link>
    </div>
  );
}
