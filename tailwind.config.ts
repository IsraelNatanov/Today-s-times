import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        ss: "0px 0px 12px 0px #0000001A", 
        inputShadow: "0px 4px 20px 0px #0000000D",
        mm: "0px 0px 4px 0px #0000001A"


      },
      margin:{
        center: "0 auto"
      }
    },
  },
  plugins: [],
}
export default config
