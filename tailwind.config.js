// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,tsx,jsx}",
    "./app/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4500", // Reddit orange-red
        background: "#ffffff",
        muted: "#f9fafb",
      },
    },
  },
  plugins: [],
};
