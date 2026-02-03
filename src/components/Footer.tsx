import { Grid, Column, Link } from '@carbon/react';
import { LogoGithub } from '@carbon/icons-react';
import { useTranslation } from '../i18n';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="footer__content">
            <div className="footer__links">
              <Link
                href="https://github.com/QAMP-62/qamposer-react"
                target="_blank"
                rel="noopener noreferrer"
                renderIcon={LogoGithub}
              >
                {t('footer.github')}
              </Link>
              <Link
                href="https://www.npmjs.com/package/@qamposer/react"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.npm')}
              </Link>
            </div>
            <p className="footer__license">{t('footer.license')}</p>
          </div>
        </Column>
      </Grid>
    </footer>
  );
}
