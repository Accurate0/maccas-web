import { Grid } from "@mui/material";
import { useState } from "react";
import useDeals from "../hooks/useDeals";
import useLastRefresh from "../hooks/useLastRefresh";
import { Offer } from "../types";
import DealDialog from "../components/DealDialog";
import DealCard from "../components/DealCard";
import DealSkeleton from "../components/DealSkeleton";

export interface DealSelectorProps {}

const DealSelector: React.FC<DealSelectorProps> = () => {
  const deals = useDeals();
  const [open, setOpen] = useState(false);
  const [dialogFor, setDialogFor] = useState<Offer>();
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
        validFromUTC={dialogFor?.validFromUTC}
        validToUTC={dialogFor?.validToUTC}
        uuid={dialogFor?.dealUuid}
      />
      <Grid container spacing={2} paddingTop={8} paddingBottom={4}>
        {deals ? (
          deals?.map((offer) => (
            <DealCard
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
              .fill()
              .map(() => (
                <DealSkeleton />
              ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default DealSelector;
