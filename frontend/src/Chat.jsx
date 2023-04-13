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
  Avatar,

} from "@chatscope/chat-ui-kit-react";

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

  return (
  // <div style={{ position: "relative", height: "500px" }}>
  // <div style={{height: "80vh", width: "80vw"}}>
  <div style={{height: "100%", width: "100%"}}>
    <MainContainer>
      <Sidebar position="left" scrollable={false}>
       <ConversationList>                                                     
          <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
            <Avatar  name="Lilly" status="available" />
          </Conversation>
          
          <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
            <Avatar name="Joe" status="dnd" />
          </Conversation>
          
          <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
            <Avatar name="Emily" status="available" />
          </Conversation>
          
          <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
            <Avatar name="Kai" status="unavailable" />
          </Conversation>
                      
          <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
            <Avatar name="Akane" status="eager" />
          </Conversation>
                              
          <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
            <Avatar name="Eliot" status="away" />
          </Conversation>
                                              
          <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
            <Avatar name="Zoe" status="dnd" />
          </Conversation>
          
          <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
            <Avatar name="Patrik" status="invisible" />
          </Conversation>
                                                                    
        </ConversationList>
      </Sidebar>

      <ChatContainer>
        <MessageList>
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
          </Message>)}
        </MessageList>

        <MessageInput placeholder="Type message here" onChange={(e) => setMsgInput(e)} onSend={() => sendMessage()}/>

      </ChatContainer>

    </MainContainer>
  </div>
  )
}