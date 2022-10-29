import { useMemo } from 'react';
import './DuckCustomisation.css';
import duckImages from '../duckImages.json';
import {DuckType} from '../types/DuckType';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectAwake, selectDuckType, setDuckType} from "../redux/settingsSlice";

export default function DuckCustomisation() {
    const dispatch = useAppDispatch();
    const awake = useAppSelector(selectAwake);
    const duckType = useAppSelector(selectDuckType);
    const duckImageArray:DuckType[] = useMemo(() => Object.keys(duckImages) as DuckType[], []);

    return (
        <div className="customisation">
            {duckImageArray.map((name) => (
                <button key={name} className={`customDuckButton ${duckType === name ? "selectedCustomDuckButton" : ""}`} onClick={() => dispatch(setDuckType(name))}>
                    <img src={`/ducks/${awake ? duckImages[name].awake : duckImages[name].asleep}`} alt="Duck quack" />
                </button>
            ))}
        </div>
    )
}