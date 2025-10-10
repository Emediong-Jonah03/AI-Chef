export default function Recipe({recipe}) {
    if (!recipe) return null;

    return (
        <div className="mt-5 p-6 bg-white rounded-lg shadow-md">
            <div className="recipe-content whitespace-pre-line">
                {recipe}
            </div>
        </div>
    )
}