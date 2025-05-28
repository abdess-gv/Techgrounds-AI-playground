
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PromptEngineering = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Dutch version
    navigate("/prompt-engineering/nl", { replace: true });
  }, [navigate]);

  return null;
};

export default PromptEngineering;
