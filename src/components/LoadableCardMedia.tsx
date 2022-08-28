import { CardMedia, CardMediaProps, Skeleton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { theme } from "../theme";

export interface LoadableCardMediaProps extends Omit<CardMediaProps<"img">, "onLoad"> {}

const LoadableCardMedia: React.FC<LoadableCardMediaProps> = ({ ...props }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loaded, setLoaded] = useState(false);
  const size = isMobile ? 180 : 276;

  return (
    <>
      <CardMedia
        component="img"
        style={{ height: loaded ? undefined : 0 }}
        height={size}
        width={size}
        onLoad={() => {
          setLoaded(true);
        }}
        {...props}
      />
      {!loaded && <Skeleton variant="rectangular" height={size} />}
    </>
  );
};

export default LoadableCardMedia;
