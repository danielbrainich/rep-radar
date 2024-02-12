import './main.css';
import GetRepByAddressForm from './components/RepInfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetRepByAddressForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
