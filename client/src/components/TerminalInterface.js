import { useState, useEffect } from "react";
import { sharedStart } from "../utils";

function TerminalInterface({ allWords, typedWords, currentInputValue, isBlured }) {
    const [correctlyTypedText, setCorrectlyTypedText] = useState('');
    const [incorrectlyTypedText, setIncorrectlyTypedText] = useState('');
    const [textToType, setTextToType] = useState('');

    const updateInterface = () => {
        let currentWord = allWords[typedWords.length] || '';
        let correctlyTypedChars = sharedStart([currentWord, currentInputValue]);
        let incorrectlyTypedChars = currentWord.substring(correctlyTypedChars.length, currentInputValue.length);
        let wordCharsToType = currentWord.substring(correctlyTypedChars.length + incorrectlyTypedChars.length);
        setCorrectlyTypedText([...typedWords, correctlyTypedChars].join(''));
        setIncorrectlyTypedText(incorrectlyTypedChars);
        setTextToType([wordCharsToType, ...allWords.slice(typedWords.length + 1)].join(''));
    }

    useEffect(() => {
        updateInterface();
    }, [allWords, typedWords, currentInputValue])

    return (
        <div>
            <span id='correctly-typed-text'>{correctlyTypedText}</span>
            <span id='incorrectly-typed-text'>{incorrectlyTypedText}</span>
            <span id='text-to-type'>
                <span id={isBlured ? '' : 'current-char'}>{textToType[0]}</span>
                {textToType.slice(1)}
            </span>
        </div>
    )
}

export default TerminalInterface;