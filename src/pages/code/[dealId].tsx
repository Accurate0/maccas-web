import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { IMAGE_BUCKET_BASE } from "../../config/images";
import useOfferCode from "../../hooks/useOfferCode";
import useDeal from "../../hooks/useDeal";

export interface DealSelectionProps {}

const DealSelection: React.FC<DealSelectionProps> = () => {
  const router = useRouter();
  const dealId = router.query["dealId"] as string | undefined;
  const deal = useDeal(dealId);
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
            style={{ minHeight: "100vh" }}
            paddingTop={8}
            paddingBottom={4}
          >
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardMedia
                  height="380"
                  width="380"
                  component="img"
                  image={`${IMAGE_BUCKET_BASE}/${deal?.imageBaseName}`}
                />
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
                    <Box sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize" }}>{code.randomCode}</Box>
                  </Typography>
                </CardContent>
                <CardActions style={{ margin: "25px 25px 25px 25px" }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        color="success"
                        variant="contained"
                        onClick={async () => {
                          await refreshCode();
                        }}
                      >
                        Refresh
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={async () => {
                          await remove();
                          router.push("/");
                        }}
                      >
                        Remove
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
