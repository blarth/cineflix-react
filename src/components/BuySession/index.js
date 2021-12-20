import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
/* import "./style.css" */
import axios from "axios";
import styled from "styled-components";
import Loading from "../../assets/Loading";

// import { Container } from './styles';

function BuySession() {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [seats, setSeats] = useState([]);
  const { idSession } = useParams();
  const [nameBuyer, setnameBuyer] = useState("");
  const [cpfBuyer, setCpfBuyer] = useState("");

  useEffect(() => {
    const reqGet = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`
    );

    reqGet.then((response) => {
      setSelectedSeats(response.data.seats.map(seat => ({...seat, isSelected:false})))
      setSeats(response.data.seats);
    });
  }, []);
  if (!seats) {
    return <Loading />;
  }
  
  

  return (
    <>
      <InfoBuySession>Selecione o(s) assento(s)</InfoBuySession>
      <ContainerSeats>
        {selectedSeats.map((seat, i) => (
          <SeatsInfo
            key={i}
            idSeat={seat.id}
            nameSeat={seat.name}
            isAvailableSeat={seat.isAvailable} 
            isSelected={seat.isSelected}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
            
          />
        ))}
      </ContainerSeats>
      <ContainerSub>
        <div className="Subtitles">
          <SeatsSub />
          <p>Selecionado</p>
        </div>
        <div className="Subtitles">
          <SeatsSub />
          <p>Disponível</p>
        </div>
        <div className="Subtitles">
          <SeatsSub />
          <p>Indisponível</p>
        </div>
      </ContainerSub>
      <p>Nome do comprador:</p>
      <input
        placeholder="Digite seu nome"
        value={nameBuyer}
        onChange={(e) => setnameBuyer(e.target.value)}
      />
      <p>CPF do comprador:</p>
      <input
        placeholder="Digite seu CPF..."
        value={cpfBuyer}
        onChange={(e) => setCpfBuyer(e.target.value)}
      />
      <ContainerButton>
        <Button>Reservar assento(s)</Button>
      </ContainerButton>
    </>
  );
}




export default BuySession;



function  SeatsInfo({idSeat, nameSeat, isSelected,  isAvailableSeat, setSelectedSeats, selectedSeats}) {
  return <Seats idSeat={idSeat} isAvailableSeat={isAvailableSeat} isSelected={isSelected} onClick={(e) => {
    changeColor(idSeat, setSelectedSeats, selectedSeats)
    
  }} >{nameSeat}</Seats>
}


function changeColor(id, setSelectedSeats, selectedSeats) {
  const newArray = selectedSeats.map( seat => {
    if(id === seat.id && seat.isAvailable){
      seat.isSelected = !seat.isSelected
    }
    else if(id === seat.id && !seat.isAvailable){
      alert("Esse assento não está disponível")
    }
    return seat

  })

  setSelectedSeats(newArray)
  
  
}


const InfoBuySession = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: #293845;
  margin-top: 100px;
`;

const ContainerSeats = styled.div`
  display: flex;
  width: 100%;
  height: 24%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Seats = styled.div`
  background-color: ${props => props.isSelected ? "#8DD7CF" : props.isAvailableSeat ? "#C3CFD9" : "#FBE192"};
  border: 1px solid #808f9d;
  border-radius: 12px;
  height: 26px;
  width: 26px;
`;

const ContainerSub = styled.div`
  display: flex;
  width: 100%;
  height: 12%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ContainerButton = styled.div`
  display: flex;
  width: 100%;
  height: 12%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`

background: #E8833A;
width: 65%;
height: 35px;
border-radius: 3px;
`;


const SeatsSub = styled.div`
  background-color:#C3CFD9;
  border: 1px solid #808f9d;
  border-radius: 12px;
  height: 26px;
  width: 26px;
`;



