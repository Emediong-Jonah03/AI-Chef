import React from "react";
import Recipe from "./recipe";
import IngredietsList from "./ingredientList";
import AIResponse from "../ai";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "./ThemeProvider.jsx";


function Form() {
  const { darkMode } = useTheme();
  const [ingredient, setIngredient] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const recipeSection = React.useRef(null);

  function handleRecipeGenerated(generatedRecipe) {
    setRecipe(generatedRecipe);
    setRecipeShown(true);
    setIsLoading(false);
  }

  const [isGeneratingRecipe, setIsGeneratingRecipe] = React.useState(false);

  function toggleShowRecipe() {
    setRecipeShown(true);
    setIsGeneratingRecipe(true);
    setIsLoading(true);
  }

  const ingredientItemList = ingredient.map((item) => (
    <li key={item.id} className="my-3">
      {item.text.charAt(0).toUpperCase() + item.text.slice(1).toLowerCase()}
    </li>
  ));

  function submited(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient");

    if (newIngredient === null || newIngredient ==="") {
      alert("Please insert ingredient")
    }

    const newItem = {
      id: Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      text: newIngredient,
    };
    setIngredient((prevIngredient) => [...prevIngredient, newItem]);
    event.target.reset();
  }

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [recipe]);

  return (
    <>
      <form onSubmit={submited}>
        <div className="flex flex-col items-center mx-7 flex-grow text-[1.2rem] sm:text-[1.1rem] dark:text-gray-200">
          <div className="flex py-3 mt-7 sm:w-[50%] justify-between items-center gap-2">
            <input
              type="text"
              placeholder="Example: Onions"
              className="border border-gray-30 text-[1.8rem] sm:text-[1.1rem] placeholder:text-[1.2rem] placeholder:sm:text-[1.1rem] placeholder:dark:text-gray-400 px-2 w-8/12 shadow"
              aria-label="Add ingredient"
              name="ingredient"
              style={{
                color: darkMode ? "#F44336" : "black",
              }}
            />
            <button
              className="bg-black dark:bg-gray-700 text-white px-2 shadow rounded cursor-pointer hover:opacity-65 text-sm text-center py-1.5"
              type="submit"
            >
              + Add ingredients
            </button>
          </div>
          {ingredientItemList.length > 0 && (
            <div>
              <h3 className="text-2xl text-bold text-center dark:text-gray-200">
                Ingrediets at hand:
              </h3>
              {ingredientItemList.length < 6 && (
                <p className="text-neutral-500 dark:text-gray-400 text-left">
                  Add at least four(6) ingredients
                </p>
              )}
            </div>
          )}

          <ul className="w-full max-w-md text-[1.2rem] sm:text-[1.1rem] mb-5 list-disc marker:text-[#F44336] dark:text-gray-200">
            {ingredientItemList}
          </ul>

          {ingredientItemList.length > 5 && (
            <IngredietsList showRecipe={toggleShowRecipe} ref={recipeSection} />
          )}
          {isLoading && <LoadingSpinner />}
          {recipeShown && !isLoading && <Recipe recipe={recipe} />}
          {recipeShown && <Recipe recipe={recipe} />}
          {isGeneratingRecipe && (
            <AIResponse
              ingredients={ingredient.map((item) => item.text)}
              onRecipeGenerated={(generatedRecipe) => {
                handleRecipeGenerated(generatedRecipe);
                setIsGeneratingRecipe(false);
              }}
            />
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
