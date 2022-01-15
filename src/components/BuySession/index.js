import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import FooterBuyerSection from "../FooterBuyerSection";

function BuySession({ request, setRequest }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const { idSession } = useParams();
  const [nameBuyer, setnameBuyer] = useState("");
  const [cpfBuyer, setCpfBuyer] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const reqGet = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`
    );

    reqGet.then((response) => {
      setSelectedSeats(
        response.data.seats.map((seat) => ({ ...seat, isSelected: false }))
      );
      setSeats(response.data.seats);
      setRequest(
       { title : response.data.movie.title,
        time : response.data.name,
        day : response.data.day.weekday,
        date : response.data.day.date}
      );
    });
  }, []);
  if (seats.length === 0) {
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
          <SeatsSub color={"#8DD7CF"} />
          <p>Selecionado</p>
        </div>
        <div className="Subtitles">
          <SeatsSub color={"#C3CFD9"} />
          <p>Disponível</p>
        </div>
        <div className="Subtitles">
          <SeatsSub color={"#FBE192"} />
          <p>Indisponível</p>
        </div>
      </ContainerSub>
      <PInfo>Nome do comprador:</PInfo>
      <Input
        placeholder="Digite seu nome..."
        value={nameBuyer}
        onChange={(e) => setnameBuyer(e.target.value)}
      />
      <PInfo>CPF do comprador:</PInfo>
      <Input
        placeholder="Digite seu CPF..."
        value={cpfBuyer}
        onChange={(e) => setCpfBuyer(e.target.value)}
      />
      <ContainerButton>
        <Button
          onClick={(e) => {
            SendInformation(
              selectedSeats,
              nameBuyer,
              cpfBuyer,
              navigate,
              request,
              setRequest
            );
          }}
        >
          Reservar assento(s)
        </Button>
      </ContainerButton>
      <FooterBuyerSection idSession={idSession}></FooterBuyerSection>
    </>
  );
}

export default BuySession;

function SeatsInfo({
  idSeat,
  nameSeat,
  isSelected,
  isAvailableSeat,
  setSelectedSeats,
  selectedSeats,
}) {
  return (
    <Seats
      idSeat={idSeat}
      isAvailableSeat={isAvailableSeat}
      isSelected={isSelected}
      onClick={(e) => {
        changeColor(idSeat, setSelectedSeats, selectedSeats);
      }}
    >
      {nameSeat}
    </Seats>
  );
}

function changeColor(id, setSelectedSeats, selectedSeats) {
  const newArray = selectedSeats.map((seat) => {
    if (id === seat.id && seat.isAvailable) {
      seat.isSelected = !seat.isSelected;
    } else if (id === seat.id && !seat.isAvailable) {
      alert("Esse assento não está disponível");
    }
    return seat;
  });

  setSelectedSeats(newArray);
}

function SendInformation(
  array,
  nameBuyer,
  cpfBuyer,
  navigate,
  request,
  setRequest
) {
  const fetchArray = [];
  array.forEach((seat) => {
    if (seat.isSelected) {
      fetchArray.push(seat.id);
    }
  });

  if (isNaN(cpfBuyer) || cpfBuyer.length !== 11) {
    return alert("Coloque um CPF valido.");
  }

  const objectReservation = {
    ids: fetchArray,
    name: nameBuyer,
    cpf: cpfBuyer,
  };

  const reqPost = axios.post(
    `https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`,
    objectReservation
  );
  console.log(request)
  reqPost.then((response) => {
    setRequest({...request, reservation : objectReservation});
    navigate("/sucesso");
  });
  reqPost.catch((response) => {
    console.log(response);
  });
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
  width: 95%;
  height: 24%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
`;

const Seats = styled.div`
  background-color: ${(props) =>
    props.isSelected
      ? "#8DD7CF"
      : props.isAvailableSeat
      ? "#C3CFD9"
      : "#FBE192"};
  border: 1px solid #808f9d;
  border-radius: 35px;
  height: 26px;
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
  margin-top: 19px;
  font-family: Roboto;
  font-size: 11px;
`;

const ContainerSub = styled.div`
  display: flex;
  width: 100%;
  height: 12%;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 42px;
  p {
    color: #4e5a65;
  }
`;

const ContainerButton = styled.div`
  display: flex;
  width: 100%;
  height: 12%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background: #e8833a;
  width: 65%;
  height: 45px;
  border-radius: 3px;
  color: #ffffff;
  margin-top: 50px;
  font-family: Roboto;
  font-size: 18px;
  border: none;
`;

const SeatsSub = styled.div`
  background-color: ${(props) => props.color};
  border: 1px solid #808f9d;
  border-radius: 35px;
  height: 26px;
  width: 26px;
  margin-left: 25px;
`;

const Input = styled.input`
  width: 85%;
  height: 35px;
  margin-left: 24px;

  border: 1px solid #d4d4d4;
  background-color: #ffffff;

  ::placeholder {
    color: #afafaf;
    font-family: Roboto;
    font-size: 18px;
    font-style: italic;
    text-align: left;
  }
  p {
    color: #afafaf;
    font-family: Roboto;
    font-size: 18px;
    font-style: italic;
    text-align: left;
  }
`;

const PInfo = styled.p`
  font-family: Roboto;
  font-size: 18px;
  text-align: left;
  color: #293845;
  margin-top: 10px;
  margin-left: 24px;
`;
