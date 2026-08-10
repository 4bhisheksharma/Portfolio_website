import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sectionIds } from "@/data/site";

const KNOWN_ROUTES = new Set(["/", "/gallery"]);

/** Redirect legacy section paths (/about) to home with hash anchors */
export function LegacySectionRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (KNOWN_ROUTES.has(location.pathname)) return;

    const sectionId = location.pathname.replace(/^\//, "");
    if (sectionIds.includes(sectionId as (typeof sectionIds)[number])) {
      navigate("/", { state: { scrollTo: `#${sectionId}` }, replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}
