import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-magenta': '#601E1E',
        'light-pink': '#F4D3D3',
        'burnt-orange': '#D74712',
        'dusty-rose': '#E46E6D',
        'bubblegum-pink': '#FF6489',
        'barbie-pink': '#FF99B6',
      }
    }

  },
  plugins: [],
}
export default config
