import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import "./style.css"
import loading from "./tenor.gif"
import axios from "axios";


export default function  FilmsPage() {
    const [films, setFilms] = useState([])
    
    useEffect(() => {
		const requisitionGET = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");

		requisitionGET.then(response => {
            
			setFilms(response.data);
		});
	}, []);
    if(!films) {
		return <img className="loadingGif"src={loading} alt="loading"/>;
	}
    
    
    
    return(
        <>
        <p className="p-films">Selecione o seu filme</p>
        <div className="wrapper">
            <div className="films-to-choose">
            {films.map( (film) => {
                return(

                    <Film
                    key={film.id}
                    image={film.posterURL}
                    
                    />
                    
                )
            })}
            </div>
        </div>
        </>
    )
    
}

function Film({image, key}) {
    return(
    <>
    <Link to={`https://mock-api.driven.com.br/api/v4/cineflex/movies/${key}/showtimes`}>
        <img src={image} alt="Film" />
    </Link>
    </>
    )
    
}