import React, { useState, useEffect } from 'react';
import './App.css';

const quotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
];

export default function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const getRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">"{quote.text}"</p>
        <p id="author">— {quote.author}</p>
        <div className="buttons">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text="${quote.text}" — ${quote.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </a>
          <button id="new-quote" onClick={getRandomQuote}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}
