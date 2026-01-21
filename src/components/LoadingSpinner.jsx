function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F44336]" />
      <p className="ml-3 text-gray-600 dark:text-gray-400">Please wait, creating your recipe…</p>
    </div>
  );
}

export default LoadingSpinner;