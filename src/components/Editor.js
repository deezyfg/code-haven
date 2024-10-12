import React, { useState, useEffect, useRef, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { toast } from 'react-hot-toast';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCopy, faTrash, faPlay, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from './LanguageSelector';
import ThemeDropdown from './ThemeDropdown';
import Executor from './Executor';
import { languageOptions } from '../helpers/languages';
import { defineTheme } from '../helpers/defineTheme';
import './Editor.css';

const DEFAULT_LANGUAGE = '63'; // JavaScript
const DEFAULT_THEME = 'vs-dark';
const DEFAULT_CODE = `// This is a simple Hello World program

// Function to greet the user with an emoji
function greet(name) {
    return \`Hello, \${name}! 👋\`;
}

// Change the name to see different greetings
const userName = "World";
console.log(greet(userName));`;

const Editor = ({ roomId, socket, code: initialCode, onChange, onLanguageChange }) => {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [hasRun, setHasRun] = useState(false);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const executorRef = useRef(null);
  const [isDefaultCode, setIsDefaultCode] = useState(true);
  const [isCodeModified, setIsCodeModified] = useState(false);

  useEffect(() => {
    if (!isCodeModified) {
      setCode(initialCode || DEFAULT_CODE);
      setIsDefaultCode(initialCode === DEFAULT_CODE || !initialCode);
    }
  }, [initialCode, isCodeModified]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('selectedTheme', theme);
  }, [theme]);

  useEffect(() => {
    if (!socket) return;

    const handleLanguageChange = (newLang) => {
      setLanguage(newLang.language);
    };

    socket.on('language-change', handleLanguageChange);
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error('An error occurred. Please try again.');
    });

    return () => {
      socket.off('language-change', handleLanguageChange);
      socket.off('error');
    };
  }, [socket]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    editor.focus();
  };

  const debouncedEmit = useCallback(
    debounce((value) => {
      if (socket && socket.connected) {
        socket.emit('code-change', { roomId, code: value });
      }
    }, 300),
    [socket, roomId]
  );

  const handleEditorChange = (value) => {
    setCode(value);
    setIsDefaultCode(false);
    setIsCodeModified(true);
    onChange(value);
    debouncedEmit(value);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage.toString());
    onLanguageChange(newLanguage);
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const languageName = languageOptions.find(lang => lang.id.toString() === newLanguage.toString())?.value || 'javascript';
        monacoRef.current.editor.setModelLanguage(model, languageName);
      }
    }
    socket.emit('language-change', { roomId, language: newLanguage });
  };

  const handleThemeChange = useCallback((selectedTheme) => {
    const themeName = selectedTheme.value || selectedTheme;
    if (themeName !== 'vs-dark' && themeName !== 'light') {
      defineTheme(themeName).then(() => {
        setTheme(themeName);
        if (monacoRef.current) {
          monacoRef.current.editor.setTheme(themeName);
        }
      });
    } else {
      setTheme(themeName);
      if (monacoRef.current) {
        monacoRef.current.editor.setTheme(themeName);
      }
    }
  }, []);

  const handleSaveCode = () => {
    toast.success('Code saved successfully!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Code copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy code.');
    });
  };

  const handleClearCode = () => {
    const newCode = '';
    setCode(newCode);
    setIsDefaultCode(false);
    setIsCodeModified(true);
    onChange(newCode);
    if (hasRun) {
      setOutput('');
      if (executorRef.current) {
        executorRef.current.clearOutput();
      }
      toast.success('Code and output cleared!');
    } else {
      toast.success('Code cleared!');
    }
    setHasRun(false);
    
    if (editorRef.current) {
      editorRef.current.setValue(newCode);
      editorRef.current.getModel().pushEditOperations([], [], () => null);
    }

    requestAnimationFrame(() => {
      if (editorRef.current) {
        editorRef.current.layout();
        editorRef.current.focus();
      }
    });
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setHasRun(true);
    if (executorRef.current) {
      executorRef.current.handleCompile();
    }
  };

  const currentLanguage = languageOptions.find(lang => lang.id.toString() === language.toString());

  return (
    <div className="editor-container">
      <div className="editor-top-bar">
        <div className="editor-dropdowns">
          <LanguageSelector 
            value={currentLanguage}
            onChange={handleLanguageChange} 
          />
          <ThemeDropdown 
            theme={theme} 
            handleThemeChange={handleThemeChange} 
            defaultTheme={DEFAULT_THEME}
          />
        </div>
        <div className="editor-buttons">
          <button onClick={() => editorRef.current.trigger('keyboard', 'undo', null)} className="editor-btn undo-btn">
            <FontAwesomeIcon icon={faUndo} />
            <span className="ml-2">Undo</span>
          </button>
          <button onClick={() => editorRef.current.trigger('keyboard', 'redo', null)} className="editor-btn redo-btn">
            <FontAwesomeIcon icon={faRedo} />
            <span className="ml-2">Redo</span>
          </button>
          <button onClick={handleClearCode} className="editor-btn clear-btn">
            <FontAwesomeIcon icon={faTrash} />
            <span className="ml-2">Clear</span>
          </button>
          <button onClick={handleCopyCode} className="editor-btn copy-btn">
            <FontAwesomeIcon icon={faCopy} />
            <span className="ml-2">Copy</span>
          </button>
          <button onClick={handleRunCode} className="editor-btn run-btn" disabled={isRunning}>
            <FontAwesomeIcon icon={faPlay} />
            <span className="ml-2">{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          <button onClick={handleSaveCode} className="editor-btn save-btn">
            <FontAwesomeIcon icon={faSave} />
            <span className="ml-2">Save</span>
          </button>
        </div>
      </div>
      <div className="editor-wrapper">
        <MonacoEditor
          height="70%"
          language={currentLanguage ? currentLanguage.value : 'javascript'}
          theme={theme}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            contextmenu: true,
            lineNumbers: 'on',
            folding: true,
            renderWhitespace: 'all',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
          }}
        />
        <Executor
          ref={executorRef}
          code={code}
          language={currentLanguage ? currentLanguage.id : DEFAULT_LANGUAGE}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          setOutput={setOutput}
        />
      </div>
    </div>
  );
};

export default Editor;
