const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get quote from API
async function getQuote() {
    loading()
    // free proxy api from cors anywhere, It often results in http status code 429, because there is too much traffic. You can't do anything about the 429 error other than just wait.
    const proxyUrl = 'https://gour-cors.herokuapp.com/'
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        console.log(data)
        if(data.authorText === '') {
            authorText.innerText = 'Unknown';    
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //  Reduce font size for long quotes
        if(data.quoteText.length  > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        //stop loader show quote
        complete();
    } catch (error) {
        getQuote();
        console.log('Whoops, no quote', error);
    }
}

//  Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote)

// On load
getQuote();
