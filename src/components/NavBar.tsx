import { Typography } from "@mui/joy";
import { Box, AppBar, Toolbar, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary" elevation={0}>
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
