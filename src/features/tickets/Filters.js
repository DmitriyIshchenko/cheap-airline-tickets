import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setStopsFilter, filterTickets } from './ticketsSlice';

import "../../styles/Filters.css"


export function SortContols() {

    const dispatch = useDispatch();

    const targetFied = useSelector(state => state.tickets.sortedBy)

    const handleChange = (e) => {
        dispatch(setSortBy(e.target.value));
        dispatch(filterTickets())
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

export function FiltersContorls() {

    const dispatch = useDispatch();

    const [isAllSelected, toggleSelectAll] = useState(false);
    const [filters, setFilters] = useState({
        "0": true,
        "1": true,
        "2": true,
        "3": true
    })

    const handleChangeAll = () => {
        if (!isAllSelected) {
            const allTrueObj = {};
            for (let key in filters) {
                allTrueObj[key] = true;
            }
            setFilters(allTrueObj);
            toggleSelectAll(true);
        }
    }
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.value]: !filters[e.target.value] });
    }

    useEffect(() => {
        dispatch(setStopsFilter(Object.keys(filters).filter(key => filters[key]).map(key => +key)));
        dispatch(filterTickets())
        if (Object.values(filters).every(value => value)) {
            toggleSelectAll(true);
        } else toggleSelectAll(false);
    }, [filters, dispatch])

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
    </div>;
}

