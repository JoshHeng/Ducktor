import './MotivationalQuote.css';
import {useMemo} from "react";
import quotes from '../motivationalQuotes.json';
import {useAppSelector} from "../redux/hooks";
import {selectAwake, selectEnabledModules} from "../redux/settingsSlice";

export default function MotivationalQuote() {
    const awake = useAppSelector(selectAwake);
    const enabledModules = useAppSelector(selectEnabledModules);

    const quote = useMemo(() => {
        if (!awake || !enabledModules['module.motivation']) return;

        // Show 1/3 times
        if (Math.floor(Math.random() * 3) === 0) {
            return quotes[Math.floor(Math.random() * (quotes.length + 1))];
        }

       return null;
    }, [enabledModules['module.motivation'], awake]);

    if (!quote) return null;

    return (
        <>
            <img src="/ducks/SpeechBubble.png" alt="Speech Bubble" style={{ opacity: 0.8 }}/>
            <div className="motivationalQuote"><p>{quote}</p></div>
        </>
    );
}