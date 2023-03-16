/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "1px 1px 15px 1px rgba(0, 0, 0, 0.1), -1px -1px 15px 1px rgba(0, 0, 0, 0.1)",
        "4xl":
          "1px 1px 15px 1px rgba(0, 0, 0, 0.2), -1px -1px 15px 1px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        white: "#FFFFFF",
        transparent: "transparent",
        white_transparent: "rgba(255, 255, 255, 0.5)",
        hover: "rgba(0, 0, 0, 0.05)",
        alert: {
          danger: "#ff4444",
          warning: "#ffbb33",
          success: "#00C851",
          info: "#33b5e5",
        },
        bg: {
          pry: "#F0F2F5",
          sec: "#FFFFFF",
          hover: colors.neutral["200"],
        },
        text: {
          pry: "#050505",
          sec: "#65676B",
          disabled: "#BCC0C4",
          header_section: "#4B4C4F",
        },
        icon: {
          pry: colors.neutral["200"],
          sec: "#65676B",
          disabled: "#BCC0C4",
          hover: colors.neutral["300"],
        },
        input: {
          pry: "#FFFFFF",
          sec: "#f1f2f5",
          placeholder: "#65676B",
          disabled: "#BCC0C4",
        },
        btn: {
          pry: "#1B74E4",
          pry_text: "#FFFFFF",
          pry_hover: "#1B64EE",
          pry_press: "#77A7FF",
          sec: "#E4E6EB",
          sec_text: "#050505",
          sec_press: "rgba(0, 0, 0, 0.05)",
          disabled: "#E4E6EB",
          disabled_text: "#BCC0C4",
        },
        border: {
          pry: colors.neutral["200"],
        },
      },
    },
  },
  plugins: [],
};
