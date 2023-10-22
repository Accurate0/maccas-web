import { useState } from "react";
import useDeals from "../hooks/useDeals";
import useLastRefresh from "../hooks/useLastRefresh";
import DealDialog from "../components/DealDialog";
import DealCard from "../components/DealCard";
import DealSkeleton from "../components/DealSkeleton";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";
import { Grid } from "@mui/material";
import { LayoutGroup } from "framer-motion";

export interface DealSelectorProps {}

const DealSelector: React.FC<DealSelectorProps> = () => {
  const deals = useDeals();
  const [open, setOpen] = useState(false);
  const [dialogFor, setDialogFor] = useState<GetDealsOffer>();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useLastRefresh();

  return (
    <>
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

      <Grid container spacing={2} paddingTop={2} paddingBottom={4}>
        {deals.status === "success" ? (
          deals.data?.map((offer) => (
            <LayoutGroup>
              <DealCard
                key={offer.dealUuid}
                offer={offer}
                onDetails={() => {
                  setDialogFor(offer);
                  handleClickOpen();
                }}
              />
            </LayoutGroup>
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
