import { useNavigate } from "react-router-dom";
import { Grid, Column, Button, Tile } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { useTranslation } from "../i18n";

export function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const features = [
    { key: "openSource", icon: "🔓" },
    { key: "embeddable", icon: "🧩" },
    { key: "noisySimulator", icon: "🔊" },
    { key: "deployable", icon: "🚀" },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Grid>
          <Column lg={8} md={6} sm={4}>
            <h1 className="hero__title">{t("hero.title")}</h1>
            <p className="hero__subtitle">{t("hero.subtitle")}</p>
            <div className="hero__actions">
              <Button
                kind="primary"
                size="lg"
                renderIcon={ArrowRight}
                onClick={() => navigate("/demo")}
              >
                {t("hero.tryDemo")}
              </Button>
              <Button
                kind="tertiary"
                size="lg"
                onClick={() => navigate("/getting-started")}
              >
                {t("hero.getStarted")}
              </Button>
            </div>
          </Column>
          <Column lg={8} md={6} sm={4} className="hero__visual">
            <div className="hero__image-container">
              <img
                src="https://raw.githubusercontent.com/QAMP-62/qamposer-react/main/docs/gif/qamposer.gif"
                alt="Qamposer Demo"
                className="hero__image"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* Features Section */}
      <section className="features">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h2 className="section-title">{t("features.title")}</h2>
          </Column>
          {features.map((feature) => (
            <Column key={feature.key} lg={4} md={4} sm={4}>
              <Tile className="feature-tile">
                <span className="feature-tile__icon">{feature.icon}</span>
                <h3 className="feature-tile__title">
                  {t(`features.items.${feature.key}.title`)}
                </h3>
                <p className="feature-tile__description">
                  {t(`features.items.${feature.key}.description`)}
                </p>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h2 className="section-title">{t("useCases.title")}</h2>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <Tile className="use-case-tile">
              <h3 className="use-case-tile__title">
                {t("useCases.education.title")}
              </h3>
              <p className="use-case-tile__description">
                {t("useCases.education.description")}
              </p>
              <img
                src="https://raw.githubusercontent.com/QAMP-62/qamposer-react/main/docs/gif/education.gif"
                alt="Education Platform"
                className="use-case-tile__image"
              />
            </Tile>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <Tile className="use-case-tile">
              <h3 className="use-case-tile__title">
                {t("useCases.gaming.title")}
              </h3>
              <p className="use-case-tile__description">
                {t("useCases.gaming.description")}
              </p>
              <img
                src="https://raw.githubusercontent.com/QAMP-62/qamposer-react/main/docs/gif/gaming.gif"
                alt="Gaming"
                className="use-case-tile__image"
              />
            </Tile>
          </Column>
          <Column lg={16} md={8} sm={4}>
            <Button
              kind="tertiary"
              href="https://github.com/QAMP-62/qamposer-usecases"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("useCases.viewMore")}
            </Button>
          </Column>
        </Grid>
      </section>
    </div>
  );
}
