import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import { Container } from './styles';

function checkId(id) {
  
  while(id > 50){
      id -= 50
  }
  return id
}

function checkCpf(cpf) {
  let newCpf = [...cpf]

  for(let i = 0;  i < newCpf.length; i++){
    switch(i+1){
      case 3:
        newCpf.splice(i+1 , 0 , ".")
        break
      case 6:
        newCpf.splice(i+2 , 0 , ".")
        break
      case 9: 
        newCpf.splice(i+3 , 0 , "-")
        break
      default:
        
        break
    }
    


}
  let cpfInfo = newCpf.join("")
  return cpfInfo
}

function EndPage({request}) {
  let cpf = checkCpf(request.reservation.cpf)
  
  console.log(cpf)
  return (
    <>
      <ContainerSucess>
        
        Pedido feito
        <br /> com sucesso!
      </ContainerSucess>
      <ContainerInfo>
        <span>Filme e sessão</span>
        <p>
          {request.title} <br /> {request.date} {request.time}
        </p>
      </ContainerInfo>
      <ContainerInfo>
        <span>Ingressos</span>
        {request.reservation.ids.map( id => {
          id = checkId(id)
          return <p>Assento {id}</p>
        })}
      </ContainerInfo>
      <ContainerInfo>
        <span>Comprador</span>
        <p>
          Nome: {request.reservation.name} <br /> CPF: {cpf}
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
    margin-bottom: 10px;
  }
`;
