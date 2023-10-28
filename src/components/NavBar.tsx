import { Typography } from "@mui/joy";
import { Box, AppBar, Toolbar } from "@mui/material";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar variant="dense">
          <Typography level="h3" sx={{ color: "white" }}>
            Maccas
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
