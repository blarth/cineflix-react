import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import Loading from "../Loading";
import axios from "axios";

export default function FilmsPage() {
  const [films, setFilms] = useState([]);


   
  useEffect(() => {
    const requisitionGET = axios.get(
      "https://mock-api.driven.com.br/api/v4/cineflex/movies"
    );

    requisitionGET.then((response) => {
      setFilms(response.data);
    });
  }, []);
 
  if (films.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <p className="p-films">Selecione o seu filme</p>
      <div className="wrapper">
        <div className="films-to-choose">
          {films.map((film, i) => {
            return <Film key={i} image={film.posterURL} id={film.id} />;
          })}
        </div>
      </div>
    </>
  );
}

function Film({ image, id }) {
  return (
    <>
      <Link to={`session/${id}`}>
        <div className="film-outsider">
          <img src={image} alt="Film" />
        </div>
      </Link>
    </>
  );
}
