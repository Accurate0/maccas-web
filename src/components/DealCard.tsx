import { Grid, useMediaQuery } from "@mui/material";
import moment from "moment";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";
import useNotification from "../hooks/useNotification";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { theme } from "../theme";
import LoadableCardMedia from "./LoadableCardMedia";
import { useNavigate } from "react-router";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { truncate } from "../utils/truncate";

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
  tall,
}) => {
  const navigate = useNavigate();
  const breakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = forceMobile ?? breakpoint;
  const validOffer = isOfferValid(offer);
  const notification = useNotification();
  const userConfig = useGetUserConfig();

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

  return isMobile ? (
    <Grid item xs={12} md={3} key={offer.dealUuid}>
      <Card
        style={{
          opacity: ignoreValidity ? undefined : !validOffer ? 0.3 : undefined,
          cursor: disableButtons ? undefined : "pointer",
        }}
        onClick={disableButtons ? undefined : onDealSelect}
      >
        <CardContent
          style={{
            height: tall ? "140px" : "80px",
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
        </CardContent>
      </Card>
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
