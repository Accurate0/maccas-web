import { Grid, Typography, useMediaQuery } from "@mui/material";
import moment from "moment";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";
import useNotification from "../hooks/useNotification";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { theme } from "../theme";
import LoadableCardMedia from "./LoadableCardMedia";
import { useNavigate } from "react-router";
import { Button, Card, CardActions, CardContent } from "@mui/joy";

export interface DealCardProps {
  disableButtons?: boolean;
  forceMobile?: boolean;
  ignoreValidity?: boolean;
  hideCount?: boolean;
  offer: GetDealsOffer;
  onDetails: () => void;
  tall?: boolean;
}

const truncate = (s: string, length: number) =>
  s.length > length ? `${s.substring(0, length - 3)}...` : s;

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
            height: tall ? "140px" : isMobile ? "80px" : "170px",
          }}
        >
          <Grid container item direction="row" justifyContent="space-between">
            <Grid item xs={8} container direction="column">
              <Grid item xs>
                <Typography variant={isMobile ? "h6" : "h5"} component="div">
                  {truncate(offer.shortName, isMobile ? 20 : 32)}
                </Typography>
              </Grid>
              {!hideCount && (
                <Grid item xs>
                  <Typography variant="body2">{offer.count} available</Typography>
                </Grid>
              )}
              {!disableButtons && (
                <Grid item xs={3}>
                  <Typography
                    variant="body2"
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
    <Grid item xs={6} md={3} key={offer.dealUuid}>
      <Card style={{ opacity: !validOffer ? 0.3 : undefined }}>
        <LoadableCardMedia image={offer.imageUrl} alt="missing image" />
        <CardContent style={{ height: isMobile ? "200px" : "170px" }}>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={8}>
              <Typography variant={isMobile ? "h6" : "h5"} component="div">
                {truncate(offer.shortName, isMobile ? 20 : 32)}
              </Typography>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">{offer.count} available</Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column" item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="caption">
                    Added: {new Date(offer.creationDateUtc).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} alignItems="baseline">
                  <Typography variant="caption">{validOffer ? "✅" : "❌"}</Typography>
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
