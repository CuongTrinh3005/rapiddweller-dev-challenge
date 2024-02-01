import React from 'react';
import Select from 'react-select';
import './style.css';
 
const LanguageMenu = ({ userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "py", label: "Python" },
        { value: "java", label: "Java" },
        { value: "kt", label: "Kotlin" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
    return (
        <div className="menu-bar">
            <h1>DEV CHALLENGE IS AWESOME</h1>
            <Select options={languages} value={userLang}
                onChange={(e) => setUserLang(e.value)}
                placeholder={userLang} />
            <Select options={themes} value={userTheme}
                onChange={(e) => setUserTheme(e.value)}
                placeholder={userTheme} />
            <label>Font Size</label>
            <input type="range" min="18" max="30"
                value={fontSize} step="2"
                onChange={(e) => { setFontSize(e.target.value) }} />
        </div>
    )
}
 
export default LanguageMenu