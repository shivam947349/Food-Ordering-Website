const searchBox = document.querySelector('.searchBox') ;
const searchBtn = document.querySelector('.searchBtn') ;
const recipeContainer = document.querySelector('.recipe-container') ;
const recipeCloseBtn = document.querySelector('.recipe-Close-btn') ;
const recipeDetailContent = document.querySelector('.recipe-detail-content') ;



const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = `<h2>Fetching Recipes....</h2>`
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json();

        recipeContainer.innerHTML = ""
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `

            const button = document.createElement('button');
            button.textContent = "View Recipe" ;
            recipeDiv.appendChild(button) ;

            // Adding event listner to recipe button

            button.addEventListener('click', ()=>{
                openRecipePopup(meal);
            })

            recipeContainer.appendChild(recipeDiv) ;
        });
    } catch (error) {
        recipeContainer.innerHTML = `<h2>Error in Fetching Recipes/ Not Available/ Search Different Food....</h2>`
    }
    
}

const fetchIngredients = (meal) =>{
    let ingredientsList = "" ;
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`] ;
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break ;
        }
    }
    return ingredientsList ;
}

const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>

        <div class = "recipeInstructions">
            <h3>Insttructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `

    
    recipeDetailContent.parentElement.style.display ="block" ;

}


recipeCloseBtn.addEventListener('click', (e)=>{
    recipeDetailContent.parentElement.style.display = 'none' ;
})
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();   
    if(!searchInput){
        recipeContainer.innerHTML= `<h2>Type the Meal You want to search in Search Box.</h2>` ;
        return;
    } 
    fetchRecipes(searchInput);
    // console.log("Button clicked")
})
