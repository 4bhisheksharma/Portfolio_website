import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sectionIds } from "@/data/site";

const KNOWN_ROUTES = new Set(["/", "/gallery"]);

/**
 * Redirect legacy section paths (e.g. /about, /projects) to home with hash anchors.
 * Unknown routes are allowed to pass through to the 404 page to prevent soft 404 penalties.
 */
export function LegacySectionRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (KNOWN_ROUTES.has(location.pathname)) return;

    const sectionId = location.pathname.replace(/^\//, "");
    if (sectionIds.includes(sectionId as (typeof sectionIds)[number])) {
      navigate("/", { state: { scrollTo: `#${sectionId}` }, replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}
