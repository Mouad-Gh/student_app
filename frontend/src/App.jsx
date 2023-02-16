import './App.css';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Home from "./pages/Home";
import AddStudent from './pages/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<AddStudent />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;