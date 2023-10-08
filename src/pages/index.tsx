import { useMemo, useState } from "react";
import useDeals from "../hooks/useDeals";
import useLastRefresh from "../hooks/useLastRefresh";
import DealDialog from "../components/DealDialog";
import DealCard from "../components/DealCard";
import DealSkeleton from "../components/DealSkeleton";
import { GetDealsOffer, UserRole } from "../hooks/useApiClient/ApiClient.generated";
import { Grid } from "@mui/material";
import LocationModal from "../components/LocationModal";
import { Button } from "@mui/joy";
import useUserConfig from "../hooks/useUserConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown91, faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import useAuthentication from "../hooks/useAuthentication";
import { useNavigate } from "react-router";

export interface DealSelectorProps {}

const DealSelector: React.FC<DealSelectorProps> = () => {
  const deals = useDeals();
  const [open, setOpen] = useState(false);
  const [dialogFor, setDialogFor] = useState<GetDealsOffer>();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const config = useUserConfig();
  const { role } = useAuthentication();
  const showPoints = useMemo(() => role === UserRole.Admin || role === UserRole.Privileged, [role]);

  useLastRefresh();
  const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false);

  return (
    <>
      <LocationModal open={locationModalOpen} setOpen={setLocationModalOpen} />
      <DealDialog
        open={open}
        onClose={handleClose}
        title={dialogFor?.shortName}
        name={dialogFor?.name}
        validFromUTC={dialogFor?.validFromUtc}
        validToUTC={dialogFor?.validToUtc}
        uuid={dialogFor?.dealUuid}
        creationDateUtc={dialogFor?.creationDateUtc}
      />
      <Grid container spacing={2} paddingTop={8}>
        {showPoints && (
          <Grid item xs>
            <Button fullWidth sx={{ color: "white" }} onClick={() => navigate("/points")}>
              <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item>
                  <FontAwesomeIcon icon={faArrowDown91} size="1x" />
                </Grid>
                <Grid item>
                  <b>Points</b>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        )}

        <Grid item xs>
          <Button fullWidth onClick={() => setLocationModalOpen(true)}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <FontAwesomeIcon icon={faStoreAlt} size="1x" />
              </Grid>
              <Grid item>
                <b>
                  {config.data?.storeName ?? (config.status === "success" ? "None" : "Loading...")}
                </b>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} paddingTop={2} paddingBottom={4}>
        {deals.status === "success" ? (
          deals.data?.map((offer) => (
            <DealCard
              key={offer.dealUuid}
              offer={offer}
              onDetails={() => {
                setDialogFor(offer);
                handleClickOpen();
              }}
            />
          ))
        ) : (
          <>
            {Array(30)
              .fill(1)
              .map(() => (
                // key breaks this, idk why, keys are for nerds
                <DealSkeleton />
              ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default DealSelector;
