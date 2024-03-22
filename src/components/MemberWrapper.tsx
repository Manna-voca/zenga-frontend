/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import CircularImage from "./CircularImage";
import { color } from "../styles/color";
import { useNavigate, useParams } from "react-router-dom";

interface OwnProps {
  name: string;
  id: number;
  image: string;
}

const MemberWrapper = ({ name, image, id }: OwnProps) => {
  const navigate = useNavigate();
  const { channelCode } = useParams();

  const handleWrapperClick = () => {
    if (`${id}` === localStorage.getItem("memberId")) {
      navigate(`/${channelCode}/mypage`);
    } else {
      navigate(`/${channelCode}/memberpage/${id}`);
    }
  };

  return (
    <Container onClick={handleWrapperClick}>
      <CircularImage image={image} size='36' />
      <MemberName>{name}</MemberName>
    </Container>
  );
};

export default MemberWrapper;

const Container = styled.div`
  display: flex;
  width: calc(100% - 40px);
  box-sizing: border-box;
  padding: 12px 0;
  margin: 0 20px;
  gap: 24px;
  align-items: center;
  border-bottom: 0.5px solid ${color.outline};
  cursor: pointer;
`;

const MemberName = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: ${color.onSurfaceActive};
`;
