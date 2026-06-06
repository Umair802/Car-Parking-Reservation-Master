import React from "react";

// This will display a loading spinner when 'loading' is true
const LoadingApi = ({ loading, children }: { loading: any; children: any }) => {
  return loading ? (
    <div className="flex justify-center items-center">
      {/* Loader Spinner */}
      <div className="border-orange-600 border-t-4 border-solid rounded-full w-10 h-10 animate-spin"></div>
    </div>
  ) : (
    children
  );
};

export default LoadingApi;
