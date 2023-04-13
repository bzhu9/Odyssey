import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export const Chat = (props) => {
  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    setMessages([...messages, {
      message: msgInput,
      sentTime: "now",
      sender: "Joe",
      direction: 'outgoing'
    }]);
    setMsgInput("");
  }

  return (
  // <div style={{ position: "relative", height: "500px" }}>
  <div style={{height: "80vh", width: "80vw"}}>
    <MainContainer>
      <ChatContainer>
        <MessageList>
          {/* <Message
            model={{
              message: "Hello my friend",
              sentTime: "just now",
              sender: "Joe",
            }}
          >
            <Message.Header sender="Emily" sentTime="just now" />
          </Message> */}
          {messages.map((m, i) => <Message key={i} model={m} />)}
        </MessageList>

        <MessageInput placeholder="Type message here" onChange={(e) => setMsgInput(e)} onSend={() => sendMessage()}/>

      </ChatContainer>
    </MainContainer>
  </div>
  )
}