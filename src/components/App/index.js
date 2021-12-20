import FilmsPage from "../FilmsPage";
import Navbar from "../Navbar";
import FilmSession from "../FilmSession";
import BuySession from "../BuySession";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EndPage from "../EndPage/EndPage";
import { useState } from "react";

function App() {
  const [request, setRequest] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FilmsPage />}></Route>
      </Routes>
      <Routes>
        <Route path="/session/:idFilm" element={<FilmSession />}></Route>
        <Route
          path="/seats/:idSession"
          element={<BuySession request={request} setRequest={setRequest} />}
        ></Route>
        <Route path="/sucesso" element={<EndPage request={request} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
