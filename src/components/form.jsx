import React from "react";
import Recipe from "./recipe";
import IngredientsList from "./ingredientList";
import AIResponse from "../ai";
import LoadingSpinner from "./LoadingSpinner";

function Form() {
  const [ingredient, setIngredient] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const recipeSection = React.useRef(null);

  function handleRecipeGenerated(generatedRecipe) {
    setRecipe(generatedRecipe);
    setRecipeShown(true);
    setIsLoading(false);
    setError(null);
  }

  function handleRecipeError(message) {
    setError(message);
    setIsLoading(false);
    setIsGeneratingRecipe(false);
  }

  const [isGeneratingRecipe, setIsGeneratingRecipe] = React.useState(false);

  function toggleShowRecipe() {
    setRecipeShown(true);
    setIsGeneratingRecipe(true);
    setIsLoading(true);
    setError(null);
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
              className="border border-gray-300 text-black dark:text-gray-100 text-[1.8rem] sm:text-[1.1rem] placeholder:text-[1.2rem] placeholder:sm:text-[1.1rem] placeholder:dark:text-gray-400 px-2 w-8/12 shadow"
              aria-label="Add ingredient"
              name="ingredient"
            />
            <button
              className="bg-black dark:bg-gray-600 text-white px-2 shadow rounded cursor-pointer hover:opacity-65 dark:hover:opacity-90 text-sm text-center py-1.5"
              type="submit"
            >
              + Add ingredients
            </button>
          </div>
          {ingredientItemList.length === 0 && (
            <p className="text-neutral-500 dark:text-gray-400 text-center mt-4">
              Add ingredients above to get started.
            </p>
          )}

          {ingredientItemList.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-center dark:text-gray-200">
                Ingredients at hand:
              </h3>
              {ingredientItemList.length < 6 && (
                <p className="text-neutral-500 dark:text-gray-400 text-left">
                  Add at least 6 ingredients to generate a recipe ({6 - ingredientItemList.length} more).
                </p>
              )}
            </div>
          )}

          {ingredientItemList.length > 0 && (
            <ul className="w-full max-w-md text-[1.2rem] sm:text-[1.1rem] mb-5 list-disc marker:text-[#F44336] dark:text-gray-200">
              {ingredientItemList}
            </ul>
          )}

          {error && (
            <div
              className="w-full max-w-md mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
              role="alert"
            >
              {error}
            </div>
          )}

          {ingredientItemList.length > 5 && (
            <IngredientsList showRecipe={toggleShowRecipe} ref={recipeSection} />
          )}
          {isLoading && <LoadingSpinner />}
          {recipeShown && !isLoading && <Recipe recipe={recipe} />}
          {isGeneratingRecipe && (
            <AIResponse
              ingredients={ingredient.map((item) => item.text)}
              onRecipeGenerated={(r) => {
                handleRecipeGenerated(r);
                setIsGeneratingRecipe(false);
              }}
              onError={handleRecipeError}
            />
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
