import { Stack, Skeleton as MuiSkeleton, Grid } from "@mui/material";

const DealSkeleton: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        <MuiSkeleton variant="rectangular" height={138} />
      </Stack>
    </Grid>
  );
};

export default DealSkeleton;
