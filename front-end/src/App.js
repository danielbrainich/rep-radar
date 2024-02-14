import './main.css';
import GetRepByAddressForm from './components/RepInfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-3 text-end">
        Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener noreferrer">@danielbrainich</a>
      </div>
      <Routes>
        <Route path="/" element={<GetRepByAddressForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
