import { useState } from "react";
import { useDispatch } from "react-redux"
import { toggleFilter } from "./filtersSlice"
export function Filters() {
    const dispatch = useDispatch();
    const [checkedState, setCheckedState] = useState([true,true,false,false]);
    const stops = ["Без пересадок", "1 пересадка", "2 пересадки", "3 пересадки"];
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        dispatch(toggleFilter(position))
    }
    return (
        <div id="filters-container">
            <ul>
                {stops.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className="filters-item">
                                <input
                                    type="checkbox"
                                    name={"filter-" + index}
                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index)}
                                />
                                <label for={"filter-" + index}>{item}</label>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}