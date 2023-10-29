import { Link, Typography } from "@mui/joy";
import { Box, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar variant="dense">
          <Typography level="h3" sx={{ color: "white" }}>
            <Link
              onClick={() => navigate("/")}
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Maccas
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
