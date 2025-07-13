import React, { useEffect, useState } from 'react';
import './App.css';

const quotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" }
];

function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">"{quote.text}"</p>
        <p id="author">- {quote.author}</p>
        <div className="buttons">
          <button id="new-quote" onClick={getRandomQuote}>New Quote</button>
          <a
            id="tweet-quote"
            href={`https://tw
