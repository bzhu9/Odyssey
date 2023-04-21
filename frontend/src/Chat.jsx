import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import api from "./apis"
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Conversation,
  ConversationList,
  Avatar as Ava,
  ConversationHeader,
  AvatarGroup

} from "@chatscope/chat-ui-kit-react";
import Avatar from "react-avatar";
import { FaPlus } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { GrGroup } from "react-icons/gr"
import { GiExitDoor } from "react-icons/gi"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";

export const Chat = (props) => {
  const location = useLocation();
  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [currentIsGroup, setCurrentIsGroup] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [show, setShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [addableUsers, setAddableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();

  const handleClose = async () => {setShow(false); setSelectedOptions([]);};
  const handleShow = async () => setShow(true);

  const handleAddClose = async () => {setShowAdd(false); setSelectedUsers([]);};
  const handleAddShow = async () => setShowAdd(true);

  const handleLeaveClose = async () => {setShowLeave(false)};
  const handleLeaveShow = async () => setShowLeave(true);

  const handleAlertClose = async () => {setShowAlert(false)};
  const handleAlertShow = async () => setShowAlert(true);

  async function getFriends() {
    if (!sessionStorage.getItem("user")) {
      return;
    }
    const payload = { email: sessionStorage.getItem("user")}
    const rawFriendList = await api.getFriends(payload);
    let processedFriendList = []
    console.log(rawFriendList);
    for (let i = 0; i < rawFriendList.data.length; i++) {
      let f = rawFriendList.data[i];
      processedFriendList.push({
        name: f.name,
        status: f.status,
        privacy: f.privacy,
        email: f.email,
        value: f.email,
        label: f.name
      });
    }
    console.log(processedFriendList);
    setFriendList(processedFriendList);
  }


  async function sendMessage() {
    console.log(location.state); // this is to get chat id
    // chat ID: currentChat
    // setMessages([...messages, {
    //   message: msgInput,
    //   sentTime: "nowasdfadfa",
    //   sender: "Joe",
    //   direction: 'incoming'
    // }]);
    console.log(currentChat);
    console.log(msgInput);
    if (!sessionStorage.getItem("user") || !currentChat) {
      return;
    }
    await api.sendMessage({
      sender: sessionStorage.getItem("user"),
      chatId: currentChat,
      text: msgInput
    })
    getMessages(currentChat, headerName);
    setMsgInput("");
  }

  async function getMessages(id, name) {
    console.log(id);
    console.log(name);
    setCurrentChat(id);
    setHeaderName(name);
    setCurrentIsGroup(name.includes(","));
    getAddableUsers(id);
    const rawMessages = (await api.loadMessages({ chatId: id})).data.messages;
    console.log(rawMessages);
    let proccessedMessages = [];
    for (let i = 0; i < rawMessages.length; i++) {
      var d = new Date(rawMessages[i].createdAt);
      proccessedMessages.push({
        message: rawMessages[i].text,
        sentTime: d.toLocaleString(),
        sender: rawMessages[i].sender.name,
        direction: rawMessages[i].sender.email === sessionStorage.getItem("user") ? "outgoing" : "incoming"
      });
    }
    console.log(proccessedMessages);
    setMessages(proccessedMessages);
    return;
  }

  async function getChats() {
    const user = sessionStorage.getItem("user");
    if (user) {
      const chats = (await api.getChats({ email: user})).data.chats;
      let conversationList = [];

      for (let i = 0; i < chats.length; i++) {
        let convoName = chats[i].users.map(o => o.name).join(", ");
        // for (let j = 0; j < chats[i].users.length; j++) {
        //   convoName += chats[i].users[j].name;
        // }
        conversationList.push({
          name: convoName,
          key: chats[i]._id,
          users: chats[i].users,
          isGroup: chats[i].isGroup,
          // last message sent
        })
      }
      setConversations(conversationList);
    }
  }

  async function startConversation() {
    // First check if the conversation exists
    if (!sessionStorage.getItem("user")) {
      handleClose();
      return;
    }
    const selected = selectedOptions.map(o => o.email);
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].users.length === selected.length) {
        let j = 0;
        for (j = 0; j < conversations[i].users.length; j++) {
          if (!selected.includes(conversations[i].users[j].email)) {
            break;
          }
        }
        if (j === selected.length) {
          // Match
          getMessages(conversations[i].key, conversations[i].users.map(o => o.name).join(", "));
          handleClose();
          return;
        }
      }
    }
    // Create new chat
    selected.push(sessionStorage.getItem("user"));
    const res = await api.createChat({users: selected, isGroup: selected.length !== 2});
    const newId = res.data.chatId;
    getMessages(newId, selectedOptions.map(o => o.name).join(", "));
    handleClose();
  }

  async function getAddableUsers(id) {
    const currentChatUsers = (await api.getChatUsers({ chatId: id })).data.users.map(u => u.email);
    let addable = [];
    for (let i  = 0; i < friendList.length; i++) {
      let f = friendList[i];
      if (!currentChatUsers.includes(f.email)) {
        addable.push({
          name: f.name,
          status: f.status,
          privacy: f.privacy,
          email: f.email,
          value: f.email,
          label: f.name
        });
      }
    }
    setAddableUsers(addable);
  }

  async function addUsers() {
    if (currentChat.length === 0) {
      return;
    }

    for (let i = 0; i < selectedUsers.length; i++) {
      await api.addUserToChat({ userEmail: selectedUsers[i].email, chatId: currentChat });
    }
    const newUsers = selectedUsers.map(o => o.name).join(", ");

    getMessages(currentChat, headerName + ", " + newUsers);
    getChats();
    handleAddClose();
  }

  async function leaveGroup() {
    if (!sessionStorage.getItem("user") || currentChat.length === 0) {
      return;
    }

    const res = await api.leaveGroup({ user: sessionStorage.getItem("user"), chatId: currentChat })
    .catch(err => {
      if (err.response) {
          handleLeaveClose();
          handleAlertShow();
      }
      return;
    });
    // getMessages(currentChat, headerName + ", " + newUsers);
    setHeaderName("");
    setCurrentChat("");
    setCurrentIsGroup(false);
    setAddableUsers([]);
    getChats();
    handleLeaveClose();
  }
  useEffect(() => {
    if (location.state) {
      getMessages(location.state.id, location.state.name);
      window.history.replaceState({}, document.title);
    }
  }, []);
  useEffect (() => {
    // let ignore = false;
    // if (!ignore) {
    //   getFriends();
    //   getFriendRequests();
    //   getRecs();
    // }
    // return () => {ignore = true;}
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;
    getChats();
    getFriends();
    const events = new EventSource('http://localhost:3500/updates');
    events.onmessage = event => {
      if (currentChat.length !== 0 && headerName !== 0) {
        getMessages(currentChat, headerName);
      }
      getChats();
    };
    return () => {
      events.close();
    };
  }, [currentChat, headerName]);

  return (
  // <div style={{ position: "relative", height: "500px" }}>
  // <div style={{height: "80vh", width: "80vw"}}>
  <>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
  
  {/* CREATE CONVERSATION ------------------------------------------------------ */}
  <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal">
    <Modal.Header>
      <Modal.Title>Start a conversation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Select 
      defaultValue={[]}
      value={selectedOptions}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      onChange={(options) => setSelectedOptions(options)}
      options={friendList}
      /> 
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      {/* <Button variant="secondary" onClick={startConversation}> */}
        Close
      </Button>
      <Button variant="primary" onClick={() => startConversation()}>
        Create Conversation
      </Button>
    </Modal.Footer>
  </Modal>

  {/* ADDABLE USERS TO CONVERSATION---------------------------------------------- */}
  <Modal show={showAdd} onHide={handleAddClose} centered backdrop="static" className="modal">
    <Modal.Header>
      <Modal.Title>Add Users</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Select 
      defaultValue={[]}
      value={selectedUsers}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      onChange={(options) => setSelectedUsers(options)}
      options={addableUsers}
      /> 
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleAddClose}>
      {/* <Button variant="secondary" onClick={startConversation}> */}
        Close
      </Button>
      <Button variant="primary" onClick={() => addUsers()}>
        Add Users
      </Button>
    </Modal.Footer>
  </Modal>

  {/* LEAVE GROUP---------------------------------------------- */}
  <Modal show={showLeave} onHide={handleLeaveClose} centered className="modal">
    <Modal.Header>
      <Modal.Title>Leave Group</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to leave?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleLeaveClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={() => leaveGroup()}>
        Leave
      </Button>
    </Modal.Footer>
  </Modal>

  {/* ALERT LEAVE GROUP---------------------------------------------- */}
  <Modal show={showAlert} onHide={handleAlertClose} centered className="modal">
    <Modal.Header>
      <Modal.Title>Error Leaving Group</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>You can't leave a group with three people!</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleAlertClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>

  <div style={{width: "100%", position: "relative", height: "100vh"}} id="poop">
    <MainContainer >
      <Sidebar position="left" scrollable={false}>
      <ConversationHeader>
        <ConversationHeader.Back onClick={() => navigate("../cal")}/>
        <ConversationHeader.Content>
          <span onClick={handleShow} className="span"> New Conversation <FaPlus className="plus"/></span>
        </ConversationHeader.Content>
      </ConversationHeader>
       <ConversationList>                                                     
          { conversations.map(c => 
          // Add group icon
          <Conversation name={c.name} key={c.key} onClick={() => getMessages(c.key, c.name)} active={c.key === currentChat}>
            { c.isGroup ?
              <Ava><GrGroup size="40px"/></Ava>
            :
              <Ava><Avatar name={c.users[0].name} maxInitials={2} size="40px"round/></Ava>
            }
          </Conversation>
          )}                                        
        </ConversationList>
      </Sidebar>

      { headerName !== "" ?
      <ChatContainer>
      <ConversationHeader>
        {/* <Ava status="available"><Avatar name={headerName} size="40"round/></Ava> */}
        { currentIsGroup ?
          <Ava><GrGroup size="40px"/></Ava>
          :
          <Ava><Avatar name={headerName} maxInitials={2} size="40px"round/></Ava>
        }
        {/* <ConversationHeader.Content userName={headerName} info="Active 10 mins ago" />                                    */}
        <ConversationHeader.Content userName={headerName} />      
        {currentIsGroup ? 
        <ConversationHeader.Actions>
          <GiExitDoor size={30} onClick={handleLeaveShow} className="leave-group-button" title="Leave Group"/>
          &nbsp;&nbsp;
          <AiOutlineUsergroupAdd size={30} onClick={handleAddShow} className="add-user-button" title="Add User"/>
        </ConversationHeader.Actions>
        :
         
         <ConversationHeader.Actions />}                             
        </ConversationHeader>
        <MessageList>
          {messages.map((m, i) => 
          <Message key={i} model={m}>
            { m.direction === "incoming" ?
            <Message.Header sender={m.sender} sentTime={m.sentTime}>{m.sender}, {m.sentTime}</Message.Header> :
            <Message.Header sender={m.sender} sentTime={m.sentTime}>{m.sentTime}</Message.Header>
            }
            <Ava><Avatar name={m.sender} size="40"round/></Ava>
          </Message>)}
        </MessageList>

        <MessageInput placeholder="Type message here" onChange={(e) => setMsgInput(e)} onSend={() => sendMessage()}/>
        </ChatContainer>
      :
      <ChatContainer></ChatContainer>
      }

    </MainContainer>
  </div>

  </>

  )
}