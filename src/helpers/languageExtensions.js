import { languageOptions } from './languages';

const languageExtensions = {
  javascript: 'js',
  assembly: 'asm',
  bash: 'sh',
  basic: 'bas',
  c: 'c',
  cpp: 'cpp',
  clojure: 'clj',
  csharp: 'cs',
  cobol: 'cob',
  lisp: 'lisp',
  d: 'd',
  elixir: 'ex',
  erlang: 'erl',
  exe: 'exe',
  fsharp: 'fs',
  fortran: 'f',
  go: 'go',
  groovy: 'groovy',
  haskell: 'hs',
  java: 'java',
  kotlin: 'kt',
  lua: 'lua',
  objectivec: 'm',
  ocaml: 'ml',
  octave: 'm',
  pascal: 'pas',
  perl: 'pl',
  php: 'php',
  text: 'txt',
  prolog: 'pl',
  python: 'py',
  r: 'r',
  ruby: 'rb',
  rust: 'rs',
  scala: 'scala',
  sql: 'sql',
  swift: 'swift',
  typescript: 'ts',
  vbnet: 'vb'
};

export const getFileExtension = (languageId) => {
  const language = languageOptions.find(lang => lang.id.toString() === languageId.toString());
  return languageExtensions[language?.value] || 'txt';
};

export const updateFileName = (currentName, newLanguageId) => {
  const newExtension = getFileExtension(newLanguageId);
  if (currentName === 'untitled.js') {
    return `untitled.${newExtension}`;
  }
  const nameParts = currentName.split('.');
  if (nameParts.length > 1) {
    nameParts[nameParts.length - 1] = newExtension;
  } else {
    nameParts.push(newExtension);
  }
  return nameParts.join('.');
};
