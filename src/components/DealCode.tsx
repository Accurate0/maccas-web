import { Alert, Box, IconButton, LinearProgress } from "@mui/joy";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Refresh from "@mui/icons-material/Refresh";

interface DealCodeProps {
  id: string;
  onRemove: () => void;
  loading: boolean;
  error?: string;
  code?: string;
  dealId?: string;
}

const DealCode = ({ id, onRemove, loading, error, code, dealId }: DealCodeProps) => {
  const apiClient = useApiClient();
  const userConfig = useGetUserConfig();

  const removeDealMutation = useMutation({
    mutationKey: [`remove-deal-${id}`],
    mutationFn: async () => {
      if (dealId) {
        return await apiClient.remove_deal(dealId, userConfig!.storeId);
      }
    },
    onError: onRemove,
    onSuccess: onRemove,
  });

  const refreshMutation = useMutation({
    mutationKey: [`refresh-deal-${id}`],
    mutationFn: async () => {
      if (dealId) {
        return await apiClient.get_code(dealId, userConfig!.storeId);
      }
    },
  });

  const disableButtons =
    loading || removeDealMutation.status === "pending" || refreshMutation.status === "pending";

  const getAddDealResponse = useMemo(() => {
    if (error) {
      return error;
    }

    if (
      loading ||
      removeDealMutation.status === "pending" ||
      refreshMutation.status === "pending"
    ) {
      return (
        <LinearProgress color={removeDealMutation.status === "pending" ? "danger" : "primary"} />
      );
    }

    if (!loading) {
      return (
        <Box sx={{ fontFamily: "Monospace", fontSize: "h4.fontSize" }}>
          {refreshMutation.data?.result.randomCode ?? code}
        </Box>
      );
    }
  }, [
    code,
    error,
    loading,
    refreshMutation.data?.result.randomCode,
    refreshMutation.status,
    removeDealMutation.status,
  ]);

  return (
    <Alert
      sx={{ height: 24 }}
      endDecorator={
        <>
          <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            disabled={disableButtons}
            onClick={async () => {
              await refreshMutation.mutateAsync();
            }}
          >
            <Refresh />
          </IconButton>
          <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            disabled={disableButtons}
            onClick={async () => {
              await removeDealMutation.mutateAsync();
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      }
    >
      {getAddDealResponse}
    </Alert>
  );
};

export default DealCode;
