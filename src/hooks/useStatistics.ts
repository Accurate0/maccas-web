import useApiClient from "./useApiClient/useApiClient";
import { useQuery } from "@tanstack/react-query";

const useStatistics = () => {
  const apiClient = useApiClient();

  const totalAccounts = useQuery({
    queryKey: ["total-accounts"],
    queryFn: async ({ signal }) => (await apiClient.get_total_accounts(signal)).result,
  });

  const accounts = useQuery({
    queryKey: ["accounts"],
    queryFn: async ({ signal }) => (await apiClient.get_accounts(signal)).result,
  });

  return { totalAccounts, accounts };
};

export default useStatistics;
