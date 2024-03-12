import { FC } from "react";
import { color } from "../styles/color";

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
    <div
      style={{
        width: `${size}`,
        height: `${size}`,
        position: "relative",
      }}
    >
      <img
        width={size}
        height={size}
        src={image}
        alt={alt}
        style={{
          border:
            size === "36"
              ? `0.367px solid ${color.outline}`
              : size === "24"
              ? `0.243px solid ${color.outline}`
              : size === "98"
              ? `0.983px solid ${color.outline}`
              : "none",
          borderRadius: "500px",
          display: "block",
          objectFit: "cover",
        }}
      ></img>
    </div>
  );
};

export default CircularImage;
