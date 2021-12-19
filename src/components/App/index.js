import FilmsPage from "../FilmsPage";
import Navbar from "../Navbar";
import FilmSession from "../FilmSession";
import BuySession from "../BuySession"
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
		<Routes>
			<Route path="/" element={<FilmsPage />}></Route>
			<Route path="/session/:idFilm" element={<FilmSession />}></Route>
			<Route path="/seats/:idSession" element={<BuySession />}></Route>
        
		</Routes>
	</BrowserRouter>
  );
}

export default App;
