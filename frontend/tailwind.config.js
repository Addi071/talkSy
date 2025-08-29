import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,jsx}"],
   theme: {
     extend: {},
   },
   plugins: [daisyui],
   daisyui: {
     themes: ["light", "dark", "cupcake", "bumblebee", "retro","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","procyon","emerald","corporate","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","procyon","emerald","corporate"],
   },
 }