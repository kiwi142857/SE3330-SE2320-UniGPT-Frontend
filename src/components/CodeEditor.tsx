import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import '../css/BotEditPage.css';

function CodeEditor({code, setCode}: {code: string, setCode: (newValue: string) => void}) {
    
    const onChange = (newValue: string) => {
        setCode(newValue);
    }

    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        automaticLayout: true,
        theme: 'vs',
        fontSize: 16,
        lineHeight: 24,
        minimap: {
            enabled: false
        }
    };

    return (
        <MonacoEditor
            width="100%"
            height="250px"
            language="python"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={onChange}
        />
    );
}

export default CodeEditor;