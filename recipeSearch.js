
const searchForm = document.getElementById('searchForm')
const results = document.getElementById('results')



searchForm.addEventListener('submit', handleSearchSubmit);

function handleSearchSubmit(event) {
  const input = document.getElementById('query');
  const query = input.value;
  // Stop Page Reload
  event.preventDefault();


  // console.log(query.value);


  // according to doucumentation
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((dataStream) => dataStream.json())
    .then((dataObj) => {
      // console.log(data.meals[0].strMeal)
      input.value = '';
      render(dataObj.meals)
    })
    .catch((err) => console.log(err))
    }


//Render Results to DOM
function render(recipesArr) {
  const cards = recipesArr.map((recipe) => {
    return getTemplate(recipe);
  }).join('')

  results.insertAdjacentHTML('afterbegin', cards);
}

function getTemplate(recipeObj) {
  return `
    <div class="col-md-4">
      <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
        <img src ="${recipeObj.strMealThumb}" alt="${recipeObj.strMeal}" height="250" />
        <div class="card-body">
          <h5 class="card-title">${recipeObj.strMeal}</h5>
          <p>${recipeObj.strInstructions}</p>
          <a class="btn btn-dark" href="${recipeObj}">See Details</a>
       </div>
      </div>
   </div>
  `;
}
