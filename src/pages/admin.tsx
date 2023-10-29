import { Grid } from "@mui/material";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { Button } from "@mui/joy";
import { useState } from "react";
import useNotification from "../hooks/useNotification";
import { ApiException, UserRole } from "../hooks/useApiClient/ApiClient.generated";

const Admin = () => {
  const apiClient = useApiClient();
  const notification = useNotification();
  const [qrCodeLink, setQrCodeLink] = useState<string | undefined>(undefined);

  return (
    <Grid container paddingTop={2} paddingBottom={4} xs={12} direction="column">
      <Grid item xs>
        <Button
          fullWidth
          onClick={async () => {
            try {
              const { result } = await apiClient.registration_token(UserRole.None, true);
              setQrCodeLink(result.qrCodeLink);
            } catch (e) {
              if (ApiException.isApiException(e)) {
                notification({ msg: e.message, variant: "error" });
              }
            }
          }}
        >
          Generate single use QR code
        </Button>
        {qrCodeLink && (
          <img src={qrCodeLink} height="100%" width="100%" style={{ objectFit: "scale-down" }} />
        )}
      </Grid>
    </Grid>
  );
};

export default Admin;
