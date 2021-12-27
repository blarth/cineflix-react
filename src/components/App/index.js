import FilmsPage from "../FilmsPage";
import Navbar from "../Navbar";
import FilmSession from "../FilmSession";
import BuySession from "../BuySession";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EndPage from "../EndPage";
import { useState } from "react";

function App() {
  const [request, setRequest] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<FilmsPage />}></Route>
        <Route path="/session/:idFilm" exact element={<FilmSession />}></Route>
        <Route
          path="/seats/:idSession" exact
          element={<BuySession request={request} setRequest={setRequest} />}
        ></Route>
        <Route path="/sucesso" exact element={<EndPage request={request} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
