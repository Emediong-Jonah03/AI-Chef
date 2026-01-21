import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

function Header() {
  const { darkMode } = useTheme();

  return (
   <header style={{
      backgroundColor: darkMode ? '#1a202c' : '#F44336',
      color: 'white',
      padding: '0.3rem 2.5rem 0.3rem 0.6rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      position: 'relative',
      transition: 'background-color 0.3s'
    }}>
      <h1 className="text-2xl font-bold text-center" style={{
        color: darkMode ? 'white' : 'white'
      }}>AI Chef</h1>
      <p className="text-center text-sm mt-1" style={{
        color: darkMode ? '#F44336' : 'white'
      }}>Your personal AI-powered recipe generator</p>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>
    </header>
  );
}export default Header;