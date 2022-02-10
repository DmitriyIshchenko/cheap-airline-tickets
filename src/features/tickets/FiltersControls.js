import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStopsFilter } from './ticketsSlice';

import "../../styles/Filters.css"

export default function FiltersControls() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.tickets.stopsFilter);

  const isAllSelected = Object.values(filters).every(item => item);

  const handleChange = e => {
    dispatch(setStopsFilter({ ...filters, [e.target.value]: !filters[e.target.value] }))
  }

  const handleChangeAll = () => {
    if (!isAllSelected) {
      const allTrue = {};
      for (let key in filters) {
        allTrue[key] = true;
      }
      dispatch(setStopsFilter(allTrue))
    }
  }

  const checkboxes = Object.entries(filters).map(([name, value]) => {
    return (<li key={name}>
      <label htmlFor={name} className='checkbox-container'>
        {+name === 0 ? "Без пересадок" : +name > 1 ? `${name} пересадки` : "1 пересадка"}
        <input
          type="checkbox"
          name="stops"
          id={name}
          value={name}
          checked={value}
          onChange={handleChange} />
        <span className="checkmark"></span>
      </label>
    </li>)
  });

  return <div className='stops-container'>
    <p className='stops-container-title'>Количество пересадок</p>
    <ul>
      <li key="all">
        <label htmlFor="all" className='checkbox-container'>
          Все
          <input
            type="checkbox"
            name="stops"
            id="all"
            value="all"
            checked={isAllSelected} onChange={handleChangeAll} />
          <span className="checkmark"></span>
        </label>
      </li>
      {checkboxes}
    </ul>
  </div>;;
}