import { FC } from "react";
import channelAdminIcon from "../assets/icons/ic-channelAdmin.svg";

interface CircularImageProps {
  size: string;
  image: string;
  alt?: string;
  isChannelAdmin?: true;
  loadingLazy?: boolean;
}

const CircularImage: FC<CircularImageProps> = ({
  size,
  image,
  alt,
  isChannelAdmin,
  loadingLazy,
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
          borderRadius: "500px",
          display: "block",
        }}
      ></img>
      {isChannelAdmin && (
        <img
          src={channelAdminIcon}
          alt="채널장"
          style={{
            cursor: "pointer",
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
