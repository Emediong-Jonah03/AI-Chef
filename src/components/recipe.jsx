import ReactMarkdown from 'react-markdown'


function Recipe({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="mt-5 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
}
export default Recipe;