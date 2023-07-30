import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (

    <BrowserRouter>

    <main className=''>
      
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
      </Routes>
    </main>

  </BrowserRouter>
);
}

export default App;
