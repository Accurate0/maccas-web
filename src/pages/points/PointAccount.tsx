import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import usePointAccount from "../../hooks/usePointAccount";
import { useNavigate, useParams } from "react-router";

export interface PointAccountProps {}

const PointAccount: React.FC<PointAccountProps> = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { pointInformation } = usePointAccount(accountId ?? "");

  return (
    <>
      {pointInformation && (
        <Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
            paddingTop={8}
            paddingBottom={4}
          >
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent style={{ margin: "25px 25px 25px 25px", minWidth: 200 }}>
                  <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                    Account
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {accountId}
                  </Typography>
                  <Typography>
                    <>Points: {pointInformation?.pointsResponse.totalPoints ?? 0}</>
                  </Typography>
                  <Typography gutterBottom>{pointInformation?.offerResponse.message}</Typography>
                  <Typography component="div" gutterBottom>
                    <Box sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize" }}>
                      {pointInformation?.offerResponse.randomCode}
                    </Box>
                  </Typography>
                </CardContent>
                <CardActions style={{ margin: "25px 25px 25px 25px" }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          navigate("/points");
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default PointAccount;
