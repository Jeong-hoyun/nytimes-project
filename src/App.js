import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Index from './news/index';
import Clip from './clip/clip';
import Api from './api/api';
import Stores from './store/store';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clip/" element={<Clip />} />
      <Route path="/api/" element={<Api />} />  
      <Route path="/store/" element={<Stores />} />
      <Route path="/*" element={<Index />} />   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
