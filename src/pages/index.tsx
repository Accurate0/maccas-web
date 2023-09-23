import { Grid } from "@mui/material";
import { useState } from "react";
import useDeals from "../hooks/useDeals";
import useLastRefresh from "../hooks/useLastRefresh";
import DealDialog from "../components/DealDialog";
import DealCard from "../components/DealCard";
import DealSkeleton from "../components/DealSkeleton";
import { GetDealsOffer } from "../hooks/useApiClient/ApiClient.generated";

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
      <Grid container spacing={2} paddingTop={8} paddingBottom={4}>
        {deals ? (
          deals?.map((offer) => (
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
              .map((i) => (
                <DealSkeleton key={i} />
              ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default DealSelector;
