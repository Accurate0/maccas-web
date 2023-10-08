import {
  Box,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Link,
  Button,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import LocationValue from "./LocationValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown91, faBars, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { theme } from "../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "../hooks/useApiClient/ApiClient.generated";
import useAuthentication from "../hooks/useAuthentication";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { role } = useAuthentication();
  const showPoints = useMemo(() => role === UserRole.Admin || role === UserRole.Privileged, [role]);
  const location = useLocation();
  const showLocation = location.pathname !== "/login";

  const rightButtons = (direction: "row" | "column") => (
    <Grid
      container
      sx={{ padding: "8px" }}
      spacing={3}
      direction={direction}
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      {showPoints && (
        <Grid item>
          <Button sx={{ color: "white" }} onClick={() => navigate("/points")}>
            <Grid item container spacing={1} direction="row">
              <Grid item>
                <FontAwesomeIcon icon={faArrowDown91} size="1x" />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <b>Points</b>
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      )}
      <Grid item>
        <Button sx={{ color: "white" }} onClick={() => navigate("/spending")}>
          <Grid item container spacing={1} direction="row">
            <Grid item>
              <FontAwesomeIcon icon={faMoneyBill} size="1x" />
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <b>Spending</b>
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      {showLocation && (
        <Grid item>
          <LocationValue />
        </Grid>
      )}
    </Grid>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary" elevation={0}>
        <Toolbar variant="dense">
          <Grid justifyContent="space-between" alignItems="baseline" container>
            <Grid item>
              <Typography variant="h6" color="inherit" component="div">
                <Link
                  onClick={() => navigate("/")}
                  style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  Maccas
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
