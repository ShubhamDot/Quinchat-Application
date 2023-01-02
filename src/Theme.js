import React, { useState } from 'react';
import './App.css';

function App() {
  // Declare a state variable for the theme
  const [theme, setTheme] = useState('light');

  // Declare a function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Use the theme to conditionally apply a light or dark class to the body element
  const bodyClass = theme === 'light' ? 'light-theme' : 'dark-theme';

  return (
    <div className="App">
      {/* Add a button to toggle the theme */}
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Apply the body class to the body element */}
      <body className={bodyClass}>
        {/* Add some content that will be styled differently based on the theme */}
        <h1>Welcome to my website!</h1>
        <p>The theme is currently {theme}.</p>
      </body>
    </div>
  );
}

export default App;