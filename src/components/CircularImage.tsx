import { FC } from "react";
import channelAdminIcon from "../assets/images/ic-channelAdmin.png";
import { color } from "../styles/color";

interface CircularImageProps {
  size: string;
  image: string;
  alt?: string;
  isChannelAdmin?: true;
}

const CircularImage: FC<CircularImageProps> = ({
  size,
  image,
  alt,
  isChannelAdmin,
}: CircularImageProps) => {
  if (size !== "36" && isChannelAdmin) {
    console.error("36px 크기의 사진에서만 isChannelAdmin 속성을 제공하세요");
    return null;
  }
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
      {isChannelAdmin && (
        <img
          width="12px"
          src={channelAdminIcon}
          alt="채널장"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
          }}
        />
      )}
    </div>
  );
};

export default CircularImage;
