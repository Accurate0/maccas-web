import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useUserConfig from "../hooks/useUserConfig";

const LocationValue = () => {
  const { config } = useUserConfig();
  const router = useRouter();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item alignSelf="center" alignItems="center">
          <Button color="inherit" onClick={() => router.push("/location")}>
            <Typography variant="caption">
              <b>Store: {config?.storeName || "None"}</b>
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationValue;
