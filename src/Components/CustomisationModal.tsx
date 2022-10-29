import './CustomisationModal.css';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectDuckName, setName} from "../redux/settingsSlice";

export default function CustomisationModal() {
    const dispatch = useAppDispatch();
    const duckName = useAppSelector(selectDuckName);

    const [ altTextFilterStrings, setAltTextFilterStrings ] = useState('');
    const onAltTextFilterChange = (event: any) => {
        setAltTextFilterStrings(event.target.value);
        chrome?.storage?.sync.set({ 'altTextFilterStrings': event.target.value }).then(() => {});
    }
    const onDuckNameChange = (event: any) => {
        dispatch(setName(event.target.value));
    }

    useEffect(() => {
        let mounted = true;

        if (chrome?.storage) {
            chrome?.storage?.sync.get('altTextFilterStrings', (result: any) => {
                if (mounted && result?.altTextFilterStrings) setAltTextFilterStrings(result?.altTextFilterStrings);
            });
        }

        return () => { mounted = false };
    }, []);

    return (
        <div className="customisationModal">
            <h2>Customisation</h2>

            <div className="input">
                <label htmlFor="duckName">Duck Name</label>
                <input type="text" required minLength={1} maxLength={9} id="duckName" onChange={onDuckNameChange} value={duckName} placeholder="Ducky"></input>
            </div>

            <div className="input">
                <label htmlFor="altTextFilterStrings">Image Alt Text Filter</label>
                <textarea className="textBox" rows={6} id="altTextFilterStrings" onChange={onAltTextFilterChange} value={altTextFilterStrings} placeholder="Quack"></textarea>
            </div>
        </div>
    )
}