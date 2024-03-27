import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Quote from './components/Quote';
import Spinner from './components/Spinner';
import TypingStats from './components/TypingStats';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQuoteFinished, setIsQuoteFinished] = useState(false);
  const [typingData, setTypingData] = useState([]);

  const setNewQuote = () => {
    setIsQuoteFinished(false);
    setIsLoading(true);
    axios.get('http://localhost:8080/api/get-quote/')
      .then(res => {
        console.log(res)
        setQuote(res.data?.quote || '');
        setAuthor(res.data?.author || '');
      })
      .catch(error => {
        console.log(error);
        setQuote('Oops! Something went wrong. Please try again later');
        setAuthor('Typing Trainer');
      })
      .finally(() => setIsLoading(false));
  }

  
  const onFinishedQuote = (typingData) => {
    console.log(typingData);
    setTypingData(typingData);
    setIsQuoteFinished(true);
  }

  useEffect(() => {
    setIsQuoteFinished(false);
    setNewQuote();
  }, [])

  return (
    <div className="App">
      {isLoading
        ? <Spinner/>
        : isQuoteFinished
          ? <TypingStats typingData={typingData} onNextQuote={setNewQuote} />
          : <Quote quote={quote} author={author} onFinish={onFinishedQuote} />}
    </div>
  );
}

export default App;
