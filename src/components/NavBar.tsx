import { useMsal } from "@azure/msal-react";
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
import { useRouter } from "next/router";
import useEnvironment from "../hooks/useEnvironment";
import LocationValue from "./LocationValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown91, faBars, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../theme";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const { isDevelopment } = useEnvironment();
  const [open, setOpen] = useState(false);
  const { instance } = useMsal();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const rightButtons = (direction: "row" | "column") => (
    <Grid
      container
      sx={{ padding: "8px" }}
      spacing={3}
      direction={direction}
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <Grid item>
        <Button sx={{ color: "white" }} onClick={() => router.push("/points")}>
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
      <Grid item>
        <Button sx={{ color: "white" }} onClick={() => router.push("/spending")}>
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
      <Grid item>
        <LocationValue />
      </Grid>
      {isDevelopment && (
        <Grid item>
          <Button onClick={() => instance.logoutRedirect()}>Logout</Button>
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
                  onClick={() => router.push("/")}
                  style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  Maccas
                </Link>
              </Typography>
            </Grid>
            {isMobile ? (
              <Grid item>
                <Button color="inherit" onClick={() => setOpen(true)}>
                  <FontAwesomeIcon icon={faBars} size="1x" />
                </Button>
                <Drawer
                  PaperProps={{
                    sx: {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                  onClose={() => setOpen(false)}
                  ModalProps={{ onBackdropClick: () => setOpen(false) }}
                  anchor="right"
                  open={open}
                >
                  {rightButtons("column")}
                </Drawer>
              </Grid>
            ) : (
              <Grid item>{rightButtons("row")}</Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
