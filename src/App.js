import React from 'react';
import './App.css';
import TicketsList from './features/tickets/TicketsList';
import { SortContols, FiltersContorls } from './features/tickets/Filters';

function App() {
  return (
    <div className="App">
      <FiltersContorls />
      <div>
        <SortContols />
        <TicketsList />
      </div>
    </div>
  );
}

export default App;
