/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  safelist: [
    'text-course-deatails-heading-small',
    'md:text-course-deatails-heading-large'
  ],
  theme: {
    extend: {
      fontSize: {
        'course-deatails-heading-small' : ['26px', '36px'],
        'course-deatails-heading-large' : ['36px', '44px'],
        'home-heading-small' : ['28px', '34px'],
        'home-heading-large' : ['48px', '56px'],
        'defult' : ['15px', '21px']
      },
      gridTemplateColumns: {
        'auto' : 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      spacing: {
        'section-height' : '500px',
      }
    },
  },
  plugins: [],
}
