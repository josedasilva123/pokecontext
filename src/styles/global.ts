import { globalCss } from "../stitches.config";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        listStyle: "none",
    }, 
    'button': {
        cursor: 'pointer',
    },
    'a': {
        textDecoration: 'none',
        color: 'unset',
    }
})