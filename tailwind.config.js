module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#121C4E',
      },
      keyframes: {
        flash: {
          '25%, 40%': { opacity: '0' },
          '50%': { opacity: '1' },
          '75%': { opacity: '0' },
        },

        fadeIn: {
          '0%, 50%': {
            opacity: '0',
            // transform: 'scale(0.8);',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            // transform: 'scale(1);',
            transform: 'translateY(0)',
          },
        },
        fadeIn2: {
          '0%, 60%': {
            opacity: '0',
            // transform: 'scale(0.8);',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            // transform: 'scale(1);',
            transform: 'translateY(0)',
          },
        },
        fadeIn3: {
          '0%, 70%': {
            opacity: '0',
            // transform: 'scale(0.8);',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            // transform: 'scale(1);',
            transform: 'translateY(0)',
          },
        },
      },

      animation: {
        //   fadeIn: 'fadeIn 2s ease-in',
        flashing: 'flash 2s infinite',
        fadeIn: 'fadeIn 2s ease-in',
      },
    },
  },
}

// initial="hidden"
// animate="visible"
// variants={{
//   hidden: {
//     scale: 0.8,
//     opacity: 0,
//     translateY: 100,
//   },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     translateY: 0,
//     transition: {
//       delay: 0.2,
//       duration: 1,
//     },
//   },
// }}
