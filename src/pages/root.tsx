import { Outlet, useLocation, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useEffect, useMemo, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { Container, Grid } from "@mui/material";
import { theme } from "../theme";
import Prefetch from "../components/Prefetch";
import "@fontsource/inter";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { JoyToaster } from "../components/JoyToaster";
import {
  faArrowDown91,
  faBurger,
  faSpaghettiMonsterFlying,
  faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationModal from "../components/LocationModal";
import useUserConfig, { useGetUserConfig } from "../hooks/useUserConfig";
import { truncate } from "../utils/truncate";
import { Button } from "@mui/joy";
import { UserRole } from "../hooks/useApiClient/ApiClient.generated";

const materialTheme = materialExtendTheme(theme);

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAuthentication();
  const config = useGetUserConfig();
  const { fetchStatus } = useUserConfig();
  const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false);
  const { role } = useAuthentication();
  const showPoints = useMemo(() => role === UserRole.Admin || role === UserRole.Privileged, [role]);
  const isAdmin = role === UserRole.Admin;
  const { href, name, icon } = useMemo(() => {
    if (location.pathname === "/" && showPoints) {
      return { href: "/points", name: "Points", icon: faArrowDown91 };
    }

    if (location.pathname === "/points" || location.pathname !== "/") {
      return { href: "/", name: "Deals", icon: faBurger };
    }

    return {};
  }, [location.pathname, showPoints]);

  const showTopItems =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/admin";

  useEffect(() => {
    if (!state && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [state, navigate, location.pathname]);

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <NavBar />
        <Prefetch />
        <JoyToaster />
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container>
            {showTopItems && (
              <>
                <LocationModal open={locationModalOpen} setOpen={setLocationModalOpen} />
                <Grid paddingTop={2} spacing={2} container>
                  {href && name && (
                    <Grid item xs>
                      <Button fullWidth sx={{ color: "white" }} onClick={() => navigate(href)}>
                        <Grid container spacing={1} alignItems="center" justifyContent="center">
                          <Grid item>
                            <FontAwesomeIcon icon={icon} size="1x" />
                          </Grid>
                          <Grid item>
                            <b>{name}</b>
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>
                  )}

                  <Grid item xs>
                    <Button fullWidth onClick={() => setLocationModalOpen(true)}>
                      <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item>
                          <FontAwesomeIcon icon={faStoreAlt} size="1x" />
                        </Grid>
                        <Grid item>
                          <b>
                            {config?.storeName
                              ? truncate(config.storeName, 12)
                              : fetchStatus === "fetching"
                              ? "Loading..."
                              : "None"}
                          </b>
                        </Grid>
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>

                {isAdmin && (
                  <Grid paddingTop={2} spacing={2} container>
                    <Grid item xs>
                      <Button fullWidth onClick={() => navigate("/admin")}>
                        <Grid container spacing={1} alignItems="center" justifyContent="center">
                          <Grid item>
                            <FontAwesomeIcon icon={faSpaghettiMonsterFlying} size="1x" />
                          </Grid>
                          <Grid item>
                            <b>Admin</b>
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </>
            )}

            <Outlet />
          </Container>
        </div>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default Root;
