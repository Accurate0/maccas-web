import PointCard from "../../components/PointCard";
import usePoints from "../../hooks/usePoints";
import { Grid } from "@mui/material";

export interface PointsProps {}

const Points: React.FC<PointsProps> = () => {
  const { data: points } = usePoints();

  return (
    <Grid paddingTop={8} spacing={1} container>
      {points?.map((p) => (
        <PointCard key={p.name} {...p} />
      ))}
    </Grid>
  );
};

export default Points;
