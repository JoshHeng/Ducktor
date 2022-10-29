import './Customisation.css';
import duckImages from '../duckImages.json';
import {duckType} from './DuckType';

function CustomDuck({setCustomDuckType, awake, currentDuck}: {
    setCustomDuckType: (_duckType:duckType) => void;
    awake: boolean;
    currentDuck: duckType;
}) {
    const duckImageArray:duckType[] = Object.keys(duckImages) as duckType[];

    return (
        <div className="customisation">
            {duckImageArray.map((name) => (
                <button key={name} className={`customDuckButton ${currentDuck === name ? "selectedCustomDuckButton" : ""}`} onClick={() => setCustomDuckType(name)}>
                    <img src={`/ducks/${awake ? duckImages[name].awake : duckImages[name].asleep}`} alt="Duck quack" />
                </button>
            ))}
            
        </div>
    )
}

export default CustomDuck;