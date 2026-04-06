export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#10151f',
        panel: '#111a28',
        accent: '#4f9eff',
        accent2: '#8d5cff',
        success: '#3ee8b8',
        warning: '#f1c40f',
        danger: '#ff5d76'
      },
      boxShadow: {
        soft: '0 20px 50px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};
