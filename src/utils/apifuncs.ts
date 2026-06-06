interface callApi {
  apiCall: any;
  successCallBack?: (data: any) => void;
}

export const callApiHook = async ({
  apiCall,
  successCallBack,
}: callApi) => {
  const response = await apiCall;

  if (response?.status < 400) {
    return successCallBack!(response.data);
  }
};
