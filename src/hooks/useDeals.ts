import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { GetDealsOffer } from "./useApiClient/ApiClient.generated";
import useAxios from "./useAxios";
import useNotification from "./useNotification";

const useDeals = () => {
  const [state, setState] = useState<GetDealsOffer[]>();
  const notification = useNotification();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await axios.get("/deals");
        setState(response?.data as GetDealsOffer[]);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useDeals;
