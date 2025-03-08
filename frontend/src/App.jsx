import Home from "./components/Home";
import About from "./components/About";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
// import "./App.css";

import { Routes, Route } from "react-router-dom";

function App() {
  const myWidth = 240;

  return (
    <>
      <Navbar
        drawerWidth={myWidth}
        content={
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/delete/:id" element={<Delete />} />
          </Routes>
        }
      ></Navbar>
    </>
  );
}

export default App;
