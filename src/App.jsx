import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom"

import Frontpage from "./components/Frontpage";
import Login from "./components/Login";
import Register from "./components/Register";
import TutorialCreation from "./components/Tutorial_Creation";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Frontpage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/create" element={<TutorialCreation/>}/>  
            </Routes> 
          </BrowserRouter>
        </header>
      </div>
    </>
  );
}

export default App;
