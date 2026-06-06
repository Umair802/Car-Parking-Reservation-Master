import Footer from "@/components/Footer";
import Header from "@/components/Header";

import React from "react";

interface Props {
  children: any;
}

const PublicLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
