import { useState, useEffect } from "react";
import { Grid, Column, InlineLoading, Tile } from "@carbon/react";
import { Qamposer } from "@qamposer/react/visualization";
import { qiskitAdapter } from "@qamposer/react";
import { useTranslation } from "../i18n";

// Backend URL - Render.com deployment
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://qamposer-backend.onrender.com";

type ConnectionStatus = "checking" | "connected" | "error";

export function Demo() {
  const { t, tArray } = useTranslation("demo");
  const [status, setStatus] = useState<ConnectionStatus>("checking");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/health`, {
          method: "GET",
          signal: AbortSignal.timeout(60000), // 60s timeout for cold start
        });
        if (response.ok) {
          setStatus("connected");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    checkBackend();
  }, []);

  const adapter = qiskitAdapter(BACKEND_URL);
  const tips = tArray("tips.items");

  return (
    <div className="demo">
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <h1 className="page-title">{t("title")}</h1>
          <p className="page-description">{t("description")}</p>
        </Column>

        {status === "checking" && (
          <Column lg={16} md={8} sm={4}>
            <Tile className="loading-tile">
              <InlineLoading
                status="active"
                iconDescription="Loading"
                description={t("loading.title")}
              />
              <p className="loading-description">{t("loading.description")}</p>
            </Tile>
          </Column>
        )}

        {status === "error" && (
          <Column lg={16} md={8} sm={4}>
            <Tile className="error-tile">
              <h3>{t("error.title")}</h3>
              <p>{t("error.description")}</p>
            </Tile>
          </Column>
        )}

        {status === "connected" && (
          <>
            <Column lg={12} md={6} sm={4}>
              <div className="demo-container">
                <Qamposer
                  adapter={adapter}
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
          </>
        )}
      </Grid>
    </div>
  );
}
