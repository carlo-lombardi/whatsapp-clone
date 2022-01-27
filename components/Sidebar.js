import styled from "styled-components";
import { GrChat } from "react-icons/Gr";
import { GiBalaclava } from "react-icons/Gi";
import { FiMoreVertical } from "react-icons/Fi";
import { BsSearch } from "react-icons/Bs";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase.config";
import Chat from "./Chat";
import { Avatar } from "@material-ui/core";
function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", usser.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt(
      "Enter an emaasdasdsadil address for dsadasdsad user you want to chatsadasd witasadsadasdsdsadasdasdh"
    );
    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    const boo =
      !!chatsSnapshot?.docs.find((chat) =>
        chat.data().users.some((user) => user === recipientEmail)
      )?.length > 0;
    console.log("que me dassssssssssssss", boo);
  };
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <GrChat />
          <FiMoreVertical />
        </IconsContainer>
      </Header>
      <Search>
        <BsSearch />
        <SearchInput placeholder="Search..." />
      </Search>
      <SidebarButton onClick={createChat}>New Chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SidebarButton = styled.button`
  cursor: pointer;
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
  :hover {
    opacity: 0.8;
  }
`;
