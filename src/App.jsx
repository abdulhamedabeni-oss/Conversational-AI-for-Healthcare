import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Departments from "./pages/Departments.jsx";
import Contact from "./pages/Contact.jsx";
import Chat from "./pages/Chat.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;