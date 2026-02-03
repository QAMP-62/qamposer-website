import { useNavigate } from "react-router-dom";
import { Grid, Column, CodeSnippet, Button, Tile } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { useTranslation } from "../i18n";

export function GettingStarted() {
  const { t } = useTranslation("getting-started");
  const navigate = useNavigate();

  const installCode = "npm install @qamposer/react";

  const quickStartCode = `import { QamposerMicro, qiskitAdapter } from '@qamposer/react';

function App() {
  return (
    <QamposerMicro
      adapter={qiskitAdapter('http://localhost:8080')}
      onSimulationComplete={(event) => {
        console.log('Result:', event.result);
        console.log('QASM:', event.qasm);
      }}
    />
  );
}`;

  const plotlyInstallCode =
    "npm install plotly.js-basic-dist-min react-plotly.js";

  const fullVersionCode = `import { Qamposer } from '@qamposer/react/visualization';
import { qiskitAdapter } from '@qamposer/react';

function App() {
  return (
    <Qamposer
      adapter={qiskitAdapter('http://localhost:8080')}
      defaultTheme="dark"
      showThemeToggle
    />
  );
}`;

  const backendSetupCode = `# Clone qamposer-backend
git clone https://github.com/QAMP-62/qamposer-backend.git
cd qamposer-backend

# Install dependencies
poetry install

# Run the server
poetry run uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload`;

  const noopAdapterCode = `import { QamposerMicro, noopAdapter } from '@qamposer/react';

// No backend required - simulation is disabled
<QamposerMicro adapter={noopAdapter} />`;

  return (
    <div className="getting-started">
      <Grid>
        <Column lg={12} md={8} sm={4}>
          <h1 className="page-title">{t("title")}</h1>

          {/* Installation */}
          <section className="section">
            <h2 className="section-title">{t("installation.title")}</h2>
            <p className="section-description">
              {t("installation.description")}
            </p>
            <CodeSnippet type="single" feedback="Copied!">
              {installCode}
            </CodeSnippet>
          </section>

          {/* Quick Start */}
          <section className="section">
            <h2 className="section-title">{t("quickStart.title")}</h2>
            <p className="section-description">{t("quickStart.description")}</p>
            <CodeSnippet type="multi" feedback="Copied!">
              {quickStartCode}
            </CodeSnippet>
          </section>

          {/* Full Version */}
          <section className="section">
            <h2 className="section-title">{t("fullVersion.title")}</h2>
            <p className="section-description">
              {t("fullVersion.description")}
            </p>
            <CodeSnippet type="single" feedback="Copied!">
              {plotlyInstallCode}
            </CodeSnippet>
            <p className="section-description" style={{ marginTop: "1rem" }}>
              {t("fullVersion.usage")}
            </p>
            <CodeSnippet type="multi" feedback="Copied!">
              {fullVersionCode}
            </CodeSnippet>
          </section>

          {/* Backend Setup */}
          <section className="section">
            <h2 className="section-title">{t("backend.title")}</h2>
            <p className="section-description">{t("backend.description")}</p>
            <h3 className="subsection-title">{t("backend.setup")}</h3>
            <CodeSnippet type="multi" feedback="Copied!">
              {backendSetupCode}
            </CodeSnippet>

            <Tile className="info-tile">
              <h4>{t("backend.editorOnly.title")}</h4>
              <p>{t("backend.editorOnly.description")}</p>
              <CodeSnippet type="multi" feedback="Copied!">
                {noopAdapterCode}
              </CodeSnippet>
            </Tile>
          </section>

          {/* Next Steps */}
          <section className="section">
            <h2 className="section-title">{t("nextSteps.title")}</h2>
            <div className="next-steps">
              <Button
                kind="primary"
                renderIcon={ArrowRight}
                onClick={() => navigate("/demo")}
              >
                {t("nextSteps.tryDemo")}
              </Button>
              <Button
                kind="tertiary"
                href="https://github.com/QAMP-62/qamposer-usecases"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("nextSteps.viewExamples")}
              </Button>
            </div>
          </section>
        </Column>
      </Grid>
    </div>
  );
}
