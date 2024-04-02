import "./App.css";
import Logs from "./pages/Logs";
import Metrics from "./pages/Metrics";
import "./main.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
