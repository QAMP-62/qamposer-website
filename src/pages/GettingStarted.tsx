import { useNavigate } from "react-router-dom";
import {
  Grid,
  Column,
  CodeSnippet,
  Button,
  Tile,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { useTranslation } from "../i18n";

export function GettingStarted() {
  const { t, tArray } = useTranslation("getting-started");
  const navigate = useNavigate();

  const installCode = "npm install @qamposer/react";

  const quickStartCode = `import { QamposerMicro, localAdapter } from '@qamposer/react';

function App() {
  return (
    <QamposerMicro
      adapter={localAdapter()}
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
import { localAdapter } from '@qamposer/react';

function App() {
  return (
    <Qamposer
      adapter={localAdapter()}
      defaultTheme="dark"
      showThemeToggle
    />
  );
}`;

  const localAdapterOptionsCode = `import { QamposerMicro, localAdapter } from '@qamposer/react';

<QamposerMicro
  adapter={localAdapter({
    name: 'Browser Simulator', // display name
    maxQubits: 12,             // reject wider circuits
    qsphere: true,             // emit Q-sphere points for 5 qubits or fewer
  })}
/>`;

  const backendSetupCode = `# Clone qamposer-backend
git clone https://github.com/QAMP-62/qamposer-backend.git
cd qamposer-backend

# Install dependencies
poetry install

# Run the server
poetry run uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload`;

  const combinedAdapterCode = `import { Qamposer } from '@qamposer/react/visualization';
import { qiskitAdapter, localAdapter } from '@qamposer/react';

function App() {
  return (
    <Qamposer
      // noisy fake devices, via "Set up and run"
      adapter={qiskitAdapter('http://localhost:8080')}
      // instant ideal results on every edit
      realtimeAdapter={localAdapter()}
    />
  );
}`;

  const noopAdapterCode = `import { QamposerMicro, noopAdapter } from '@qamposer/react';

// No simulation - circuit editor only
<QamposerMicro adapter={noopAdapter} />`;

  const adapters = [
    { key: "local", name: "localAdapter()" },
    { key: "qiskit", name: "qiskitAdapter(url)" },
    { key: "noop", name: "noopAdapter" },
  ];

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

          {/* Real-Time Local Simulation */}
          <section className="section">
            <h2 className="section-title">{t("localSimulation.title")}</h2>
            <p className="section-description">
              {t("localSimulation.description")}
            </p>
            <p className="section-description">{t("localSimulation.options")}</p>
            <CodeSnippet type="multi" feedback="Copied!">
              {localAdapterOptionsCode}
            </CodeSnippet>
            <h3 className="subsection-title">
              {t("localSimulation.notesTitle")}
            </h3>
            <ul className="doc-list">
              {tArray("localSimulation.notes").map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </section>

          {/* Backend Setup */}
          <section className="section">
            <h2 className="section-title">{t("backend.title")}</h2>
            <p className="section-description">{t("backend.description")}</p>
            <h3 className="subsection-title">{t("backend.setup")}</h3>
            <CodeSnippet type="multi" feedback="Copied!">
              {backendSetupCode}
            </CodeSnippet>
            <p className="section-description" style={{ marginTop: "1.5rem" }}>
              {t("backend.combined")}
            </p>
            <CodeSnippet type="multi" feedback="Copied!">
              {combinedAdapterCode}
            </CodeSnippet>
          </section>

          {/* Adapters */}
          <section className="section">
            <h2 className="section-title">{t("adapters.title")}</h2>
            <p className="section-description">{t("adapters.description")}</p>
            <div className="table-container">
              <Table size="lg" useZebraStyles={false}>
                <TableHead>
                  <TableRow>
                    <TableHeader>{t("adapters.columns.adapter")}</TableHeader>
                    <TableHeader>{t("adapters.columns.runsOn")}</TableHeader>
                    <TableHeader>{t("adapters.columns.bestFor")}</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adapters.map(({ key, name }) => (
                    <TableRow key={key}>
                      <TableCell>
                        <code>{name}</code>
                      </TableCell>
                      <TableCell>{t(`adapters.${key}.runsOn`)}</TableCell>
                      <TableCell>{t(`adapters.${key}.bestFor`)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Tile className="info-tile">
              <h4>{t("adapters.editorOnly.title")}</h4>
              <p>{t("adapters.editorOnly.description")}</p>
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
