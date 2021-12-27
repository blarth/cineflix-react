import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
/* import "./style.css" */
import axios from "axios";
import styled from "styled-components";

import FooterSection from "../FooterSection";
import Loading from "../../assets/Loading";


function FilmSession() {
  const [infos, setInfos] = useState([]);
  const { idFilm } = useParams();

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilm}/showtimes`
    );

    requisicao.then((response) => {
      setInfos(response.data.days);
    });
  }, []);
  if (!infos) {
    return <Loading />;
  }

  return (
    <>
      <InfoPage>Selecione um Horario</InfoPage>
      {infos.map((info, i) => (
        <div key={i}>
          <InfoDay>
            {info.weekday} - {info.date}
          </InfoDay>
          <Container>
            {info.showtimes.map((showtime, j) => (
              <Link key={j} to={`/seats/${showtime.id}`}>
                <InfoTime key={j}>
                  <p>{showtime.name}</p>
                </InfoTime>
              </Link>
            ))}
          </Container>
        </div>
      ))}
      <FooterSection idFilm={idFilm}></FooterSection>
    </>
  );
}

export default FilmSession;

const InfoPage = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: #293845;
  margin-top: 100px;
  margin-bottom: 40px;
`;

const InfoDay = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: #293845;
  margin-left: 25px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const InfoTime = styled.div`
  width: 100px;
  margin-left: 25px;
  background-color: #e8833a;
  height: 50px;
  display: flex;
  border-radius: 3px;
  justify-content: center;
  align-items: center;

  p {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }
`;
