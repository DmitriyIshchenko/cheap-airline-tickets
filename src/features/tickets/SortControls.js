import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from './ticketsSlice';

import "../../styles/Filters.css"

export default function SortContols() {

  const dispatch = useDispatch();

  const targetFied = useSelector(state => state.tickets.sortedBy)

  const handleChange = (e) => {
    dispatch(setSortBy(e.target.value));
  }

  return <div className='sort-container'>
    <input
      type="radio"
      name="sort"
      id="byDuration"
      value="duration"
      checked={targetFied === "duration"}
      onChange={handleChange}
      className='radio'
    />
    <label
      htmlFor="byDuration"
      className={`${targetFied === "duration" ? "sort-selected" : ""} sort sort-left`}>САМЫЙ БЫСТРЫЙ</label>
    <input
      type="radio"
      name="sort"
      id="byPrice"
      value="price"
      checked={targetFied === "price"}
      onChange={handleChange}
      className='radio' />
    <label
      htmlFor="byPrice"
      className={`${targetFied === "price" ? "sort-selected" : ""} sort sort-right`}>САМЫЙ ДЕШЕВЫЙ</label>
  </div>;
}