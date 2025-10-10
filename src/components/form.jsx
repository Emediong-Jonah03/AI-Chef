import React from "react";
import Recipe from "./recipe";
import IngredietsList from "./ingredientList";
import AIResponse from "../ai";

function Form() {
  const [ingredient, setIngredient] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("")

  const recipeSection = React.useRef(null)

  function handleRecipeGenerated(generatedRecipe) {
    setRecipe(generatedRecipe);
    setRecipeShown(true);
  }

  function toggleShowRecipe() {
    setRecipeShown(true);
    // Generate recipe when button is clicked
    <AIResponse 
      ingredients={ingredient.map(item => item.text)}
      onRecipeGenerated={handleRecipeGenerated}
    />
  }
   
  const ingredientItemList = ingredient.map((item) => (
    <li key={item.id} className="my-3">
      {item.text.charAt(0).toUpperCase() + item.text.slice(1).toLowerCase()}
    </li>
  ))

  function submited(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient");

    const newItem = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      text: newIngredient,
    };
    setIngredient((prevIngredient) => [...prevIngredient, newItem]);
    event.target.reset();
  }
  
  React.useEffect(()=> {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [recipe])

  return (
    <>
      <form onSubmit={submited}>
        <div className="flex flex-col items-center mx-7 flex-grow text-[1.2rem] sm:text-[1.1rem]">
          <div className="flex max-w-[100%] py-2 mt-7 mx-2 flex-grow sm:w-[50%]">
            <input
              type="text"
              placeholder="Example: Onions"
              className="border border-gray-300 text-[1.8rem] sm:text-[1.1rem] placeholder:text-[1.2rem] placeholder:sm:text-[1.1rem] px-2 w-[100%] shadow"
              aria-label="Add ingredient"
              name="ingredient"
            />
            <button
              className="bg-black text-white px-3 py-1 shadow-inner rounded ml-3 cursor-pointer hover:opacity-65 w-60"
              type="submit"
            >
              + Add ingredients
            </button>
          </div>
            {ingredientItemList.length > 0 && (
              <div>
                <h3 className="text-2xl text-bold text-center">
                  Ingrediets at hand:
                </h3>
               {ingredientItemList.length < 6 && <p className="text-neutral-500 text-left">
                  Add at least four(6) ingredients
                </p>
                }
              </div>
            )}
               
            <ul className="w-full max-w-md text-[1.2rem] sm:text-[1.1rem] mb-5 list-disc marker:text-[#F44336]">
              {ingredientItemList}
            </ul>

            {ingredientItemList.length > 5 && (
              <IngredietsList showRecipe={toggleShowRecipe} ref={recipeSection}/>
            )}

            {recipeShown && <Recipe recipe={recipe} />}
        </div>
      </form>
    </>
  );
}

export default Form;