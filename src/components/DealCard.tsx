import { Grid, Card, CardContent, Typography, useMediaQuery } from "@mui/material";
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

  return (
    <Grid item xs={12} md={3} key={offer.dealUuid}>
      <Card
        style={{ opacity: !validOffer ? 0.3 : undefined, cursor: "pointer" }}
        onClick={() => {
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
        }}
      >
        <CardContent
          style={{ height: isMobile ? "90px" : "170px", padding: "25px 25px 25px 25px" }}
        >
          <Grid container item direction="row" justifyContent="space-between">
            <Grid item>
              <Grid item>
                <Typography variant={isMobile ? "h6" : "h5"} component="div">
                  {truncate(offer.shortName, isMobile ? 25 : 32)}
                </Typography>
                <Typography variant="body2">{offer.count} available</Typography>
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
  );
};

export default DealCard;
