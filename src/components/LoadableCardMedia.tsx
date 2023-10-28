import { CardMedia, CardMediaProps } from "@mui/material";

export interface LoadableCardMediaProps extends Omit<CardMediaProps<"img">, "onLoad"> {}

const LoadableCardMedia: React.FC<LoadableCardMediaProps> = ({ ...props }) => {
  const size = 90;

  return (
    <>
      <CardMedia component="img" height={size} width={size} {...props} />
    </>
  );
};

export default LoadableCardMedia;
