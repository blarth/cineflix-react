import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import { Container } from './styles';

function EndPage({request}) {
  
  console.log({request})
  return (
    <>
      <ContainerSucess>
        
        Pedido feito
        <br /> com sucesso!
      </ContainerSucess>
      <ContainerInfo>
        <span>Filme e sessão</span>
        <p>
          Sabado <br /> 24/06/2021 15:00
        </p>
      </ContainerInfo>
      <ContainerInfo>
        <span>Ingressos</span>
        <p>Assento X</p>
      </ContainerInfo>
      <ContainerInfo>
        <span>Comprador</span>
        <p>
          Nome: João da Silva Sauro <br /> CPF: 123.456.789-10
        </p>
      </ContainerInfo>
      <Link to="/">
        <Button>Voltar pra Home</Button>
      </Link>
    </>
  );
}

export default EndPage;

const Button = styled.button`
  background: #e8833a;
  width: 65%;
  height: 45px;
  border-radius: 3px;
  color: #ffffff;
  margin-top: 50px;
  font-family: Roboto;
  font-size: 18px;
  margin-left: 70px;
`;

const ContainerSucess = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  color: #247a6b;
`;

const ContainerInfo = styled.div`
  width: 100%;
  height: 22%;
  margin-left: 28px;
  margin-top: 50px;

  p {
    font-family: Roboto;
    font-size: 22px;
    color: #293845;
    font-weight: 400;
  }

  span {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: #293845;
  }
`;
