import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
/* import "./style.css" */
import axios from 'axios';
import styled from 'styled-components';
import InfoSession from './InfoSession';


function FilmSession() {
    const [infos, setInfos] = useState([]);
    const {idFilm} = useParams()

	useEffect(() => {
		const requisicao = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilm}/showtimes`);

		requisicao.then(response => {
			setInfos(response.data.days);
		});
	}, []);
  
    

    return (
        
        <>
        <InfoPage>Selecione um Horario</InfoPage>
        {infos.map((info , i) => 

            
        <div key={i}>


            <InfoDay>{info.weekday} - {info.date}</InfoDay>
            {info.showtimes.map( (showtime , j) => 
                <InfoTime key={j}>
                    {showtime.name} 
                </InfoTime>
            )}
        </div>
           
        )}
        </>
  )
}

export default FilmSession;




const InfoPage = styled.div`

    font-family: Roboto;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    color: #293845;
    margin-top: 100px;
`

const InfoDay = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: #293845;
`;


const InfoTime = styled.div`
  width:22%;
  background-color: #E8833A;
    height: 11%;
  
  &p{
      font-family: Roboto;
      font-size: 20px;
      font-weight: 400;
      text-align: left;
      color: #293845;

  }  

`;
