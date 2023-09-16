import { useMemo } from "react";
import xIcon from "../assets/icons/ic-deleteImage.svg";

const ImagePreview = ({ attachment, onDelete }: any) => {
  return useMemo(
    () => (
      <div
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundImage:
              typeof attachment === typeof "string"
                ? `url(${attachment})`
                : `url(${URL.createObjectURL(attachment)})`,
            width: "64px",
            height: "64px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        ></div>
        <button
          onClick={onDelete}
          style={{
            position: "absolute",
            top: "1px",
            right: "1px",
            background: "transparent",
            padding: "0",
            border: "none",
            cursor: "pointer",
            width: "16px",
            height: "16px",
          }}
        >
          <img src={xIcon} alt="x" width="16px" height="16px"></img>
        </button>
      </div>
    ),
    [attachment, onDelete]
  );
};

export default ImagePreview;
