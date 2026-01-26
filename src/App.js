import { Route, Routes } from 'react-router-dom';
import './index.css'
import './styles/index.scss'
import Frontend from './components/Frontend';
import Navbar from './components/Navbar';
import Main from './components/Main';

function App() {
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>} />
         <Route path="/frontend" element={<Frontend/>} />
      </Routes>
    </div>
  );
}

export default App;



