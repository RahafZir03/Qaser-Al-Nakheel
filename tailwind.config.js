import rtl from 'tailwindcss-rtl';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Login': "url('/assets/images/Login-background.png')",
        'about-back': "url('/WhatsApp Image 2024-11-26 at 8.27.36 PM (1).jpeg')",
        'about-statistics':"url('/de1.jpeg')"
      },
      boxShadow: {
        'inner-shadow': 'inset 0px 0px 24px 13px rgba(50,255,255,0.3)',
        'out-shadow': '0px 0px 34px 13px rgba(50,255,255,0.3)',
      },
      colors: {
        'my-color': '#212121',
        'admin-color': '#191c24',
        'sec-color': {
          100: '#de8e16',
          200: '#ffae42',
        },
        'back-color': '#1c1c1f'

      },
    },
    screens: {
      'mobile': '320px',
      'xmobile': '350px',
      '2xmobile': '520px',
      'md': '640px',
      '2md': '820px',
      'slg': '950px',
      'lg': '1024px',
      'sxl': '1140px',
      'xl': '1300px',
    },
  },
  plugins: [
    rtl
  ],
}
