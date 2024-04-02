import { useState, useEffect, useRef } from "react";
import TerminalInterface from "./TerminalInterface";
import { analyzeTypingData } from "../utils"

function Quote({ quote, author, onFinish }) {
    const [allWords, setAllWords] = useState(quote.split(/(?<= )/));
    const [typedWords, setTypedWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(quote.split(/(?<= )/)[0]);
    const [currentInputValue, setCurrentInputValue] = useState('');
    const [isBlured, setIsBlured] = useState(true);

    const typingEvents = useRef([]);
    const hasSessionStarted = useRef(false);
    const input = useRef(null);

    useEffect(() => {
        let newWords = quote.split(/(?<= )/);
        setAllWords(newWords);
        setTypedWords([]);
        setCurrentWord(newWords[0]);
        setCurrentInputValue('');
        hasSessionStarted.current = false;
        focusOnTerminalInput();
    }, [quote])

    useEffect(() => {
        setCurrentInputValue('');
        if (typedWords.length === allWords.length) {
            setCurrentWord('');
            let analyzedData = analyzeTypingData(typingEvents.current);
            onFinish(analyzedData);
        } else {
            setCurrentWord(allWords[typedWords.length]);
        }
    }, [typedWords])

    const inputChangeHandler = (event) => {
        let inputChangedAt = new Date();
        let inputValue = event.target.value.slice(0, currentWord.length);
        if (hasSessionStarted.current || inputValue !== ' ') {
            hasSessionStarted.current = true;
            typingEvents.current.push({
                date: inputChangedAt,
                inputValue: inputValue,
                currentWord: currentWord
            });
            if (inputValue === currentWord) {
                setTypedWords([...typedWords, currentWord]);
                event.target.value = '';
                inputValue = '';
            } else {
                setCurrentInputValue(inputValue);
            }
        } else {
            event.target.value = '';
        }
    }

    const focusOnTerminalInput = () => {
        if (input) input.current.focus();
    }

    useEffect(() => {
        setAllWords(quote.split(/(?<= )/));
        setCurrentWord(quote.split(/(?<= )/)[0]);
        setTypedWords([]);
        focusOnTerminalInput();
    }, [quote]);

    return (
        <div id="typing-terminal" className={isBlured ? 'blured' : ''}>
            <div id="teminal-input-wrapper">
                <input
                    type="text"
                    value={currentInputValue}
                    ref={input} onFocus={() => setIsBlured(false)}
                    onBlur={() => setIsBlured(true)}
                    onChange={inputChangeHandler}
                    id="teminal-input"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
            </div>
            <blockquote onClick={focusOnTerminalInput}>
                <TerminalInterface
                    allWords={allWords}
                    typedWords={typedWords}
                    currentInputValue={currentInputValue}
                    isBlured={isBlured}
                />
            </blockquote>
            <cite id='author'>{author}</cite>
        </div>
    );
}

export default Quote;