import LoadingApi from "@/components/ApiLoading";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return <LoadingApi loading={true}> Loading </LoadingApi>;
};

export default Loading;
