import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import RegionDetail from "./pages/RegionDetail";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>  
          <Route index element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/region/:id" element={<RegionDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
