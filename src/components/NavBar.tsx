import { useMsal } from "@azure/msal-react";
import { Box, AppBar, Toolbar, Grid, Typography, Button, Link } from "@mui/material";
import { useRouter } from "next/router";
import LocationValue from "./LocationValue";

const NavBar = () => {
  const router = useRouter();
  const { instance } = useMsal();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary" elevation={1}>
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
            <Grid item>
              <Grid container spacing={3}>
                <Grid item>
                  <LocationValue />
                </Grid>
                <Grid item style={{ paddingLeft: 0 }}>
                  <Button color="inherit" onClick={() => instance.logoutRedirect()}>
                    <Typography variant="caption">
                      <b>Logout</b>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
