import styled from "styled-components";
import { GrChat } from "react-icons/Gr";
function Sidebar() {
  return (
    <Container>
      <Header>
        <GrChat />
        <IconsContainer></IconsContainer>
      </Header>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;

const Header = styled.div``;

const IconsContainer = styled.div``;
