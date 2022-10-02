import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import QueriesInput from "./QueriesInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BsCircleFill } from "react-icons/bs";
import { sendMessageRoute, receiveMessageRoute } from "../utils/APIRoutes";

export default function QueriesContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  //get all chat msgs from db
  useEffect(() => {
    async function fetchMessages() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.LOGGED_IN_USER)
      );
      const response = await axios.post(receiveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem(process.env.LOGGED_IN_USER))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.LOGGED_IN_USER)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    //save msg in db
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  //on arrival of new msg
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  //append new msgs in 'messages' state
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <div className="icon">{""}</div>
            <h2>{currentChat.username}</h2>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sent" : "received"}`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <QueriesInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  box-shadow: 0px 0px 1px 0.1px rgba(194, 194, 194, 1);
  .chat-header {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(130, 132, 245, 0.15);
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .username {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .icon{
          background-color: #9CB0D7;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        h2 {
          font-weight: 600;
          color: black;
          display: inline-block;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #19355e;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 2rem;
        font-weight: 400;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #DFD3C3;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #ffffff;
      }
    }
  }
`;
