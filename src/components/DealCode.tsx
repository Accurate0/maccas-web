import { Alert, Box, IconButton, LinearProgress } from "@mui/joy";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";

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

  const getAddDealResponse = useMemo(() => {
    if (error) {
      return error;
    }

    if (loading || removeDealMutation.status === "pending") {
      return (
        <LinearProgress color={removeDealMutation.status === "pending" ? "danger" : "primary"} />
      );
    }

    if (!loading) {
      return <Box sx={{ fontFamily: "Monospace", fontSize: "h4.fontSize" }}>{code}</Box>;
    }
  }, [code, error, loading, removeDealMutation.status]);

  return (
    <Alert
      sx={{ height: 24 }}
      endDecorator={
        <IconButton
          variant="plain"
          size="sm"
          color="neutral"
          disabled={loading || removeDealMutation.status === "pending"}
          onClick={async () => {
            await removeDealMutation.mutateAsync();
          }}
        >
          <CloseIcon />
        </IconButton>
      }
    >
      {getAddDealResponse}
    </Alert>
  );
};

export default DealCode;
