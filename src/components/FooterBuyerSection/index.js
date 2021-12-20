import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../../assets/Loading";

// import { Container } from './styles';

function FooterBuyerSection({idSession}) {
    const [infoFilmAll, setInfoFilmAll] = useState([]);
  
    useEffect(() => {
      const reqGet = axios.get(
        `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`
      );
  
      reqGet.then((response) => {
        setInfoFilmAll(response.data);
        
      });
    }, []);
  
    if (!infoFilmAll) {
      return <div />;
    }
    
    return (
      <Container>
        <Image src={infoFilmAll.movie.posterURL} alt="aqui é a imagem do filme"></Image>
        <Paragraph>{infoFilmAll.movie.title}</Paragraph>
        <Paragraph>{infoFilmAll.day.weekday} - {infoFilmAll.day.date}</Paragraph>
        
      </Container>
    );
}

export default FooterBuyerSection;


  
  const Container = styled.div`
    width: 100%;
    min-height: 10%;
    background-color: #dfe6ed;
    border: 1px solid #9eadba;
    display: flex;
  `;
  
  const Image = styled.img`
    max-width: 16%;
    max-height: 61%;
  `;
  
  const Paragraph = styled.p`
    font-family: Roboto;
    font-size: 26px;
    color: #293845;
  `;
  