import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AccountResponse } from "../types/AccountResponse";
import { TotalAccountsResponse } from "../types/TotalAccountsResponse";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useStatistics = () => {
  const [totalAccounts, setTotalAccounts] = useState<TotalAccountsResponse>();
  const [accounts, setAccounts] = useState<AccountResponse>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);

        const [totalAccountResponse, accountResponse] = await Promise.all([
          axios.get("/statistics/total-accounts"),
          axios.get("/statistics/account"),
        ]);

        setTotalAccounts(totalAccountResponse?.data as TotalAccountsResponse);
        setAccounts(accountResponse?.data as AccountResponse);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    totalAccounts,
    accounts,
  };
};

export default useStatistics;
