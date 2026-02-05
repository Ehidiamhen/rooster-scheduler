import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    primary: { value: "#5653FC" },
                    orange: { value: "#FF8D28" },
                    grey: { value: "#4E5D69" },
                    blue: { value: "#009FE3" },
                    green: { value: "#38A169" },
                },
            },
            fonts: {
                heading: { value: "var(--font-geist-sans), sans-serif" },
                body: { value: "var(--font-geist-sans), sans-serif" },
            },
        },
    },
})

export const system = createSystem(defaultConfig, customConfig)
