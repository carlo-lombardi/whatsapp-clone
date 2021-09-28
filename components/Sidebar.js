import styled from "styled-components";
import { GrChat } from "react-icons/Gr";
import { GiBalaclava } from "react-icons/Gi";
import { FiMoreVertical } from "react-icons/Fi";

function Sidebar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <GrChat />
          <FiMoreVertical />
        </IconsContainer>
      </Header>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;

const Header = styled.div``;

const UserAvatar = styled(GiBalaclava)``;

const IconsContainer = styled.div``;
