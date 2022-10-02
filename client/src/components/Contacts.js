import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";

import Logo from "../assets/chat-logo.jpeg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function getSessionUserData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.LOGGED_IN_USER)
      );
      setCurrentUserName(data.username);
    }
    getSessionUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <Logout />
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="username">
                  <div className="icon">{""}</div>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  overflow: hidden;
  background-color: #ffffff;
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    img {
      height: 3rem;
    }
    border-bottom: 1px solid rgba(130, 132, 245, 0.15);
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding: 1rem 0;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #4fcdff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      // border-radius: 0.4rem;
      padding: 0.4rem 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.4s ease-in-out;
      &:hover{
        width: 100%;
        border-radius: 0;
        background-color: rgba(240,235,227,0.6);
        padding: 1rem 2rem;
      }
      .username {
        display: flex;
        align-items: center;
        .icon{
          background-color: #9CB0D7;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        h3 {
          color: black;
          font-weight: 400;
          margin-left: 1rem;
          display: inline-block;
        }
        svg {
          margin-left: 0.5rem;
          font-size: 1rem;
          color: green;
        }
      }
    }
    
    .selected {
      background-color: rgba(228,220,207, 0.8);
    }
  }
  .current-user {
    background-color: #19355e;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      h2 {
        font-weight: 400;
        color: white;
      }
    }
  }
`;
