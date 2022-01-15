import React from "react";
import styled from "styled-components";
import loading from "./tenor.gif";

// import { Container } from './styles';

function Loading() {
  return (
    <>
      <Imagem src={loading} alt="loading" />
    </>
  )
}

export default Loading;

const Imagem = styled.img`
    max-width: 50%;
    max-height: 50%;
    position: absolute;
    top: 20%;
    left: 25%;

`;
