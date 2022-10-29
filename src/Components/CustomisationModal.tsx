import './CustomisationModal.css';
import {useEffect, useState} from "react";

export default function CustomisationModal() {
    const [ altTextFilterStrings, setAltTextFilterStrings ] = useState('');
    const onAltTextFilterChange = (event: any) => {
        setAltTextFilterStrings(event.target.value);
        chrome?.storage?.sync.set({ 'altTextFilterStrings': event.target.value }).then(() => {});
    }

    useEffect(() => {
        let mounted = true;

        if (chrome?.storage) {
            chrome?.storage?.sync.get('altTextFilterStrings', (result: any) => {
                if (mounted && result?.altTextFilterStrings) setAltTextFilterStrings(result?.altTextFilterStrings);
            });
        }

        return () => { mounted = false };
    }, [])

    return (
        <div className="customisationModal">
            <h2>Customisation</h2>

            <div>
                <label htmlFor="altTextFilterStrings">Image Text Filter (newline separated)</label>
                <textarea rows={6} id="altTextFilterStrings" onChange={onAltTextFilterChange} value={altTextFilterStrings}></textarea>
            </div>
        </div>
    )
}