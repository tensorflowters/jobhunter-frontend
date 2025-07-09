import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",   // 12px
          small: "0.875rem", // 14px
          medium: "0.9375rem", // 15px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "6px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        dark: {
          colors: {
            "background": {
              "DEFAULT": "#09090b"
            },
            "content1": {
              "DEFAULT": "#18181b",
              "foreground": "#fafafa"
            },
            "content2": {
              "DEFAULT": "#27272a",
              "foreground": "#f4f4f5"
            },
            "content3": {
              "DEFAULT": "#3f3f46",
              "foreground": "#e4e4e7"
            },
            "content4": {
              "DEFAULT": "#52525b",
              "foreground": "#d4d4d8"
            },
            "divider": {
              "DEFAULT": "rgba(255, 255, 255, 0.12)"
            },
            "focus": {
              "DEFAULT": "#0ea5e9"
            },
            "foreground": {
              "50": "#18181b",
              "100": "#27272a",
              "200": "#3f3f46",
              "300": "#52525b",
              "400": "#71717a",
              "500": "#a1a1aa",
              "600": "#d4d4d8",
              "700": "#e4e4e7",
              "800": "#f4f4f5",
              "900": "#fafafa",
              "DEFAULT": "#fafafa"
            },
            "overlay": {
              "DEFAULT": "#000000"
            },
            "danger": {
              "50": "#2d0709",
              "100": "#5a0f13",
              "200": "#88161d",
              "300": "#b51d26",
              "400": "#e32430",
              "500": "#e95059",
              "600": "#ef7c82",
              "700": "#f5a7ac",
              "800": "#fad3d5",
              "900": "#fce9ea",
              "DEFAULT": "#e32430",
              "foreground": "#ffffff"
            },
            "default": {
              "50": "#18181b",
              "100": "#27272a",
              "200": "#3f3f46",
              "300": "#52525b",
              "400": "#71717a",
              "500": "#a1a1aa",
              "600": "#d4d4d8",
              "700": "#e4e4e7",
              "800": "#f4f4f5",
              "900": "#fafafa",
              "DEFAULT": "#3f3f46",
              "foreground": "#fff"
            },
            "primary": {
              "50": "#052e38",
              "100": "#095c71",
              "200": "#0e8aa9",
              "300": "#12b8e2",
              "400": "#0ea5e9",
              "500": "#38b7f3",
              "600": "#75caf6",
              "700": "#9edaf9",
              "800": "#c7eafc",
              "900": "#e3f5fe",
              "DEFAULT": "#0ea5e9",
              "foreground": "#fff"
            },
            "secondary": {
              "50": "#1f0a37",
              "100": "#3e146e",
              "200": "#5d1fa5",
              "300": "#7c29dc",
              "400": "#9333ea",
              "500": "#a85cf0",
              "600": "#be85f4",
              "700": "#d3aef8",
              "800": "#e9d6fb",
              "900": "#f4ebfd",
              "DEFAULT": "#9333ea",
              "foreground": "#fff"
            },
            "success": {
              "50": "#052814",
              "100": "#095028",
              "200": "#0e793c",
              "300": "#12a150",
              "400": "#16c95f",
              "500": "#45d483",
              "600": "#74dfa2",
              "700": "#a2e9c1",
              "800": "#d1f4e0",
              "900": "#e8faf0",
              "DEFAULT": "#16c95f",
              "foreground": "#000"
            },
            "warning": {
              "50": "#312107",
              "100": "#62420e",
              "200": "#936316",
              "300": "#c4841d",
              "400": "#f5a524",
              "500": "#f7b750",
              "600": "#f9c97c",
              "700": "#fbdba7",
              "800": "#fdedd3",
              "900": "#fefce8",
              "DEFAULT": "#f5a524",
              "foreground": "#000"
            }
          }
        }
      }
    })
  ]
}
