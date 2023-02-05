import { createStitches } from "@stitches/react";

export const { styled, keyframes, globalCss } = createStitches({
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
        },
        media: {
            bp1: '(max-width: 1368px)',
            bp2: '(max-width: 1024px)',
            bp3: '(max-width: 900px)',
            bp4: '(max-width: 768px)',
            bp5: '(max-width: 450px)',
            bp6: '(max-width: 375px)',
        }        
    }
})