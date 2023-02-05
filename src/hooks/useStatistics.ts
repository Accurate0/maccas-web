import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useStatistics = () => {
  const [totalAccounts, setTotalAccounts] = useState<number>();
  const [accounts, setAccounts] = useState<{ [key: string]: number }>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);

        const [totalAccountResponse, accountResponse] = await Promise.all([
          apiClient.get_total_accounts(),
          apiClient.get_accounts(),
        ]);

        setTotalAccounts(totalAccountResponse?.result);
        setAccounts(accountResponse?.result);
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
