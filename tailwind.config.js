/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      "headwind.classRegex": {
        html: "\\bclass\\s*=\\s*[\\\"\\'](https://github.com/heybourn/headwind/blob/master/[_a-zA-Z0-9\\s\\-\\:\\/]+)[\\\"\\']",
        javascriptreact:
          "(?:\\bclassName\\s*=\\s*[\\\"\\'](https://github.com/heybourn/headwind/blob/master/[_a-zA-Z0-9\\s\\-\\:\\/]+)[\\\"\\'])|(?:\\btw\\s*`([_a-zA-Z0-9\\s\\-\\:\\/]*)`)",
      },
    },
  ],
};
