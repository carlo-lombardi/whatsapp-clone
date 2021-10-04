import styled from "styled-components";
import { GrChat } from "react-icons/Gr";
import { GiBalaclava } from "react-icons/Gi";
import { FiMoreVertical } from "react-icons/Fi";
import { BsSearch } from "react-icons/Bs";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  authentication,
  chatsDataBase,
  usersDataBase,
} from "../firebase.config";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// const chatsSnapshot = await getDocs((userChatRef))
function Sidebar() {
  const [newData, setNewData] = useState();
  const [user] = useAuthState(authentication);
  const createChat = () => {
    const input = prompt(
      "Enter an email address for the user you want to chat with"
    );
    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      setDoc(
        doc(chatsDataBase),
        {
          users: [user.email, input],
        },
        { merge: true }
      );
    }
  };
  // const userChatRef = query(chatsDataBase, where("users", "==", user.email));
  useEffect(() => {
    fetchTheDoc();
  }, []);

  async function fetchTheDoc() {
    const querySnapshot = await getDocs(chatsDataBase);
    querySnapshot.forEach((doc) => {
      setNewData(doc.data());
    });
  }

  const chatAlreadyExists = (recipientEmail) => {
    const boolAns =
      newData?.users.find((user) => user === recipientEmail)?.length > 0;
    return boolAns;
  };
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => authentication.signOut()} />
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

const UserAvatar = styled(GiBalaclava)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Container = styled.div``;

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
