import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" flex justify-center items-center w-screen h-screen absolute top-0 flex-col">
      <h1 className="head_text text-center mb-[1rem]">
        Not Found
        <p className="orange_gradient text-center text-[40px]">
          Could not find requested Page
        </p>
      </h1>

      <Link href="/" className=" w-fit black_btn text-[3.5rem] mt-[1rem]">
        Return Home
      </Link>
    </div>
  );
}
