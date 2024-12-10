import { useEffect, useState, useContext, useRef } from "react";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, glowBtn } from "@styles/styles";

import "./LoginBtn.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginBtn() {
  const { formData, setFormData } = useContext(TripContext);
  const [isShowingStyleOptions, setIsShowingStyleOptions] = useState(false);

  return (
    <>
      <button className="login-btn">Login</button>
    </>
  );
}
