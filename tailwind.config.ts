import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '991px' },
      md: { min: '992px', max: '1199px' },
      lg: { min: '1200px' },
    },
    extend: {
      colors: {
        text: '#434449',
        gray: '#f1f2f7',
        gray10: '#f1f1f4',
        gray20: '#e4e5e9',
        gray80: '#6f7077',
        indigo: '#3f51b5',
        indigoDarken10: '#364495',
        indigoLighten80: '#b7c1f8',
        yellow: '#ffc107',
        green: '#4caf50',
        danger: '#ef5350',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
export default config
