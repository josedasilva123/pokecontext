import { createStitches } from "@stitches/react";

export const { styled, keyframes } = createStitches({
    theme: {
        colors: {
            primary: '#ee6b2f',
            gray2: '#DEDEDE',
            gray1: '#FAFAFA',
            white: '#ffffff',
            black: '#000000',
        },
        fonts: {
            primary: 'Roboto',
            secondary: 'Poppins'
        }        
    }
})