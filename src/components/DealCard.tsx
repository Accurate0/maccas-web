import {
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Button,
  CardActions,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { IMAGE_BUCKET_BASE } from "../config/images";
import { TIME_OFFSET } from "../config/time";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";
import useNotification from "../hooks/useNotification";
import { useGetUserConfig } from "../hooks/useUserConfig";
import { theme } from "../theme";
import LoadableCardMedia from "./LoadableCardMedia";

export interface DealCardProps {
  offer: GetDealsOffer;
  onDetails: () => void;
}

const truncate = (s: string, length: number) =>
  s.length > length ? `${s.substring(0, length - 3)}...` : s;

const isOfferValid = (deal: GetDealsOffer) => {
  const from = moment.utc(deal.validFromUtc).add(TIME_OFFSET, "hours");
  const to = moment.utc(deal.validToUtc).add(TIME_OFFSET, "hours");
  const now = new Date();

  return moment.utc(now).isBetween(from, to);
};

const DealCard: React.FC<DealCardProps> = ({ offer, onDetails: onSelect }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const validOffer = isOfferValid(offer);
  const notification = useNotification();
  const userConfig = useGetUserConfig();

  const onDealSelect = () => {
    if (!validOffer) {
      notification({
        variant: "warning",
        msg: "This offer is not valid at the moment, it may not work correctly.",
      });
    }

    if (userConfig) {
      router.push(`/code/${offer.dealUuid}`);
    } else {
      notification({ variant: "error", msg: "A store must be selected." });
      router.push("/location");
    }
  };

  return isMobile ? (
    <Grid item xs={12} md={3} key={offer.dealUuid}>
      <Card
        style={{ opacity: !validOffer ? 0.3 : undefined, cursor: "pointer" }}
        onClick={onDealSelect}
      >
        <CardContent
          style={{ height: isMobile ? "80px" : "170px", padding: "25px 25px 25px 25px" }}
        >
          <Grid container item direction="row" justifyContent="space-between">
            <Grid item xs={8} container direction="column">
              <Grid item xs>
                <Typography variant={isMobile ? "h6" : "h5"} component="div">
                  {truncate(offer.shortName, isMobile ? 20 : 32)}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2">{offer.count} available</Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="body2"
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
                image={`${IMAGE_BUCKET_BASE}/${offer.imageBaseName}`}
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
        <LoadableCardMedia
          image={`${IMAGE_BUCKET_BASE}/${offer.imageBaseName}`}
          alt="missing image"
        />
        <CardContent
          style={{ height: isMobile ? "200px" : "170px", padding: "25px 25px 25px 25px" }}
        >
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
              <Button color="secondary" size={isMobile ? "small" : "large"} onClick={onDealSelect}>
                Select
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                size={isMobile ? "small" : "large"}
                onClick={() => onSelect()}
              >
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
