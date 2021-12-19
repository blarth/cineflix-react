import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
/* import "./style.css" */
import axios from 'axios';
import styled from 'styled-components';
import Loading from "../../assets/Loading"

// import { Container } from './styles';

function BuySession() {

    const [seats, setSeats] = useState([]);
    const {idSession} = useParams()

	useEffect(() => {
		const reqGet = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`);

		reqGet.then(response => {
			setSeats(response.data);
		});
	}, []);
    if(!seats) {
		return <Loading />;
	}
  
    
    console.log(seats)



  return <div>Hello World</div>;
}

export default BuySession;