import './TypingStats.css'

function TypingStats({ typingData, onNextQuote }) {
    const claculateAverageWPM = () => {
        return ((60000 * typingData.length) / typingData.duration / 5).toFixed(2);
    }

    const calculateAccuracy = () => {
        let correctlyTypedChars = typingData.length - typingData.typos;
        return ((correctlyTypedChars * 100) / typingData.length).toFixed(2);
    }

    return (
        <>
            <div id="typing-stats">
                Speed:
                <span className="value">{claculateAverageWPM()} wpm</span>,
                Accuracy:
                <span className="value">{calculateAccuracy()}%</span>
            </div>
            <div>
                <input className="button" type="button" value='Next Quote' onClick={onNextQuote} autoFocus />
            </div>
        </>
    )
}

export default TypingStats;