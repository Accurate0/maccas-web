import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import AxiosInstance from "../lib/AxiosInstance";
import { AccountResponse } from "../types/AccountResponse";
import { TotalAccountsResponse } from "../types/TotalAccountsResponse";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useStatistics = () => {
  const [totalAccounts, setTotalAccounts] = useState<TotalAccountsResponse>();
  const [accounts, setAccounts] = useState<AccountResponse>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);

        const [totalAccountResponse, accountResponse] = await Promise.all([
          AxiosInstance.get("/statistics/total-accounts"),
          AxiosInstance.get("/statistics/account"),
        ]);

        setTotalAccounts(totalAccountResponse.data as TotalAccountsResponse);
        setAccounts(accountResponse.data as AccountResponse);
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
