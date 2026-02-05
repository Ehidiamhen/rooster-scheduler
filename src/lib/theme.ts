import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    primary: { value: "#5653FC" },
                    primaryLight: { value: "#EBEBFF" },
                    orange: { value: "#FF8D28" },
                    grey: { value: "#4E5D69" },
                    blue: { value: "#009FE3" },
                    green: { value: "#38A169" },
                },
                grid: {
                    border: { value: "#E2E4E9" },
                    headerBg: { value: "#F3F5F7" },
                    outline: { value: "#D9E5F2" },
                },
                neutral: {
                    grey: { value: "#4E5D69" },
                    subtle: { value: "#7E919F" },
                    text: { value: "#5D636F" },
                    light: { value: "#F0F5FA" },
                    black: { value: "#242424" },
                },
                shift: {
                    orangeBg: { value: "#FDF5F0" },
                    orangeBorder: { value: "#E35F00" },
                    greenBg: { value: "#F1FBF4" },
                    greenBorder: { value: "#19C34C" },
                    yellowBg: { value: "#F9F9F1" },
                    yellowBorder: { value: "#A19712" },
                },
            },
            fonts: {
                heading: { value: "var(--font-manrope), var(--font-geist-sans), sans-serif" },
                body: { value: "var(--font-manrope), var(--font-geist-sans), sans-serif" },
            },
        },
    },
})

export const system = createSystem(defaultConfig, customConfig)
