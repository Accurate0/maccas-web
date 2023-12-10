import useLastRefresh from "../hooks/useLastRefresh";
import DealCard from "../components/DealCard";
import DealSkeleton from "../components/DealSkeleton";
import { Grid } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { NetworkStatus, useQuery } from "@apollo/client";
import { indexQuery } from "../queries/indexQuery";

export interface DealSelectorProps {}

const DealSelector: React.FC<DealSelectorProps> = () => {
  const { data, networkStatus } = useQuery(indexQuery);
  useLastRefresh();

  return (
    <>
      <Grid container spacing={2} paddingTop={2} paddingBottom={4}>
        {networkStatus === NetworkStatus.ready ? (
          data?.deal.deals?.map((offer) => (
            <LayoutGroup>
              <DealCard key={offer.dealUuid} offer={offer} />
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
