module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customBlue: '#4182F9',
        customGreen: '#10B981',
        customRed: '#EF4444',
        customCream: '#FCEED5',
        customDarkblue: '#003459', 
        customDarkcream: '#F7DBA7'
        
        
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        geistMono: ["Geist Mono", "monospace"],
        mitr: ["Mitr", "sans-serif"],
      },
      borderRadius: {
        '50px': '50px',
      },
    },
  },
  plugins: [],
}
