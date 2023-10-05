"use client";

import { SessionProvider } from "next-auth/react";
type props = {
  children: React.ReactNode;
  session?: any;
};
const Provider = ({ children, session }: props) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
