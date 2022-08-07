import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.module.css";
import Home from "./components/Home.page";
import RQSuperHeroes from "./components/RQSuperHeroes.page";
import SuperHeroes from "./components/SuperHeroes.page";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  );
}

export default App;
