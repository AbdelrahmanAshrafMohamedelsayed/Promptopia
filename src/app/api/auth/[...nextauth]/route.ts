import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth, { Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sessionUser } from "../../../../../types";
type ProfileType = Profile & { picture: string };
type SessionType = Session & { user: { id: string } };
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "853754275070-mqec2v0j853n7l77qbp3jqe8c4rfud9b.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async session({ session }) {
      // this function return the user
      // store the user id from MongoDB to session
      const sessionTyped = session as SessionType;
      const sessionUser = await User.findOne({
        email: sessionTyped?.user?.email,
      });
      sessionTyped.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB(); // connect to MongoDB with each request
        console.log({ profile });
        const profileTyped = profile as ProfileType;
        console.log({ profileTyped });
        // check if user already exists
        const userExists = await User.findOne({ email: profileTyped?.email });

        // if not, create a new document and save user in MongoDB signup
        if (!userExists) {
          await User.create({
            email: profileTyped?.email,
            username: profileTyped?.name?.replace(" ", "").toLowerCase(),
            image: profileTyped?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(
          "Error checking if user exists: ",
          (error as Error).message
        );
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
