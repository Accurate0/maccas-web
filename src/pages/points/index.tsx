import PointCard from "../../components/PointCard";
import usePoints from "../../hooks/usePoints";
import { Grid } from "@mui/material";

export interface PointsProps {}

const Points: React.FC<PointsProps> = () => {
  const { data: points } = usePoints();

  return (
    <Grid paddingTop={2} paddingBottom={4} spacing={2} container>
      {points
        ?.filter((p) => p.totalPoints >= 2500)
        .map((p) => (
          <PointCard key={p.name} {...p} />
        ))}
    </Grid>
  );
};

export default Points;
