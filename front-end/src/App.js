import './main.css';
import Nav from './components/Nav';
import GetRepByAddressForm from './components/RepInfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/search" element={<GetRepByAddressForm />} />
        <Route path="/hello" element={<div>Hello</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
