import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState("");
  const [singleRecipe, setSingleRecipe] = useState({});
  const [isGetRecipesClicked, setisGetRecipesClicked] = useState(false);

  //This is the get request needed to pass into axios call
  const options = {
    method: "GET",
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
    params: { number: 5, tags: tags },
    headers: {
      "X-RapidAPI-Key": "4e9df3d211msh837c26cef975863p1741e2jsnc73dade73be6",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  //Axios call to fetch the requested data
  const getRecipes = async () => {
    await axios
      .request(options)
      .then(function (response) {
        recipeArr(response.data.recipes);
        setisGetRecipesClicked(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //sets the recipe state with new response data
  const recipeArr = (response) => {
    setRecipes(response);
  };

  //update tags state
  const tagInputsHandler = (e) => {
    e.preventDefault();
    setTags(e.target.value.toLowerCase());
  };

  console.log("RECIPE", singleRecipe);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <div className="topInputs">
          <input
            onChange={tagInputsHandler}
            placeholder="ex. gluten free, dinner"
          ></input>

          <button className="get-recipes-btn" onClick={getRecipes}>
            Get recipes
          </button>
        </div>
        <div className="recipeTitles">
          <h1></h1>
          {isGetRecipesClicked ? null : <h1>Random recipe generator</h1>}

          {isGetRecipesClicked ? (
            <div className="pickOne">Select a recipe!</div>
          ) : null}

          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <button
                className="recipeTitles"
                onClick={() => setSingleRecipe(recipe)}
                value={recipe}
              >
                {recipe.title}
              </button>
            </div>
          ))}

          <div className="displayedRecipe">
            <div className="displayedRecipeTitle">{singleRecipe.title}</div>
            <div>
              <img src={singleRecipe.image}></img>
            </div>
            <div className="goToRecipeBtn">
              {singleRecipe.sourceUrl ? (
                <button className="goToRecipeBtn">
                  <a href={singleRecipe.sourceUrl}>Go to recipe!</a>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
