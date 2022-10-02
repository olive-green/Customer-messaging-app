import React, { useState, useEffect } from "react";
import WelcomeImg from '../assets/welcome.png'
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getSessionUserName() {
      setUserName(
        await JSON.parse(localStorage.getItem(process.env.LOGGED_IN_USER))
          .username
      );
    }
    getSessionUserName();
  }, []);

  return (
    <Container>
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <img src={WelcomeImg} alt="img" className="img" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0.1px rgba(194, 194, 194, 1);
  .img{
    border-radius: 50%;
    margin: 1rem 0;
  }
  img {
    height: 20rem;
  }
  h1 {
    text-align: center;
    font-weight: 500;
    font-size: 48px; 
  }
  h3 {
    font-weight: 400;
  }
  span {
    color: rgba(25,53,94, 0.9);
  }
`;
