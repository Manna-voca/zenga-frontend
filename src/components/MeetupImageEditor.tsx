import styled from "@emotion/styled";
import { color } from "../styles/color";
import cameraIcon from "../assets/icons/ic-camera.svg";
import ImagePreview from "./ImagePreview";

interface OwnProps {
  attachment: File | string | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: () => void;
}

const MeetupImageEditor = ({
  attachment,
  handleImageUpload,
  handleImageDelete,
}: OwnProps) => {
  return (
    <>
      <Label>사진</Label>
      <div
        style={{
          position: "relative",
          display: "flex",
        }}
      >
        <CameraStyle>
          <label htmlFor="ex_file">
            <div
              style={{
                height: "64px",
                width: "64px",
                boxSizing: "border-box",
                borderRadius: "5px",
                border: `1px solid ${color.outline}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "39px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <img src={cameraIcon} alt="" width="24px" />
                <div
                  style={{
                    color: `${color.onSurfaceMuted}`,
                    fontSize: "12px",
                    lineHeight: "160%",
                    fontWeight: "400",
                    textAlign: "center",
                    height: "13px",
                  }}
                >
                  {attachment ? 1 : 0}/1
                </div>
              </div>
            </div>
          </label>
          <input
            type="file"
            id="ex_file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            maxLength={5}
          />
        </CameraStyle>
        {attachment && (
          <ImagePreview attachment={attachment} onDelete={handleImageDelete} />
        )}
      </div>
    </>
  );
};

export default MeetupImageEditor;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: ${color.onSurfaceDefault};
  margin-bottom: 4px;
  position: relative;
`;

const CameraStyle = styled.div`
  display: inline-block;
  margin-right: 10px;
  img {
    max-width: 100px;
  }
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
