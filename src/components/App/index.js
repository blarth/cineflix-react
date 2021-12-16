import FilmsPage from "../FilmsPage";
import Navbar from "../Navbar";
import FilmSession from "../FilmSession";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
			<Routes>
				<Route path="/" element={<FilmsPage />}></Route>
				<Route path="/session/:idFilm" element={<FilmSession />}></Route>
        
			</Routes>
		</BrowserRouter>
  );
}

export default App;