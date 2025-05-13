// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Clients } from './pages/Clients';
import { Recharge } from './pages/Recharge';
import { Balance } from './pages/Balance';
import { Payment } from './pages/Payment';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/recargas" element={<Recharge />} />
        <Route path="/consultar-saldo" element={<Balance />} />
        <Route path="/pagos" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default App;
