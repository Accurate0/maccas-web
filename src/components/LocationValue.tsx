import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography } from "@mui/material";
import useUserConfig from "../hooks/useUserConfig";
import { useNavigate } from "react-router-dom";

const LocationValue = () => {
  const config = useUserConfig();
  const navigate = useNavigate();

  return (
    <Button sx={{ color: "white" }} onClick={() => navigate("/location")}>
      <Grid item container spacing={1} direction="row">
        <Grid item>
          <FontAwesomeIcon icon={faStoreAlt} size="1x" />
        </Grid>
        <Grid item>
          <Typography variant="caption">
            <b>{config.data?.storeName ?? (config.status === "success" ? "None" : "Loading...")}</b>
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
};

export default LocationValue;
