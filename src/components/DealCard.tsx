import { Grid, useMediaQuery, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import moment from "moment";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";
import useNotification from "../hooks/useNotification";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { theme } from "../theme";
import LoadableCardMedia from "./LoadableCardMedia";
import { useNavigate } from "react-router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/joy";
import { truncate } from "../utils/truncate";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useApiClient from "../hooks/useApiClient/useApiClient";
import RefreshIcon from "@mui/icons-material/Refresh";
export interface DealCardProps {
  disableButtons?: boolean;
  forceMobile?: boolean;
  ignoreValidity?: boolean;
  hideCount?: boolean;
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

const DealCard: React.FC<DealCardProps> = ({
  offer,
  onDetails: onSelect,
  forceMobile,
  disableButtons,
  ignoreValidity,
  hideCount,
}) => {
  const navigate = useNavigate();
  const breakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = forceMobile ?? breakpoint;
  const validOffer = isOfferValid(offer);
  const notification = useNotification();
  const userConfig = useGetUserConfig();
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const apiClient = useApiClient();
  const config = useGetUserConfig();
  const addDealMutation = useMutation({
    mutationKey: [`deal-${offer.dealUuid}`],
    mutationFn: async () => {
      if (!userConfig?.storeId) {
        notification({ variant: "error", msg: "A store must be selected." });
        return;
      }

      return (await apiClient.add_deal(offer.dealUuid, config!.storeId)).result;
    },
  });

  const removeDealMutation = useMutation({
    mutationKey: [`remove-deal-${offer.dealUuid}`],
    mutationFn: async () => {
      return await apiClient.remove_deal(offer.dealUuid, config!.storeId);
    },
  });

  const onDealSelect = () => {
    if (!disableButtons) {
      if (!validOffer) {
        notification({
          variant: "warning",
          msg: "This offer is not valid at the moment, it may not work correctly.",
        });
      }

      if (userConfig) {
        navigate(`/code/${offer.dealUuid}`);
      } else {
        notification({ variant: "error", msg: "A store must be selected." });
        navigate("/location");
      }
    }
  };

  const getAddDealResponse = useMemo(() => {
    if (addDealMutation.status === "error") {
      return addDealMutation.error.message;
    }

    if (addDealMutation.status === "pending") {
      return <LinearProgress />;
    }

    if (addDealMutation.status === "success") {
      return (
        <Box sx={{ fontFamily: "Monospace", fontSize: "h4.fontSize" }}>
          {addDealMutation.data?.randomCode}
        </Box>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDealMutation.status]);

  return isMobile ? (
    <Grid item xs={12} md={3} key={offer.dealUuid}>
      <Accordion
        expanded={openAccordion}
        onChange={async (_, expanded) => {
          setOpenAccordion(expanded);
          if (expanded) {
            await addDealMutation.mutateAsync();
          } else {
            await removeDealMutation.mutateAsync();
          }
        }}
      >
        <AccordionSummary
          sx={{
            opacity: ignoreValidity ? undefined : !validOffer ? 0.3 : undefined,
          }}
        >
          <Grid container item direction="row" justifyContent="space-between">
            <Grid item xs={8} container direction="column">
              <Grid item xs>
                <Typography level="h4" component="div">
                  {truncate(offer.shortName, 20)}
                </Typography>
              </Grid>
              {!hideCount && (
                <Grid item>
                  <Typography level="body-md">{offer.count} available</Typography>
                </Grid>
              )}
              {!disableButtons && (
                <Grid item xs={3}>
                  <Typography
                    level="body-md"
                    style={{ width: 20 }}
                    onClick={(e) => {
                      if (!disableButtons) {
                        e.stopPropagation();
                        onSelect();
                      }
                    }}
                  >
                    <b>Details</b>
                  </Typography>
                </Grid>
              )}
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
          <Alert
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                color="neutral"
                disabled={addDealMutation.status === "pending"}
                onClick={() =>
                  notification({ variant: "error", msg: "This doesn't do anything yet" })
                }
              >
                <RefreshIcon />
              </IconButton>
            }
          >
            {getAddDealResponse}
          </Alert>
        </AccordionDetails>
      </Accordion>
    </Grid>
  ) : (
    <Grid container item xs={6} md={3} key={offer.dealUuid}>
      <Card style={{ opacity: !validOffer ? 0.3 : undefined }}>
        <LoadableCardMedia image={offer.imageUrl} alt="missing image" />
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <Typography level="h4" component="div">
                {truncate(offer.shortName, 32)}
              </Typography>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography level="body-md">{offer.count} available</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" item spacing={1}>
                <Grid item>
                  <Typography level="body-xs">
                    Added: {new Date(offer.creationDateUtc).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item alignItems="baseline">
                  <Typography level="body-lg">{validOffer ? "✅" : "❌"}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button color="primary" onClick={onDealSelect} disabled={disableButtons}>
                Select
              </Button>
            </Grid>
            <Grid item>
              <Button color="neutral" onClick={() => onSelect()} disabled={disableButtons}>
                Details
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DealCard;
