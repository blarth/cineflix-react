import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from '../../assets/Loading';
// import { Container } from './styles';

function FooterSection({idFilm}) {
    const [infoFilm, setInfoFilm] = useState([]);
    console.log(idFilm)

	useEffect(() => {
		const reqGet = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilm}/showtimes`);

		reqGet.then(response => {
			setInfoFilm(response.data);
		});
	}, []);
  
    if(!infoFilm) {
		return <Loading />;
	}
  
  
    return (<Container>
                <Image src={infoFilm.posterURL} alt="aqui é a imagem do filme"></Image>
                <Paragraph>{infoFilm.title}</Paragraph>
            </Container>)
}

export default FooterSection;



const Container = styled.div`
width:100%;
min-height: 10%; 
background-color: #DFE6ED;
border: 1px solid #9EADBA;
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