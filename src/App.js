import React from 'react';
import './App.css';
import TicketsList from './features/tickets/TicketsList';
import SortContols from './features/tickets/SortControls';
import FiltersControls from './features/tickets/FiltersControls';

function App() {
  return (
    <div className="App">
      <FiltersControls />
      <div>
        <SortContols />
        <TicketsList />
      </div>
    </div>
  );
}

export default App;
