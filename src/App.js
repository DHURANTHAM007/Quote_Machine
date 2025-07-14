import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [allQuotes, setAllQuotes] = useState([]);
  const [accentColor, setAccentColor] = useState('#2c3e50');

  const colors = useMemo(() => [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', 
    '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', 
    '#77B1A9', '#73A857'
  ], []);

  const fetchQuotes = useCallback(async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      setAllQuotes(data);
      
      const randomQuoteIndex = Math.floor(Math.random() * data.length);
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      setQuote(data[randomQuoteIndex].text);
      setAuthor(data[randomQuoteIndex].author || 'Unknown');
      setAccentColor(colors[randomColorIndex]);

    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuote("The only way to do great work is to love what you do.");
      setAuthor("Steve Jobs");
    }
  }, [colors]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    document.body.style.backgroundColor = accentColor;
  }, [accentColor]);

  // CORRECTED: This function now ensures the new quote is different from the current one.
  const getNewQuote = () => {
    if (allQuotes.length > 0) {
      let newQuote = {};
      
      // Keep picking a random quote until it's different from the current one
      do {
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        newQuote = allQuotes[randomIndex];
      } while (newQuote.text === quote);

      const randomColorIndex = Math.floor(Math.random() * colors.length);
      
      setQuote(newQuote.text);
      setAuthor(newQuote.author || 'Unknown');
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
