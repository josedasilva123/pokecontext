import { styled } from "../stitches.config";
import BaseText from "./components/BaseText";

export const StyledText = styled(BaseText, {
    fontFamily: '$primary',
    fontWeight: 400,
    color: '$black',   

    variants: {
        font: {
            secondary: {
                fontFamily: '$secondary'
            }
        },

        size: {
            one: {
                fontSize: '3rem',
            },
            two: {
                fontSize: '2.6rem',
            },
            three: {
                fontSize: '2rem',
            },
            four: {
                fontSize: '1.5rem',
            },
            paragraph: {
                fontSize: '1rem',
            },
            paragraphBig: {
                fontSize: '1.2rem',
            },
            small: {
                fontSize: '.875rem',
            }
        },

        textTrasform: {
            capitalize: {
                textTransform: 'capitalize',
            },
            upperCase: {
                textTransform: 'uppercase',
            }    
        },

        fontWeight: {
            bold: {
                fontWeight: 600,
            }
        },

        color: {
            primary: {
                color: '$primary',
            },
            white: {
                color: '$white',
            }
        },
    }    
})