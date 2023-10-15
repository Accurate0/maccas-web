import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import { AccountPointMap } from "../hooks/useApiClient/ApiClient.generated";
import PointCode from "./PointCode";
import { useState } from "react";
import { Typography } from "@mui/joy";
import CoffeeIcon from "@mui/icons-material/Coffee";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

const PointCard = ({ name, totalPoints }: AccountPointMap) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12}>
      <Accordion expanded={open} onChange={(_, expanded) => setOpen(expanded)}>
        <AccordionSummary>
          <Grid container justifyContent="space-between" direction="row">
            <Grid item xs>
              <Typography level="h4" component="div">
                {totalPoints}
              </Typography>
            </Grid>

            <Grid item alignSelf="end">
              {totalPoints >= 2500 && <CoffeeIcon />}
              {totalPoints >= 5000 && <IcecreamIcon />}
              {totalPoints >= 7500 && <LunchDiningIcon />}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <PointCode id={name} open={open} />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default PointCard;
