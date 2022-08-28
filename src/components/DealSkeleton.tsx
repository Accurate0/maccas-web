import { Stack, Skeleton as MuiSkeleton, Grid } from "@mui/material";

const DealSkeleton: React.FC = () => (
  <Grid item xs={6} md={3}>
    <Stack spacing={1}>
      <MuiSkeleton variant="rectangular" height={276} />
      <MuiSkeleton variant="rectangular" height={210} />
      <MuiSkeleton variant="rectangular" height={58} />
    </Stack>
  </Grid>
);

export default DealSkeleton;
