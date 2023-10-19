import { Grid, Card, CardContent, Box } from "@mui/material";
import moment from "moment";
import { GetDealsOffer, OfferResponse } from "../hooks/useApiClient/ApiClient.generated";
import useNotification from "../hooks/useNotification";
import LoadableCardMedia from "./LoadableCardMedia";
import { Typography } from "@mui/joy";
import { truncate } from "../utils/truncate";
import { useCallback, useState } from "react";
import DealCode from "./DealCode";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import useApiClient from "../hooks/useApiClient/useApiClient";

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
  const apiClient = useApiClient();
  const [dealsSelected, setDealsSelected] = useState<
    { loading: boolean; response?: OfferResponse; id: string }[]
  >([]);
  const onRemove = useCallback(
    (id: string) => setDealsSelected((old) => old.filter((state) => state.id !== id)),
    []
  );

  const addDealMutation = useMutation({
    mutationKey: [`deal-${offer.shortName}`],
    mutationFn: async () =>
      (await apiClient.add_deal(offer.offerPropositionId, config!.storeId)).result,
  });

  return (
    <Grid item xs={12} key={offer.dealUuid}>
      <motion.div layout>
        <Card
          sx={{
            opacity: !validOffer ? 0.3 : undefined,
          }}
        >
          <CardContent>
            <Grid
              container
              item
              direction="row"
              justifyContent="space-between"
              padding={1}
              onClick={async () => {
                if (!validOffer) {
                  notification({ msg: "This probably won't work", variant: "warning" });
                }

                if (!config?.storeId) {
                  notification({ msg: "Must select a store", variant: "error" });
                  return;
                }
                // use a random id so each is unique, but this isn't the deal id
                if (dealsSelected.length >= offer.count) {
                  notification({ msg: "No more deals remain...", variant: "error" });
                } else {
                  const id = crypto.randomUUID();
                  setDealsSelected((old) => [
                    ...old,
                    {
                      id,
                      loading: true,
                    },
                  ]);

                  const response = await addDealMutation.mutateAsync();
                  setDealsSelected((old) => [
                    ...old.filter((x) => x.id !== id),
                    {
                      id,
                      loading: false,
                      response,
                    },
                  ]);
                }
              }}
            >
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
          </CardContent>
          <Box paddingLeft={2} paddingRight={2}>
            <Grid container direction="column">
              {dealsSelected.map((state) => (
                <Grid item paddingBottom={2}>
                  <DealCode
                    key={state.id}
                    // change to deal fingerprint?
                    // POST deals/<fingerprint> -> get random id
                    id={offer.offerPropositionId}
                    onRemove={() => onRemove(state.id)}
                    loading={state.loading}
                    code={state.response?.randomCode}
                    dealId={state.response?.dealUuid}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default DealCard;
