import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// The main App component
const App = () => {
  // State for the current quote and author
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  // State to store all quotes fetched from the API
  const [allQuotes, setAllQuotes] = useState([]);
  // State for the accent color
  const [accentColor, setAccentColor] = useState('#2c3e50');

  // useMemo to prevent the colors array from being recreated on every render
  const colors = useMemo(() => [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', 
    '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', 
    '#77B1A9', '#73A857'
  ], []);

  // useEffect to fetch the quotes data when the component mounts
  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(res => res.json())
      .then(data => {
        setAllQuotes(data);
        // Set an initial random quote
        const randomQuoteIndex = Math.floor(Math.random() * data.length);
        const randomColorIndex = Math.floor(Math.random() * colors.length);
        setQuote(data[randomQuoteIndex].text);
        setAuthor(data[randomQuoteIndex].author || 'Unknown');
        setAccentColor(colors[randomColorIndex]);
      })
      .catch(error => {
        console.error("Error fetching quotes:", error);
        // Provide a fallback quote in case of an API error
        setQuote("The only way to do great work is to love what you do.");
        setAuthor("Steve Jobs");
      });
  }, [colors]); // The dependency array is empty, so this runs once on mount

  // useEffect to update the document body style whenever the accentColor changes
  useEffect(() => {
    document.body.style.backgroundColor = accentColor;
    document.body.style.color = accentColor;
  }, [accentColor]);

  // Function to get a new random quote
  const getNewQuote = () => {
    if (allQuotes.length > 0) {
      const randomQuoteIndex = Math.floor(Math.random() * allQuotes.length);
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      
      setQuote(allQuotes[randomQuoteIndex].text);
      setAuthor(allQuotes[randomQuoteIndex].author || 'Unknown');
      setAccentColor(colors[randomColorIndex]);
    }
  };

  // URL for tweeting the current quote
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
  
  return (
    <div id="wrapper">
      <div id="quote-box">
        <div id="text" style={{ color: accentColor }}>
          <i className="fas fa-quote-left"></i> 
          <span> {quote || 'Loading...'}</span>
        </div>
        <div id="author" style={{ color: accentColor }}>
          - {author || '...'}
        </div>
        <div className="buttons">
          <a
            id="tweet-quote"
            className="button"
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: accentColor }}
            title="Tweet this quote!"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <button
            id="new-quote"
            className="button"
            onClick={getNewQuote}
            style={{ backgroundColor: accentColor }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
