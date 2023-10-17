import { Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import moment from "moment";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";
import useNotification from "../hooks/useNotification";
import LoadableCardMedia from "./LoadableCardMedia";
import { Typography } from "@mui/joy";
import { truncate } from "../utils/truncate";
import { useState } from "react";
import DealCode from "./DealCode";
import { useGetUserConfig } from "../hooks/useUserConfig";

export interface DealCardProps {
  offer: GetDealsOffer;
  onDetails: () => void;
  tall?: boolean;
}

const isOfferValid = (deal: GetDealsOffer) => {
  const from = moment.utc(deal.validFromUtc).add(2, "hours");
  const to = moment.utc(deal.validToUtc).add(2, "hours");
  const now = new Date();

  return moment.utc(now).isBetween(from, to);
};

const DealCard: React.FC<DealCardProps> = ({ offer, onDetails: onSelect }) => {
  const validOffer = isOfferValid(offer);
  const config = useGetUserConfig();
  const notification = useNotification();
  const [dealsSelected, setDealsSelected] = useState<string[]>([]);

  return (
    <Grid item xs={12} key={offer.dealUuid}>
      <Accordion
        expanded={dealsSelected.length > 0}
        onChange={async () => {
          if (!config?.storeId) {
            notification({ msg: "Must select a store", variant: "error" });
            return;
          }
          // use a random id so each is unique, but this isn't the deal id
          if (dealsSelected.length >= offer.count) {
            notification({ msg: "No more deals remain...", variant: "warning" });
          } else {
            setDealsSelected((old) => [...old, crypto.randomUUID()]);
          }
        }}
      >
        <AccordionSummary
          sx={{
            opacity: !validOffer ? 0.3 : undefined,
          }}
        >
          <Grid container item direction="row" justifyContent="space-between" padding={1}>
            <Grid item xs={8} container direction="column">
              <Grid item xs>
                <Typography level="h4" component="div">
                  {truncate(offer.shortName, 20)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography level="body-sm">{offer.count} available</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  level="body-xs"
                  textColor="black"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                >
                  <b>Details</b>
                </Typography>
              </Grid>
            </Grid>
            <Grid item style={{ flexBasis: "auto" }}>
              <LoadableCardMedia
                image={offer.imageUrl}
                alt="missing image"
                style={{ height: 90, width: 90, display: "flex" }}
              />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} direction="column">
            {dealsSelected.map((id) => (
              <DealCode
                key={id}
                // change to deal fingerprint?
                // POST deals/<fingerprint> -> get random id
                id={offer.offerPropositionId}
                onRemove={() => setDealsSelected((old) => old.filter((x) => x !== id))}
              />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default DealCard;
