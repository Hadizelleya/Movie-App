import { useState } from "react";
import logo from "../public/logo.png";
import banner from "../public/hero.png";
import search from "../public/search.svg";
import "./App.css";

function App() {
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

        <div className=" bg-dark-100 w-full flex flex-row px-4 gap-10 mt-15 rounded-xl">
          <img src={search} alt="search" />
          <input
            type="text"
            className="w-full p-4 text-white  placeholder:bg-dark-100 text-xl outline-none border-none"
            placeholder="Search through 300+ movies online"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
