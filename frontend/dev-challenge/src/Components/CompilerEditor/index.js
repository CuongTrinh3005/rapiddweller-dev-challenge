import { useState } from 'react';
import Editor from "@monaco-editor/react";
import Axios from 'axios';
import { PuffLoader } from 'react-spinners';

import LanguageMenu from '../Menu/index';
import './style.css';

const CompilerEditor = () => {
    const [userCode, setUserCode] = useState(``);
    const [userLang, setUserLang] = useState("java");
    const [userTheme, setUserTheme] = useState("vs-light");
    const [fontSize, setFontSize] = useState(16);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const options = {
        fontSize: fontSize
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);
        if (userCode === ``) {
            return;
        }

        // Post request to compile endpoint
        Axios.post(`http://localhost:8080/api/v1/execute`, {
            code: userCode,
            language: userLang,
            input: userInput
        }).then((res) => {
            let result = res.data.output;
            if (result) {
                setUserOutput(res.data.output);
            }
            else {
                setUserOutput(res.data.error);
            }
        }).then(() => {
            setLoading(false);
        })
    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div className="compiler">
            <LanguageMenu
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div className="main">
                <div className="left-container">
                    <Editor
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultLanguage="java"
                        defaultValue="// Enter your code here"
                        onChange={(value) => { setUserCode(value) }}
                    />
                    <button className="run-btn" onClick={() => compile()}>
                        Run
                    </button>
                </div>
                <div className="right-container">
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea id="code-inp" onChange=
                            {(e) => setUserInput(e.target.value)}>
                        </textarea>
                    </div>
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                            <PuffLoader loading={loading} color='yellow' />
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={() => { clearOutput() }}
                                className="clear-btn">
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CompilerEditor;