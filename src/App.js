import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

const App = () => {
  // State for the current quote and author
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  // State to store all quotes fetched from the API
  const [allQuotes, setAllQuotes] = useState([]);
  // State for the dynamic accent color
  const [accentColor, setAccentColor] = useState('#2c3e50');

  // useMemo ensures the colors array isn't recreated on every render
  const colors = useMemo(() => [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', 
    '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', 
    '#77B1A9', '#73A857'
  ], []);

  // useCallback memoizes the fetch function
  const fetchQuotes = useCallback(async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      setAllQuotes(data);
      
      // Set an initial random quote and color
      const randomQuoteIndex = Math.floor(Math.random() * data.length);
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      setQuote(data[randomQuoteIndex].text);
      setAuthor(data[randomQuoteIndex].author || 'Unknown');
      setAccentColor(colors[randomColorIndex]);

    } catch (error) {
      console.error("Error fetching quotes:", error);
      // Fallback quote in case the API fails
      setQuote("The only way to do great work is to love what you do.");
      setAuthor("Steve Jobs");
    }
  }, [colors]);

  // useEffect to fetch data on initial component mount
  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  // useEffect to update the body's background color whenever accentColor changes
  useEffect(() => {
    document.body.style.backgroundColor = accentColor;
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

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
  
  return (
      <div id="quote-box">
        <div id="text" style={{ color: accentColor }}>
          <i className="fas fa-quote-left"></i> 
          <span> {quote || 'Loading quote...'}</span>
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
  );
};

export default App;
