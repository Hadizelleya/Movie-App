import { useState } from "react";
import logo from "../public/logo.png";
import banner from "../public/hero.png";
import search from "../public/search.svg";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="w-full flex flex-col gap-15">
          <div>
            <img src={logo} className=" w-20" alt="logo" />
          </div>

          <div className="w-full h-full">
            <img src={banner} alt="banner-image" className="w-full" />
          </div>

          <h1 className=" text-7xl">
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  );
}

export default App;
