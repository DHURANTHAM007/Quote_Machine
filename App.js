const QUOTES_API_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const colors = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12',
  '#e74c3c', '#9b59b6', '#FB6964', '#342224',
  '#472E32', '#BDBB99', '#77B1A9', '#73A857'
];

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      currentQuote: '',
      currentAuthor: '',
      currentColor: '#333'
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    fetch(QUOTES_API_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ quotes: data.quotes }, () => {
          // After fetching and storing quotes, get the first random quote
          this.getNewQuote();
        });
      })
      .catch(error => console.error('Error fetching quotes:', error));
  }

  getNewQuote() {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const { quote, author } = quotes[randomQuoteIndex];
      
      this.setState({
        currentQuote: quote,
        currentAuthor: author,
        currentColor: colors[randomColorIndex]
      });
    }
  }

  render() {
    const { currentQuote, currentAuthor, currentColor } = this.state;
    
    // Dynamically update body background and element colors
    document.body.style.backgroundColor = currentColor;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentQuote}" - ${currentAuthor}`)}`;

    return (
      <div id="quote-box">
        <div id="text" style={{ color: currentColor }}>
          <i className="fa fa-quote-left"></i> {currentQuote}
        </div>
        <div id="author" style={{ color: currentColor }}>
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
            style={{ backgroundColor: currentColor }}
          >
            <i className="fa fa-twitter"></i>
          </a>
          <button
            id="new-quote"
            className="button"
            onClick={this.getNewQuote}
            style={{ backgroundColor: currentColor }}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteMachine />, document.getElementById('root'));
