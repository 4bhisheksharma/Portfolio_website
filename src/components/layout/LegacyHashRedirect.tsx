import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Redirect legacy HashRouter URLs (/#/gallery) to clean paths for SEO. */
export function LegacyHashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      const path = hash.slice(1);
      navigate(path, { replace: true });
      window.history.replaceState(null, "", path);
    }
  }, [navigate]);

  return null;
}
