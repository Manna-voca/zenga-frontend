import styled from "@emotion/styled";
import { color } from "../../styles/color";

export function RankProfileImage({ rank, image }: { rank: number; image: string }) {
  return (
    <ImageBg rank={rank}>
      <img src={image} alt='이미지' />
    </ImageBg>
  );
}

const ImageBg = styled.div<{ rank: number }>`
  position: relative;
  background: ${({ rank }) =>
    rank === 1
      ? `linear-gradient(135deg, rgba(255, 220, 37, 1), rgba(255, 252, 236, 1), rgba(255, 235, 182, 1), rgba(255, 190, 21, 1))`
      : rank === 2
      ? "linear-gradient(135deg, rgba(232, 232, 232, 1), rgba(255, 255, 255, 1), rgba(233, 233, 233, 1), rgba(192, 192, 192, 1))"
      : rank === 3
      ? "linear-gradient(135deg, rgba(220, 188, 166, 1), rgba(255, 255, 255, 1), rgba(248, 217, 194, 1), rgba(248, 217, 194, 1))"
      : color.outline};
  width: 36px;
  height: 36px;
  border-radius: 50%;

  img {
    position: absolute;
    top: ${({ rank }) => (rank > 3 ? "0.5px" : "2px")};
    left: ${({ rank }) => (rank > 3 ? "0.5px" : "2px")};
    width: ${({ rank }) => (rank > 3 ? "35px" : "32px")};
    height: ${({ rank }) => (rank > 3 ? "35px" : "32px")};

    background-color: white;
    border-radius: 50%;
  }
`;