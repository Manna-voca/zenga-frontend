import { FC } from "react";

interface CircularImageProps {
  size: string;
  image: string;
  alt?: string;
}

const CircularImage: FC<CircularImageProps> = ({
  size,
  image,
  alt,
}: CircularImageProps) => {
  return (
    <img
      width={size}
      height={size}
      src={image}
      alt={alt}
      style={{ borderRadius: "500px", cursor: "pointer" }}
      loading="lazy"
    />
  );
};

export default CircularImage;
