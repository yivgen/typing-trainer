import { useState, useEffect } from 'react';
import Quote from './Quote';
import Spinner from './Spinner';
import TypingStats from './TypingStats';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Signout from './Signout';
import Navbar from './Navbar';

function TypeAQuote() {
    const axiosPrivate = useAxiosPrivate();

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isQuoteFinished, setIsQuoteFinished] = useState(false);
    const [typingData, setTypingData] = useState([]);

    const setNewQuote = () => {
        setIsQuoteFinished(false);
        setIsLoading(true);
        axiosPrivate.get('/api/get-random-quote/')
            .then(res => {
                console.log(res);
                setQuote(res.data?.quote || '');
                setAuthor(res.data?.author || '');
            })
            .catch(error => {
                setQuote('Oops! Something went wrong. Please try again later');
                setAuthor('Typing Trainer');
            })
            .finally(() => setIsLoading(false));
    }


    const onFinishedQuote = (typingData) => {
        console.log(typingData);
        axiosPrivate.post('/api/typing-lessons/', {
            duration: typingData.duration,
            length: typingData.length,
            typos: typingData.typos,
        })
        .catch(error => {
            console.log(error);
        })
        setTypingData(typingData);
        setIsQuoteFinished(true);
    }

    useEffect(() => {
        setIsQuoteFinished(false);
        setNewQuote();
    }, [])

    return (
        <div className="type-a-quote">
            <Navbar />
            <Signout />
            {isLoading
                ? <Spinner />
                : isQuoteFinished
                    ? <TypingStats typingData={typingData} onNextQuote={setNewQuote} />
                    : <Quote quote={quote} author={author} onFinish={onFinishedQuote} />}
        </div>
    );
}

export default TypeAQuote;
