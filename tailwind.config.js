module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#020024',
        },
        fontFamily: {
          nougat: ['nougat', 'sans-serif'],
          lilita: ['lilita', 'sans-serif'],
        },
        fontSize: {
            lg: "9.75rem",
        },
      },
    },
    plugins: [],
  }