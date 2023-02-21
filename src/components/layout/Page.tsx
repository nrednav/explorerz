import { FC, ReactNode } from "react";
import type { NextPage } from "next";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const Body: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <div className="min-h-screen">{children}</div>;
};

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export const Page: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <Body>
      <NavBar />
      <Container>{children}</Container>
      <Footer />
    </Body>
  );
};
