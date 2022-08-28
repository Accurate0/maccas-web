import { CardMedia, CardMediaProps, Skeleton } from "@mui/material";
import { useState } from "react";

export interface LoadableCardMediaProps extends Omit<CardMediaProps<"img">, "onLoad"> {}

const LoadableCardMedia: React.FC<LoadableCardMediaProps> = ({ ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CardMedia
        component="img"
        style={{ height: loaded ? undefined : 0 }}
        onLoad={() => {
          setLoaded(true);
        }}
        {...props}
      />
      {!loaded && <Skeleton variant="rectangular" height={276} />}
    </>
  );
};

export default LoadableCardMedia;
