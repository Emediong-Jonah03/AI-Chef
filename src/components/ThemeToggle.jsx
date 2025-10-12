import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { darkMode, toggleDarkMode } = useTheme();

    const handleClick = () => {
        console.log('Current theme:', darkMode ? 'dark' : 'light');
        toggleDarkMode();
        // Check after a small delay to see if the state updated
        setTimeout(() => {
            console.log('Theme after toggle:', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }, 100);
    };

    return (
        <button
            onClick={handleClick}
            style={{
                padding: '0.15rem',
                borderRadius: '9999px',
                backgroundColor: darkMode ? '#000000' : '#ffffff',
                border: `2px solid ${darkMode ? '#ffd700' : '#d1d5db'}`,
                transition: 'all 0.2s'
            }}
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                // Sun icon for light mode
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                // Moon icon for dark mode
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
}