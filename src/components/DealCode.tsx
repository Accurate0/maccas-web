import { Alert, Box, IconButton, LinearProgress } from "@mui/joy";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import useNotification from "../hooks/useNotification";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DealCodeProps {
  id: string;
  onRemove: () => void;
}

const DealCode = ({ id, onRemove }: DealCodeProps) => {
  const apiClient = useApiClient();
  const userConfig = useGetUserConfig();
  const notification = useNotification();

  const addDealMutation = useMutation({
    mutationKey: [`deal-${id}`],
    mutationFn: async () => {
      if (!userConfig?.storeId) {
        notification({ variant: "error", msg: "A store must be selected." });
        return;
      }

      return (await apiClient.add_deal(id, userConfig!.storeId)).result;
    },
  });

  const removeDealMutation = useMutation({
    mutationKey: [`remove-deal-${id}`],
    mutationFn: async () => {
      if (addDealMutation.data?.dealUuid) {
        return await apiClient.remove_deal(addDealMutation.data.dealUuid, userConfig!.storeId);
      }
    },
  });

  useEffect(() => {
    if (addDealMutation.isIdle) {
      addDealMutation.mutate();
    }
  }, [addDealMutation]);

  const getAddDealResponse = useMemo(() => {
    if (addDealMutation.status === "error") {
      return addDealMutation.error.message;
    }

    if (addDealMutation.status === "pending" || removeDealMutation.status === "pending") {
      return (
        <LinearProgress color={removeDealMutation.status === "pending" ? "danger" : "primary"} />
      );
    }

    if (addDealMutation.status === "success") {
      return (
        <Box sx={{ fontFamily: "Monospace", fontSize: "h4.fontSize" }}>
          {addDealMutation.data?.randomCode}
        </Box>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDealMutation.status, removeDealMutation.status]);

  return (
    <Grid item xs>
      <Alert
        sx={{ height: 24 }}
        endDecorator={
          <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            disabled={
              addDealMutation.status === "pending" || removeDealMutation.status === "pending"
            }
            onClick={async () => {
              await removeDealMutation.mutateAsync();
              onRemove();
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {getAddDealResponse}
      </Alert>
    </Grid>
  );
};

export default DealCode;
