import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { IMAGE_BUCKET_BASE } from "../../config/images";
import useOfferCode from "../../hooks/useOfferCode";
import useDeal from "../../hooks/useDeal";
import Head from "next/head";
import ErrorPage from "next/error";
import LoadableCardMedia from "../../components/LoadableCardMedia";

export interface DealSelectionProps {}

const DealSelection: React.FC<DealSelectionProps> = () => {
  const router = useRouter();
  const dealId = router.query["dealId"] as string | undefined;
  const { deal, error } = useDeal(dealId);
  const { code, remove, refreshCode } = useOfferCode(deal);

  return (
    <>
      {error && <ErrorPage statusCode={404} />}
      {code && deal && (
        <>
          <Head>
            <title>Maccas | {deal.shortName}</title>
          </Head>
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
                  <LoadableCardMedia
                    image={`${IMAGE_BUCKET_BASE}/${deal?.imageBaseName}`}
                    alt="missing image"
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
                            router.push("/");
                          }}
                        >
                          I don't want to use this
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default DealSelection;
