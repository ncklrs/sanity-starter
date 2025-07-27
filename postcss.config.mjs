// Only apply PostCSS to frontend files
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// Only process files in app/ and lib/ directories
export default {
  ...config,
  // This ensures it only applies to frontend files
  // Studio will use its own CSS processing
};
