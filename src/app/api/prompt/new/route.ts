import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json(); // body.req
  console.log({
    prompt: prompt,
    userId: userId,
    tag: tag,
    str: "route",
  });
  try {
    await connectToDB();
    // connectToDB is a lambda function that dies after it's called
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    console.log({ newPrompt });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
