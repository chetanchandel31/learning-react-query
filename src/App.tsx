import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.page";
import RQSuperHeroes from "./components/RQSuperHeroes.page";
import SuperHeroes from "./components/SuperHeroes.page";
import "./App.module.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">home</Link>
          <Link to="/super-heroes">super heroes</Link>
          <Link to="/rq-super-heroes">rq super heroes</Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/super-heroes" element={<SuperHeroes />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
