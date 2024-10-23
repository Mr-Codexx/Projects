const quotes = [
    {
        quote: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        quote: "Do not wait to strike till the iron is hot, but make it hot by striking.",
        author: "William Butler Yeats"
    },
    {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        quote: "Get busy living or get busy dying.",
        author: "Stephen King"
    },
    {
        quote: "You only live once, but if you do it right, once is enough.",
        author: "Mae West"
    },
    {
        quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr."
    }
];

// Function to generate a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to display a new quote with fade-in effect
function displayQuote() {
    const quoteData = getRandomQuote();
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    
    // Fade-out effect
    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.textContent = quoteData.quote;
        authorElement.textContent = quoteData.author;
        
        // Fade-in effect
        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 1;
    }, 500); // Wait for fade-out to complete
}

// Event listener for the button
document.getElementById('new-quote').addEventListener('click', displayQuote);

// Display the first quote on page load
displayQuote();
