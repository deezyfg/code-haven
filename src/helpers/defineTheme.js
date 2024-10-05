import { loader } from "@monaco-editor/react";

const monacoThemes = {
  "active4d": "Active4D",
  "all-hallows-eve": "All Hallows Eve",
  "amy": "Amy",
  "birds-of-paradise": "Birds of Paradise",
  "blackboard": "Blackboard",
  "brilliance-black": "Brilliance Black",
  "brilliance-dull": "Brilliance Dull",
  "chrome-devtools": "Chrome DevTools",
  "clouds-midnight": "Clouds Midnight",
  "clouds": "Clouds",
  "cobalt": "Cobalt",
  "cobalt2": "Cobalt2",
  "dawn": "Dawn",
  "dracula": "Dracula",
  "dreamweaver": "Dreamweaver",
  "eiffel": "Eiffel",
  "espresso-libre": "Espresso Libre",
  "github-dark": "GitHub Dark",
  "github-light": "GitHub Light",
  "github": "GitHub",
  "idle": "IDLE",
  "idlefingers": "idleFingers",
  "katzenmilch": "Katzenmilch",
  "krtheme": "krTheme",
  "kuroir-theme": "Kuroir Theme",
  "lazy": "LAZY",
  'magicwb--amiga-': 'MagicWB (Amiga)',
  'merbivore-soft': 'Merbivore Soft',
  'merbivore': 'Merbivore',
  'monokai-bright': 'Monokai Bright',
  'monokai': 'Monokai',
  'monoindustrial': 'monoindustrial',
  'nord': 'Nord',
  'night-owl': 'Night Owl',
  'oceanic-next': 'Oceanic Next',
  'pastels-on-dark': 'Pastels on Dark',
  'slush-and-poppies': 'Slush and Poppies',
  'solarized-dark': 'Solarized-dark',
  'solarized-light': 'Solarized-light',
  'spacecadet': 'SpaceCadet',
  'sunburst': 'Sunburst',
  'textmate--mac-classic-': 'Textmate (Mac Classic)',
  'tomorrow-night-blue': 'Tomorrow-Night-Blue',
  'tomorrow-night-bright': 'Tomorrow-Night-Bright',
  'tomorrow-night-eighties': 'Tomorrow-Night-Eighties',
  'tomorrow-night': 'Tomorrow-Night',
  'tomorrow': 'Tomorrow',
  'twilight': 'Twilight',
  'upstream-sunburst': 'Upstream Sunburst',
  'vibrant-ink': 'Vibrant Ink',
  'xcode-default': 'Xcode_default',
  zenburnesque: 'Zenburnesque',
};

const defineTheme = (theme) => {
    return new Promise((res) => {
        Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
        ]).then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme, themeData);
            res();
        }).catch(error => {
            console.error(`Failed to load theme: ${theme}`, error);
            res();
        });
    });
};

export { defineTheme };
