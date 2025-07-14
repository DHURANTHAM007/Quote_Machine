import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

// 1. QUOTES DATA IS EMBEDDED IN THE APP
const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    quote: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas A. Edison"
  },
  {
    quote: "The woman who does not require validation from anyone is the most feared individual on the planet.",
    author: "Mohadesa Najumi"
  },
  {
    quote: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein"
  },
  {
    quote: "Your time is limited, so don’t waste it living someone else’s life.",
    author: "Steve Jobs"
  },
  {
    quote: "The two most important days in your life are the day you are born and the day you find out why.",
    author: "Mark Twain"
  },
  {
      quote: "Whatever you are, be a good one.",
      author: "Abraham Lincoln"
  }
];


const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [accentColor, setAccentColor] = useState('#342224');
  // State to control the fade animation
  const [isFading, setIsFading] = useState(false);

  const colors = useMemo(() => [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', 
    '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', 
    '#77B1A9', '#73A857'
  ], []);

  // Set the initial quote when the component mounts
  const setInitialQuote = useCallback(() => {
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    setQuote(quotes[randomQuoteIndex].quote);
    setAuthor(quotes[randomQuoteIndex].author);
    setAccentColor(colors[randomColorIndex]);
  }, [colors]);

  useEffect(() => {
    setInitialQuote();
  }, [setInitialQuote]);
  
  // Update body background color when accentColor changes
  useEffect(() => {
    document.body.style.backgroundColor = accentColor;
  }, [accentColor]);

  // 2. NEW QUOTE FUNCTION WITH FADE ANIMATION
  const getNewQuote = () => {
    // Start the fade-out animation
    setIsFading(true);

    // Wait for the fade-out animation to complete (500ms)
    setTimeout(() => {
      let newQuote = {};
      let newColor = '';

      // Keep picking until the quote is new
      do {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        newQuote = quotes[randomIndex];
      } while (newQuote.quote === quote);
      
      // Keep picking until the color is new
      do {
          const randomColorIndex = Math.floor(Math.random() * colors.length);
          newColor = colors[randomColorIndex];
      } while (newColor === accentColor);

      // Update state with the new data
      setQuote(newQuote.quote);
      setAuthor(newQuote.author);
      setAccentColor(newColor);
      
      // End the animation, causing it to fade back in
      setIsFading(false);
    }, 500); // This duration should match the CSS transition time
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
  
  return (
      <div id="quote-box">
        {/* Add a class for fading when isFading is true */}
        <div id="text-wrapper" className={isFading ? 'fade-out' : ''}>
          <div id="text" style={{ color: accentColor }}>
            <i className="fas fa-quote-left"></i> 
            <span> {quote}</span>
          </div>
          <div id="author" style={{ color: accentColor }}>
            - {author}
          </div>
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
