const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

// Function to fetch recipes from the MealDB API
async function fetchRecipes(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data.meals; // Return the meals array from the response
}

// Function to display results
function displayResults(recipes) {
    resultsDiv.innerHTML = ''; // Clear previous results
    if (!recipes) {
        resultsDiv.innerHTML = `<p class="text-danger">No recipes found!</p>`;
        return;
    }
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';
        card.innerHTML = `
            <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${recipe.strMeal}</h5>
                <p class="card-text">Calories: ${recipe.calories ? recipe.calories : 'N/A'}</p>
                <a href="${recipe.strSource}" class="btn btn-primary" target="_blank">View Recipe</a>
            </div>
        `;
        resultsDiv.appendChild(card);
    });
}

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const recipes = await fetchRecipes(query);
        displayResults(recipes);
    } else {
        alert('Please enter a search term!');
    }
});
