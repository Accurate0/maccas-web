import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { IMAGE_BUCKET_BASE } from "../config/images";
import { theme } from "../theme";
import { Offer } from "../types";

export interface DealCardProps {
  offer: Offer;
  onDetails: () => void;
}

const truncate = (s: string, length: number) =>
  s.length > length ? `${s.substring(0, length - 3)}...` : s;

const isOfferValid = (deal: Offer) => {
  const from = moment.utc(deal.validFromUTC);
  const to = moment.utc(deal.validToUTC);
  const now = new Date();

  return moment.utc(now).isBetween(from, to);
};

const DealCard: React.FC<DealCardProps> = ({ offer, onDetails: onSelect }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid item xs={6} md={3} key={offer.dealUuid}>
      <Card>
        <CardMedia
          component="img"
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
                {truncate(offer.shortName, 40)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">
                Added: {new Date(offer.CreationDateUtc).toLocaleDateString()}
              </Typography>
              <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
                <Grid container item spacing={4}>
                  <Grid item xs={3} md={1} style={{ color: theme.palette.text.primary }}>
                    {isOfferValid(offer) ? "✅" : "❌"}
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="caption">{offer.count} available</Typography>
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                color="secondary"
                size={isMobile ? "small" : "large"}
                onClick={() => {
                  router.push(`/code/${offer.dealUuid}`);
                }}
              >
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
