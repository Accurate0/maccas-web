import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import useOfferCode from "../../hooks/useOfferCode";
import useDeal from "../../hooks/useDeal";
import LoadableCardMedia from "../../components/LoadableCardMedia";
import { useNavigate, useParams } from "react-router";

export interface DealSelectionProps {}

const DealSelection: React.FC<DealSelectionProps> = () => {
  const navigate = useNavigate();
  const { dealId } = useParams();
  const { deal } = useDeal(dealId ?? "");
  const { code, remove, refreshCode } = useOfferCode(deal);

  return (
    <>
      {code && deal && (
        <Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "98vh" }}
            paddingTop={8}
            paddingBottom={4}
          >
            <Grid item xs={12}>
              <Card variant="outlined">
                <LoadableCardMedia image={deal.imageUrl} alt="missing image" />
                <CardContent style={{ margin: "25px 25px 25px 25px" }}>
                  <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                    Offer
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {deal?.shortName}
                  </Typography>
                  <Typography gutterBottom>{code.message}</Typography>
                  <Typography component="div" gutterBottom>
                    <Box sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize" }}>
                      {code.randomCode}
                    </Box>
                  </Typography>
                </CardContent>
                <CardActions style={{ margin: "25px 25px 25px 25px" }}>
                  <Grid container direction="column" justifyContent="space-between" spacing={2}>
                    <Grid item>
                      <Button
                        color="info"
                        variant="outlined"
                        onClick={async () => {
                          await refreshCode();
                        }}
                      >
                        Refresh Code
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={async () => {
                          await remove();
                          navigate("/");
                        }}
                      >
                        I don&apos;t want to use this
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

export default DealSelection;
