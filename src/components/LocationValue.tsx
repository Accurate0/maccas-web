import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useUserConfig from "../hooks/useUserConfig";

const LocationValue = () => {
  const { config, isCompleted } = useUserConfig();
  const router = useRouter();

  return (
    <Button sx={{ color: "white" }} onClick={() => router.push("/location")}>
      <Grid item container spacing={1} direction="row">
        <Grid item>
          <FontAwesomeIcon icon={faStoreAlt} size="1x" />
        </Grid>
        <Grid item>
          <Typography variant="caption">
            <b>{config?.storeName ?? (isCompleted ? "None" : "Loading...")}</b>
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
};

export default LocationValue;
