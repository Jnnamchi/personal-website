const randomQuoteGeneratorElement = document.getElementById('random-quote-generator')
const colors = [
  [ "#FF8080", "#FFCF96" ],
  [ "#FFF3DA", "#D0BFFF" ],
  [ "#8DDFCB", "#82A0D8" ],
  [ "#F9B572", "#99B080" ],
  [ "#7C96AB", "#BFCCB5" ],
  [ "#B7B7B7", "#EDC6B1" ],
  [ "#FFDEB4", "#FFB4B4" ],
  [ "#FFAACF", "#B9F3E4" ],
  [ "#B5F1CC", "#E5FDD1" ],
  [ "#F7ECDE", "#54BAB9" ],
  [ "#7897AB", "#D885A3" ],
  [ "#B97A95", "#F6AE99" ],
]
function getRandomColorCombo () {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex]
}

async function getNewRandomQuote () {
  let quoteText = ''
  let quoteAuthor = ''
  try {
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '45299eefccmsh112abc56183e713p148d73jsnab641ffaf2f8',
        'x-rapidapi-host': 'quotes15.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Could not get quote!');
    }
    const data = await response.json()
    quoteText = data.content
    quoteAuthor = data.originator.name
  } catch (e) {
    const response = await fetch('https://type.fit/api/quotes')
    if (!response.ok) {
      alert('Could not get quote!');
    }
    const data = await response.json()
    const randomIndex = Math.floor(Math.random() * data.length);
    quoteText = data[randomIndex].text
    quoteAuthor = data[randomIndex].author.split(',')[0]
  }

  document.getElementById('random-quote-text').innerHTML = quoteText
  document.getElementById('random-quote-author').innerHTML = quoteAuthor

  const colorCombo = getRandomColorCombo()
  randomQuoteGeneratorElement.style.background = 'linear-gradient(45deg, ' + colorCombo[0] + ', ' + colorCombo[1]+ ')'
}