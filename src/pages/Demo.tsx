import { useState, useEffect, useMemo } from "react";
import { Grid, Column, InlineLoading, Tile, Button } from "@carbon/react";
import { Qamposer } from "@qamposer/react/visualization";
import { qiskitAdapter, localAdapter } from "@qamposer/react";
import { useTranslation } from "../i18n";

// Backend URL - Render.com deployment
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://qamposer-backend.onrender.com";

type ConnectionStatus = "checking" | "connected" | "error";

export function Demo() {
  const { t, tArray } = useTranslation("demo");
  // Backend status only gates "Set up and run" (noisy fake devices), not the
  // editor itself. Ideal simulation runs entirely in the browser.
  const [status, setStatus] = useState<ConnectionStatus>("checking");
  const [checkNonce, setCheckNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const checkBackend = async () => {
      setStatus("checking");
      try {
        const response = await fetch(`${BACKEND_URL}/health`, {
          method: "GET",
          signal: AbortSignal.timeout(60000), // 60s timeout for cold start
        });
        if (!cancelled) {
          setStatus(response.ok ? "connected" : "error");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    checkBackend();
    return () => {
      cancelled = true;
    };
  }, [checkNonce]);

  // Main adapter drives "Set up and run" against the backend (noisy fake
  // devices); the local adapter gives instant ideal results on every edit.
  const adapter = useMemo(() => qiskitAdapter(BACKEND_URL), []);
  const realtimeAdapter = useMemo(() => localAdapter(), []);
  const tips = tArray("tips.items");

  return (
    <div className="demo">
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <h1 className="page-title">{t("title")}</h1>
          <p className="page-description">{t("description")}</p>
        </Column>

        <Column lg={16} md={8} sm={4}>
          {status === "checking" && (
            <Tile className="backend-status backend-status--checking">
              <InlineLoading
                status="active"
                iconDescription="Loading"
                description={t("backend.checking")}
              />
            </Tile>
          )}
          {status === "connected" && (
            <Tile className="backend-status backend-status--ready">
              <p>{t("backend.ready")}</p>
            </Tile>
          )}
          {status === "error" && (
            <Tile className="backend-status backend-status--error">
              <p>{t("backend.error")}</p>
              <Button
                kind="ghost"
                size="sm"
                onClick={() => setCheckNonce((n) => n + 1)}
              >
                {t("error.retry")}
              </Button>
            </Tile>
          )}
        </Column>

        <Column lg={12} md={6} sm={4}>
          <div className="demo-container">
            <Qamposer
              adapter={adapter}
              realtimeAdapter={realtimeAdapter}
              showHeader={true}
              // defaultTheme="dark"
            />
          </div>
        </Column>
        <Column lg={4} md={2} sm={4}>
          <Tile className="tips-tile">
            <h3>{t("tips.title")}</h3>
            <ul>
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
}
