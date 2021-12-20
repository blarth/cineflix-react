
import React from 'react';
import styled from "styled-components";


function Navbar() {
  return (
      <>
      <Header>
          <p>CINEFLEX</p>
      </Header>
      </>
  );
}

export default Navbar;

const Header = styled.div`

    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    background: #C3CFD9;
    top: 0;
    left: 0;

    p{
    font-family: Roboto;
    font-size: 34px;
    font-weight: 400;
    text-align: center;
    color: #E8833A;

`;