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

  const realtimeShotsCode = `<QamposerMicro
  adapter={localAdapter()}
  config={{ realtimeShots: 4096 }} // shots per auto-simulation (default: 1024)
/>`;

  const gateApiCode = `const { insertGate, moveGate, removeGate, undo, redo, canUndo, canRedo } = useQamposer();

const id = insertGate({ type: 'H', qubit: 0 }, 0); // insert at column 0, pushing gates right
moveGate(id, { row: 1, column: 2 }); // for CNOT, row is the top-most row`;

  const providerCode = `import { QamposerProvider, QamposerMicro, useQamposer, localAdapter } from '@qamposer/react';

const adapter = localAdapter();

function Toolbar() {
  const { result, resultSource, importQasm, simulate, adapterStatus } = useQamposer();
  return (
    <>
      <button
        disabled={adapterStatus === 'unavailable'}
        onClick={() => {
          importQasm(PUZZLE_QASM);
          simulate(1024); // sees the imported circuit
        }}
      >
        Load & measure
      </button>
      {/* resultSource: 'realtime' (auto-simulation) or 'run' (simulate()) */}
      {result && resultSource === 'run' && <pre>{JSON.stringify(result.counts)}</pre>}
    </>
  );
}

function App() {
  return (
    <QamposerProvider adapter={adapter}>
      <QamposerMicro />
      <Toolbar />
    </QamposerProvider>
  );
}`;

  const eventsCode = `<QamposerProvider
  adapter={localAdapter()}
  onSimulationStart={({ source }) => setLoading(true)}
  onSimulationComplete={({ result, source }) => source === 'run' && save(result)}
  onSimulationError={({ error }) => showToast(error.message)}
  // fires whenever the displayed result changes, including when it is cleared
  onResultChange={({ result, reason }) => setCounts(result?.counts ?? null)}
  // one event per edit: what changed and why
  onCircuitEdit={(event) => {
    // event.action: 'add' | 'move' | 'remove' | 'update' | 'undo' | 'redo' | ...
    // event.origin: 'pointer' | 'keyboard' | 'code' | 'api'
    if (event.action === 'add' && event.origin !== 'api') {
      const gate = event.after.gates.find((g) => g.id === event.gateId);
      if (gate?.type === 'H' && gate.qubit === 0) goToNextStep();
    }
  }}
>
  <QamposerMicro />
</QamposerProvider>`;

  const editingInputs = ["mouse", "touch", "keyboard"];

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
            <p className="section-description">
              {t("localSimulation.realtimeShots")}
            </p>
            <CodeSnippet type="multi" feedback="Copied!">
              {realtimeShotsCode}
            </CodeSnippet>
          </section>

          {/* Editing Gates */}
          <section className="section">
            <h2 className="section-title">{t("editing.title")}</h2>
            <p className="section-description">{t("editing.description")}</p>
            <div className="table-container">
              <Table size="lg" useZebraStyles={false}>
                <TableHead>
                  <TableRow>
                    <TableHeader>{t("editing.columns.input")}</TableHeader>
                    <TableHeader>{t("editing.columns.place")}</TableHeader>
                    <TableHeader>{t("editing.columns.move")}</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editingInputs.map((key) => (
                    <TableRow key={key}>
                      <TableCell>{t(`editing.${key}.name`)}</TableCell>
                      <TableCell>{t(`editing.${key}.place`)}</TableCell>
                      <TableCell>{t(`editing.${key}.move`)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="section-description" style={{ marginTop: "1rem" }}>
              {t("editing.undo")}
            </p>
            <CodeSnippet type="multi" feedback="Copied!">
              {gateApiCode}
            </CodeSnippet>
          </section>

          {/* Controlling from Your App */}
          <section className="section">
            <h2 className="section-title">{t("provider.title")}</h2>
            <p className="section-description">{t("provider.description")}</p>
            <CodeSnippet type="multi" feedback="Copied!">
              {providerCode}
            </CodeSnippet>
            <h3 className="subsection-title">{t("provider.notesTitle")}</h3>
            <ul className="doc-list">
              {tArray("provider.notes").map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </section>

          {/* Events */}
          <section className="section">
            <h2 className="section-title">{t("events.title")}</h2>
            <p className="section-description">{t("events.description")}</p>
            <CodeSnippet type="multi" feedback="Copied!">
              {eventsCode}
            </CodeSnippet>
            <ul className="doc-list">
              {tArray("events.notes").map((note, index) => (
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

          {/* Migrating from 0.2.x */}
          <section className="section">
            <h2 className="section-title">{t("migration.title")}</h2>
            <p className="section-description">{t("migration.description")}</p>
            <ul className="doc-list">
              {tArray("migration.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
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
