import './CustomisationModal.css';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectDuckName, setName} from "../redux/settingsSlice";

export default function CustomisationModal() {
    const dispatch = useAppDispatch();
    const duckName = useAppSelector(selectDuckName);
    const [ TextFilterStrings, setTextFilterStrings ] = useState('');
    const onTextFilterChange = (event: any) => {
        setTextFilterStrings(event.target.value);
        chrome?.storage?.sync.set({ 'TextFilterStrings': event.target.value }).then(() => {});
    }
    const onDuckNameChange = (event: any) => {
        dispatch(setName(event.target.value));
    }

    useEffect(() => {
        let mounted = true;

        if (chrome?.storage) {
            chrome?.storage?.sync.get('TextFilterStrings', (result: any) => {
                if (mounted && result?.TextFilterStrings) setTextFilterStrings(result?.TextFilterStrings);
            });
        }

        return () => { mounted = false };
    }, []);

    return (
        <div className="customisationModal">
            <h2>Customisation</h2>

            <div className="input">
                <label htmlFor="duckName">Duck Name</label>
                <input type="text" required minLength={1} maxLength={10} id="duckName" onChange={onDuckNameChange} value={duckName} placeholder="Ducky"></input>
            </div>

            <div className="input">
                <label htmlFor="TextFilterStrings">Image Text Filter</label>
                <textarea className="textBox" rows={6} id="TextFilterStrings" onChange={onTextFilterChange} value={TextFilterStrings} placeholder="Quack"></textarea>
            </div>
        </div>
    )
}