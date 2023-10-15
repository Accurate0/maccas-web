import { Alert, Box, LinearProgress } from "@mui/joy";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import useNotification from "../hooks/useNotification";
import { Grid } from "@mui/material";

interface PointCodeProps {
  id: string;
  open: boolean;
}

const PointCode = ({ id, open }: PointCodeProps) => {
  const apiClient = useApiClient();
  const userConfig = useGetUserConfig();
  const notification = useNotification();

  const pointsCodeMutation = useMutation({
    mutationKey: [`points-${id}`],
    mutationFn: async () => {
      if (!userConfig?.storeId) {
        notification({ variant: "error", msg: "A store must be selected." });
        return;
      }

      return (await apiClient.get_points_by_id(id, userConfig!.storeId)).result;
    },
  });

  useEffect(() => {
    if (pointsCodeMutation.isIdle && open) {
      pointsCodeMutation.mutate();
    }
  }, [pointsCodeMutation, open]);

  const pointsResponse = useMemo(() => {
    if (pointsCodeMutation.status === "error") {
      return pointsCodeMutation.error.message;
    }

    if (pointsCodeMutation.status === "pending") {
      return <LinearProgress />;
    }

    if (pointsCodeMutation.status === "success") {
      return (
        <Box sx={{ fontFamily: "Monospace", fontSize: "h4.fontSize" }}>
          {pointsCodeMutation.data?.offerResponse.randomCode}
        </Box>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsCodeMutation.status]);

  return (
    <Grid item xs>
      <Alert sx={{ height: 24 }}>{pointsResponse}</Alert>
    </Grid>
  );
};

export default PointCode;
