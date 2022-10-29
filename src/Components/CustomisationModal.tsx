import './CustomisationModal.css';
import {useEffect, useState} from "react";

export default function CustomisationModal() {
    const [ TextFilterStrings, setTextFilterStrings ] = useState('');
    const onTextFilterChange = (event: any) => {
        setTextFilterStrings(event.target.value);
        chrome?.storage?.sync.set({ 'TextFilterStrings': event.target.value }).then(() => {});
    }

    useEffect(() => {
        let mounted = true;

        if (chrome?.storage) {
            chrome?.storage?.sync.get('TextFilterStrings', (result: any) => {
                if (mounted && result?.TextFilterStrings) setTextFilterStrings(result?.TextFilterStrings);
            });
        }

        return () => { mounted = false };
    }, [])

    return (
        <div className="customisationModal">
            <h2>Customisation</h2>

            <div>
                <label htmlFor="TextFilterStrings">Image Text Filter (newline separated)</label>
                <textarea className="textBox" rows={6} id="TextFilterStrings" onChange={onTextFilterChange} value={TextFilterStrings}></textarea>
            </div>
        </div>
    )
}