import "./App.css";
import Logs from "./pages/Logs";
import Metrics from "./pages/Metrics";
import "./main.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar";
import { useState } from "react";

function App() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [datePicker, setDatePicker] = useState([new Date(), new Date()]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <Routes>
          <Route
            path="/metrics"
            element={
              <Metrics
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                datePicker={datePicker}
                setDatePicker={setDatePicker}
              />
            }
          />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
