import Head from "next/head";
import {
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import useAllUserSpending from "../../hooks/useAllUserSpending";
import { AdminUserSpending } from "../../hooks/useApiClient/ApiClient.generated";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DealCard from "../../components/DealCard";

const Admin = () => {
  const { spendingDetails } = useAllUserSpending();

  return (
    <div style={{ paddingTop: "3vh" }}>
      <Head>
        <title>Maccas | Admin - Spending</title>
      </Head>
      <Grid
        paddingTop={8}
        paddingBottom={2}
        spacing={2}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper>
            {Object.values(spendingDetails ?? {})
              .sort((s1: AdminUserSpending, s2: AdminUserSpending) => s2.total - s1.total)
              .map((o: AdminUserSpending) => (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ width: "50%", flexShrink: 0 }}>{o.name}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>${o.total}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} direction="column">
                      {o.items?.map((o) => (
                        <DealCard
                          hideCount
                          disableButtons
                          forceMobile
                          ignoreValidity
                          tall
                          offer={o}
                          onDetails={() => {}}
                        />
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
