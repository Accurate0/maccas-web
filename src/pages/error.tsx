import { Button, Card, CardActions, Typography } from "@mui/joy";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Grid container direction="column" spacing={2} padding={2}>
      <Grid item xs sx={{ textAlign: "center" }}>
        <Card>
          <Typography level="h1">Literally anything could've gone wrong.</Typography>
          <CardActions>
            <Button onClick={() => navigate("/")}>Click me</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Error;
