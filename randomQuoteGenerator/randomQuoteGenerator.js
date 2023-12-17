
function getNewRandomQuote () {
	fetch('https://api.quotable.io/quotes/random')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const quoteText = data[0].content
    const quoteAuthor = data[0].author
    document.getElementById('random-quote-text').innerHTML = quoteText
    document.getElementById('random-quote-author').innerHTML = quoteAuthor
  })
  .catch(error => {
    // Handle errors here
    alert('There was a problem getting a new quote!');
  });
}