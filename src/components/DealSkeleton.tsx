import { Stack, Skeleton as MuiSkeleton, Grid, useMediaQuery } from "@mui/material";
import { theme } from "../theme";

const DealSkeleton: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const size = isMobile ? 180 : 276;

  return (
    <Grid item xs={6} md={3}>
      <Stack spacing={1}>
        <MuiSkeleton variant="rectangular" height={size} />
        <MuiSkeleton variant="rectangular" height={210} />
        <MuiSkeleton variant="rectangular" height={58} />
      </Stack>
    </Grid>
  );
};

export default DealSkeleton;
