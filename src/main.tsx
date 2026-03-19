import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import App from "./App.tsx";
import LoadingScreen from "./components/LoadingScreen.tsx";
import "./index.css";

function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // durasi loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && <App />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);