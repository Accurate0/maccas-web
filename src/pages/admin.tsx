import { Grid, Box } from "@mui/material";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { Button } from "@mui/joy";
import { useState } from "react";
import useNotification from "../hooks/useNotification";
import { ApiException, UserRole } from "../hooks/useApiClient/ApiClient.generated";
import useSetBackdrop from "../hooks/useSetBackdrop";

const Admin = () => {
  const apiClient = useApiClient();
  const notification = useNotification();
  const setBackdrop = useSetBackdrop();
  const [qrCodeLink, setQrCodeLink] = useState<string | undefined>(undefined);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container xs={12} direction="column">
        <Grid item xs={12}>
          <Button
            fullWidth
            onClick={async () => {
              try {
                setBackdrop(true);
                const { result } = await apiClient.registration_token(UserRole.None, true);
                setQrCodeLink(result.qrCodeLink);
                console.log(result);
                notification({
                  msg: "Link generated",
                  config: {
                    action: {
                      label: "Click me to copy",
                      onClick: async () =>
                        await navigator.clipboard.writeText(result.registrationLink),
                    },
                  },
                });
              } catch (e) {
                if (ApiException.isApiException(e)) {
                  notification({ msg: e.message, variant: "error" });
                }
              } finally {
                setBackdrop(false);
              }
            }}
          >
            Generate single use QR code
          </Button>
          <Grid item xs paddingTop={2}>
            {qrCodeLink && (
              <Box
                component="img"
                sx={{
                  borderRadius: "8px",
                  height: "100%",
                  width: "100%",
                }}
                src={qrCodeLink}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
