import React from 'react';
import './App.css';
import { Filters } from './features/tickets/Filters';
import { TicketList} from "./features/tickets/TicketList"
function App() {
  return (
    <div className="App">
      <Filters />
     <TicketList />
    </div>
  );
}

export default App;
