import React from 'react';

import './about.css';

export function About() {
  const [quote, setQuote] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [hasQuote, setHasQuote] = React.useState(false);

  if (!hasQuote) {
    fetch('https://api.quotable.io/quotes/random?tags=wisdom')
    .then((response) => response.json())
    .then((data) => {
      setQuote(data[0].content);
      setAuthor(data[0].author);
      setHasQuote(true);
    });
  }

  return (
    <main>
      <div className="text-center">
          <h1>About Me</h1>
          <p>Garrett Bennett</p>
          <img src="photos/profile-pic.png" className="rounded" alt="" width="200" height="200" />
          <br />
          <a href="https://www.linkedin.com/in/garrett-bennett-2423bb226/">LinkedIn</a>
          <p className="py-3">I'm a student at BYU studying software engineering. I've played a game similar to this one with my family and decided to make it an online game for a class.</p>
          <div id="quote" className="quote-box text-dark">
            <p className="quote">{quote}</p>
            <p className="author">{author}</p>
          </div>
      </div>
    </main>
  );
}