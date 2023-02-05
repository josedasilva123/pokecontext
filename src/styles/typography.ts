import { styled } from "../stitches.config";
import BaseText from "./components/BaseText";

export const StyledText = styled(BaseText, {
   fontFamily: "$primary",
   fontWeight: 400,
   color: "$black",

   variants: {
      font: {
         secondary: {
            fontFamily: "$secondary",
         },
      },
      
      size: {
         one: {
            fontSize: "3rem",
            "@bp1": {
               fontSize: "2.8rem",
            },
            "@bp2": {
               fontSize: "2.5rem",
            },
            "@bp3": {
               fontSize: "2.2rem",
            },
            "@bp4": {
               fontSize: "2rem",
            },
            "@bp5": {
               fontSize: "1.8rem",
            },
         },
         two: {
            fontSize: "2.6rem",
            "@bp1": {
               fontSize: "2.3rem",
            },
            "@bp2": {
               fontSize: "2rem",
            },
            "@bp3": {
               fontSize: "1.8rem",
            },
            "@bp4": {
               fontSize: "1.6rem",
            },
         },
         three: {
            fontSize: "2.6rem",
            "@bp1": {
               fontSize: "2rem",
            },
            "@bp2": {
               fontSize: "1.8rem",
            },
            "@bp3": {
               fontSize: "1.6rem",
            },
            "@bp4": {
               fontSize: "1.4rem",
            },
         },
         four: {
            fontSize: "1.5rem",
            "@bp1": {
               fontSize: "1.4rem",
            },
            "@bp3": {
               fontSize: "1.2rem",
            },
         },
         paragraph: {
            fontSize: "1rem",
         },
         paragraphBig: {
            fontSize: "1.2rem",
         },
         small: {
            fontSize: ".875rem",
         },
      },

      textTrasform: {
         capitalize: {
            textTransform: "capitalize",
         },
         upperCase: {
            textTransform: "uppercase",
         },
      },

      fontWeight: {
         bold: {
            fontWeight: 600,
         },
      },

      color: {
         primary: {
            color: "$primary",
         },
         white: {
            color: "$white",
         },
      },
   },
});
