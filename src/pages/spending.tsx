import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import DealCard from "../components/DealCard";
import useUserSpending from "../hooks/useUserSpending";

const Spending = () => {
  const { amount, deals } = useUserSpending();

  return (
    <>
      <Head>
        <title>Maccas | Spending</title>
      </Head>
      <Grid
        container
        spacing={2}
        paddingTop={8}
        paddingBottom={4}
        direction="column"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Your total spending
              </Typography>
              <Typography variant="body2">${amount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {deals?.map((o) => (
          <DealCard
            key={o.dealUuid}
            hideCount
            disableButtons
            forceMobile
            ignoreValidity
            offer={o}
            onDetails={() => {}}
          />
        ))}
      </Grid>
    </>
  );
};

export default Spending;
