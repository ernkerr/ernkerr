// global styles module
// define rdynamic styles here and then import into react components

//example for primary btn

// export const buttonStyle = (isPrimary) => ({
//   padding: "10px 20px",
//   color: isPrimary ? "white" : "black",
//   background: isPrimary ? "#007BFF" : "transparent",
//   border: `2px solid ${isPrimary ? "#007BFF" : "#ccc"}`,
//   borderRadius: "5px",
//   cursor: "pointer",
// });
// import React from "react";
// import { glowStyle, buttonStyle, containerStyle } from "./styles";

// export default function App({ formData, isPrimary }) {
//   return (
//     <div style={containerStyle}>
//       <button style={glowStyle(formData)}>Glow Button</button>
//       <button style={buttonStyle(isPrimary)}>Styled Button</button>
//     </div>
//   );
// }

// primary btn
export const glowBtn = (formData) => ({
  background: formData?.transparentGlowColor,
  border: `2px solid ${formData?.glowColor}`,
  boxShadow: `inset 0 0 5px ${formData?.glowColor}, 0 0 10px ${formData?.glowColor}, 0 0 15px ${formData?.glowColor}`,
  // if there is a scrim, add a blur behind the background
  ...(formData?.tripBackground?.scrim && {
    backdropFilter: "blur(7.6px)",
    WebkitBackdropFilter: "blur(7.6px)",
  }),
});

// secondary btn
export const secondaryBtn = (formData) => ({
  color: `${formData?.glowColor}`,
  border: `1px solid ${formData?.glowColor}`,
  // boxShadow: `inset 0 0 5px ${formData?.glowColor}, 0 0 10px ${formData?.glowColor}, 0 0 15px ${formData?.glowColor}`,
  // if there is a scrim, add a blur behind the background
  ...(formData?.tripBackground?.scrim && {
    backdropFilter: "blur(7.6px)",
    WebkitBackdropFilter: "blur(7.6px)",
  }),
});

// tertiary btn
export const tertiaryBtn = (formData) => ({
  color: `${formData?.glowColor}`,
  backdropFilter: "blur(7.6px)",
  WebkitBackdropFilter: "blur(7.6px)",
});

export const glowBorder = (formData) => ({
  border: `2px solid ${formData?.glowColor}`,
  boxShadow: `inset 0 0 5px ${formData?.glowColor},
              0 0 12px ${formData?.glowColor},
              inset 0 0 15px ${formData?.glowColor}`,

  ...(formData?.tripBackground?.scrim && {
    backdropFilter: "blur(7.6px)",
    WebkitBackdropFilter: "blur(7.6px)",
  }),
});

// import { glowBtn } from "@styles/styles";

// function Button({ formData, onClick }) {
//   return (
//     <button style={glowBtn(formData)} onClick={onClick}>
//       Glow Button
//     </button>
//   );
// }

//
//
//
//
//
//
//
//
//
//
// background and pointer events
export const formResponseStyle = ({ formData, isPreviewingTrip }) => ({
  background: isPreviewingTrip
    ? formData?.tripBackground?.scrim || "transparent"
    : formData?.tripBackground?.scrim || undefined,
  border: isPreviewingTrip ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
  pointerEvents: isPreviewingTrip ? "none" : "auto",
  // if there is a scrim, add a blur behind the background
  ...(formData?.tripBackground?.scrim && {
    backdropFilter: "blur(7.6px)",
    WebkitBackdropFilter: "blur(7.6px)",
  }),
});
// import { formResponseStyle } from "@styles/styles";
// style={formResponseStyle({ formData, isPreviewingTrip })} // apply dynamic styles

export const formResponseFocusStyle = (formData) => ({
  border: `1px solid ${formData?.glowColor || "var(--main-green)"}`, // Default to green if no glowColor
  outline: "none",
  boxShadow: `0 0 5px ${formData?.glowColor}, 0 0 10px ${formData?.glowColor}, 0 0 15px ${formData?.glowColor}`,
});

// import { formResponseFocusStyle } from "@styles/styles";
// const [isFocused, setIsFocused] = useState(false);
//
//
//
//
//
//
//
//
//

export const modalStyle = (formData) => ({
  backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
  backgroundPosition: "center",
});
