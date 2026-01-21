import React from "react";

const IngredientsList = React.forwardRef(function IngredientsList({ showRecipe }, ref) {
  return (
    <section>
      <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 rounded py-4 px-4 w-[97%] flex-wrap">
        <div className="w-90 sm:w-auto mb-2" ref={ref}>
          <p className="text-semibold text-left dark:text-gray-200">Ready for a recipe?</p>
          <p className="text-neutral-600 dark:text-gray-400 text-left">
            Generate a recipe from list of ingredients
          </p>
        </div>
        <button
          type="button"
          className="bg-[#F44336] text-white rounded cursor-pointer px-2 py-2 hover:opacity-80 w-60"
          onClick={showRecipe}
        >
          Get a recipe
        </button>
      </div>
    </section>
  );
});

export default IngredientsList;