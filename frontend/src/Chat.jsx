import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import api from "./apis"
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  ConversationHeader

} from "@chatscope/chat-ui-kit-react";
import Avatar from "react-avatar";
import { FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";


export const Chat = (props) => {
  const location = useLocation();
  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [headerName, setHeaderName] = useState("");
  const [show, setShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const handleClose = () => {setShow(false); setSelectedOptions([]);};
  const handleShow = () => setShow(true);

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
        value: f.name,
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
    if (!sessionStorage.getItem("user") || !currentChat) {
      return;
    }
    await api.sendMessage({
      sender: sessionStorage.getItem("user"),
      chatId: currentChat,
      text: msgInput
    })
    getMessages(currentChat);
    setMsgInput("");
  }

  async function getMessages(id, name) {
    setCurrentChat(id);
    setHeaderName(name);
    const rawMessages = (await api.loadMessages({ chatId: id})).data.messages;
    let proccessedMessages = [];
    for (let i = 0; i < rawMessages.length; i++) {
      proccessedMessages.push({
        message: rawMessages[i].text,
        sentTime: rawMessages[i].createdAt,
        sender: rawMessages[i].sender.name,
        direction: rawMessages[i].sender.email === sessionStorage.getItem("user") ? "outgoing" : ""
      })
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
        let convoName = "";
        for (let j = 0; j < chats[i].users.length; j++) {
          convoName += chats[i].users[j].name;
        }
        conversationList.push({
          name: convoName,
          key: chats[i]._id,
          // last message sent
        })
      }
      setConversations(conversationList);
      console.log(chats);
    }
  }

  useEffect (() => {
    // let ignore = false;
    // if (!ignore) {
    //   getFriends();
    //   getFriendRequests();
    //   getRecs();
    // }
    // return () => {ignore = true;}
    getChats();
    getFriends();
    const events = new EventSource('http://localhost:3500/updates');
    events.onmessage = event => {
      // const parsedData = JSON.parse(event.data);
      console.log(event)
    };
    
    return () => {
      events.close();
    };
  }, []);

  return (
  // <div style={{ position: "relative", height: "500px" }}>
  // <div style={{height: "80vh", width: "80vw"}}>
  <>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  <div style={{width: "100%", position: "relative", height: "100vh"}} id="poop">
    <MainContainer >
      <Sidebar position="left" scrollable={false}>
      <ConversationHeader>
        <ConversationHeader.Content>
          <span onClick={handleShow} className="span"> New Conversation <FaPlus className="plus"/></span>
        </ConversationHeader.Content>
      </ConversationHeader>
       <ConversationList>                                                     
          <Conversation name="Lilly" onClick={() =>console.log("HELLO")}>
            <Ava><Avatar name="Lilly" size="40"round/></Ava>
            {/* <Avatar  name="Lilly" status="available" /> */}
          </Conversation>
          
          <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
            {/* <Ava name="Joe Bob, Lilly Cat, Emily Smith" status="dnd" /> */}
            <Ava><Avatar name="Joe Bob, Lilly Cat, Emily Smith" maxInitials={3} size="40"round/></Ava>
          </Conversation>
          
          <Conversation name="Emily" info="Yes i can do it for you" unreadCnt={3}>
            <Ava name="Emily" status="available" />
          </Conversation>
          
          <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
            <Ava name="Kai" status="unavailable" />
          </Conversation>
                      
          <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
            <Ava name="Akane" status="eager" />
          </Conversation>
                              
          <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
            <Ava name="Eliot" status="away" />
          </Conversation>
                                              
          <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you">
            <Ava name="Zoe" status="dnd" />
          </Conversation>
          
          <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
            <Ava name="Patrik" status="invisible" />
          </Conversation>

          { conversations.map(c => 
          <Conversation name={c.name} key={c.key} onClick={() => getMessages(c.key, c.name)} active={c.key === currentChat}>
            <Ava><Avatar name={c.name} maxInitials={3} size="40"round/></Ava>
          </Conversation>
          )}                                        
        </ConversationList>
      </Sidebar>

      { headerName !== "" ?
      <ChatContainer>
      <ConversationHeader>
        {/* <Ava src={<Avatar name = "Emaily" />} name="Emily" /> */}
        {/* <Ava name = "emily"> <Avatar name="John Green" size="25" round/> </Ava> */}
        <Ava><Avatar name={headerName} size="40"round/></Ava>
        {/* <ConversationHeader.Content userName={headerName} info="Active 10 mins ago" />                                    */}
        <ConversationHeader.Content userName={headerName} />                                   

      </ConversationHeader>
        <MessageList>
        {/* <Avatar name="John Green" size="150" round/> */}
          {/* <Message
            model={{
              message: "Hello my friend",
              sentTime: "just now",
              sender: "Joe",
              // direction: "outgoing"
            }}
          >
            <Message.Header sender="Emily" sentTime="just now" />
          </Message> */}
          {messages.map((m, i) => 
          <Message key={i} model={m}>
            <Message.Header sender={m.sender} sentTime={m.sentTime} /> {/* not displaying if direction is outgoing */}
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