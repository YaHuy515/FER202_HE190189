import { useContext } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      style={{
        textAlign: "center",
        padding: "30px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        gap: '200px'
      }}
    >
      <h1>Mini Task Manager</h1>

      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {darkMode ? (
          <>
            <CiLight style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Light
          </>
        ) : (
          <>
            <MdDarkMode style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Dark
          </>
        )}
      </button>
    </header>
  );
}

export default Header;
