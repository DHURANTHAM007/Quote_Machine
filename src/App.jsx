import React, { useState, useEffect } from 'react';

const QUOTES_API_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const colors = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12',
  '#e74c3c', '#9b59b6', '#FB6964', '#342224',
  '#472E32', '#BDBB99', '#77B1A9', '#73A857'
];

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [currentColor, setCurrentColor] = useState('#333');

  // Fetch all quotes on initial component mount
  useEffect(() => {
    fetch(QUOTES_API_URL)
      .then(response => response.json())
      .then(data => {
        setQuotes(data.quotes);
      })
      .catch(error => console.error('Error fetching quotes:', error));
  }, []); // Empty dependency array means this runs only once

  // Set a new random quote once quotes are loaded
  useEffect(() => {
    if (quotes.length > 0) {
      getNewQuote();
    }
  }, [quotes]); // This runs whenever the 'quotes' array changes (i.e., after fetching)

  // Update the body background color whenever the color changes
  useEffect(() => {
    document.body.style.backgroundColor = currentColor;
    document.body.style.transition = 'background-color 1s ease';
  }, [currentColor]);

  const getNewQuote = () => {
    if (quotes.length > 0) {
      const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const { quote, author } = quotes[randomQuoteIndex];
      
      setCurrentQuote(quote);
      setCurrentAuthor(author);
      setCurrentColor(colors[randomColorIndex]);
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentQuote}" - ${currentAuthor}`)}`;

  return (
    <div id="quote-box">
      <div id="text" style={{ color: currentColor, transition: 'color 1s ease' }}>
        <i className="fa fa-quote-left"></i> {currentQuote}
      </div>
      <div id="author" style={{ color: currentColor, transition: 'color 1s ease' }}>
        - {currentAuthor}
      </div>
      <div className="buttons">
        <a
          id="tweet-quote"
          className="button"
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Tweet this quote!"
          style={{ backgroundColor: currentColor, transition: 'background-color 1s ease' }}
        >
          <i className="fab fa-twitter"></i>
        </a>
        <button
          id="new-quote"
          className="button"
          onClick={getNewQuote}
          style={{ backgroundColor: currentColor, transition: 'background-color 1s ease' }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
