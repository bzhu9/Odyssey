import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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

export const Chat = (props) => {
  const location = useLocation();
  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    console.log(location.state); // this is to get chat id
    setMessages([...messages, {
      message: msgInput,
      sentTime: "now",
      sender: "Joe",
      // direction: 'outgoing'
    }]);
    setMsgInput("");
  }

  useEffect (() => {
    // let ignore = false;
    // if (!ignore) {
    //   getFriends();
    //   getFriendRequests();
    //   getRecs();
    // }
    // return () => {ignore = true;}
    console.log("hello");
  }, []);

  return (
  // <div style={{ position: "relative", height: "500px" }}>
  // <div style={{height: "80vh", width: "80vw"}}>
  <div style={{width: "100%", position: "relative", height: "100vh"}} id="poop">
    <MainContainer >
      <Sidebar position="left" scrollable={false}>
       <ConversationList>                                                     
          <Conversation name="Lilly" active>
            <Ava><Avatar name="Lilly" size="40"round/></Ava>
            {/* <Avatar  name="Lilly" status="available" /> */}
          </Conversation>
          
          <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
            <Ava name="Joe" status="dnd" />
          </Conversation>
          
          <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
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
                                              
          <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
            <Ava name="Zoe" status="dnd" />
          </Conversation>
          
          <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
            <Ava name="Patrik" status="invisible" />
          </Conversation>
                                                                    
        </ConversationList>
      </Sidebar>

      <ChatContainer>
      <ConversationHeader>
        {/* <Ava src={<Avatar name = "Emaily" />} name="Emily" /> */}
        {/* <Ava name = "emily"> <Avatar name="John Green" size="25" round/> </Ava> */}
        <Ava><Avatar name="John Green" size="40"round/></Ava>
        <ConversationHeader.Content userName="John Green" info="Active 10 mins ago" />                                   
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
          <Message key={i} model={m} avatarSpacer>
            <Message.Header sender={m.sender} sentTime={m.sentTime} /> {/* not displaying if direction is outgoing */}
          </Message>)}
        </MessageList>

        <MessageInput placeholder="Type message here" onChange={(e) => setMsgInput(e)} onSend={() => sendMessage()}/>

      </ChatContainer>

    </MainContainer>
  </div>
  )
}