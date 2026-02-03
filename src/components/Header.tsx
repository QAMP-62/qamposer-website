import { useNavigate, useLocation } from 'react-router-dom';
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import { LogoGithub, Language, Light, Asleep } from '@carbon/icons-react';
import { useTranslation } from '../i18n';
import { useTheme } from '../theme';

export function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ja' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <CarbonHeader aria-label="Qamposer">
      <HeaderName href="/" prefix="" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        Qamposer
      </HeaderName>
      <HeaderNavigation aria-label="Navigation">
        <HeaderMenuItem
          href="/"
          isCurrentPage={isActive('/')}
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
        >
          {t('nav.home')}
        </HeaderMenuItem>
        <HeaderMenuItem
          href="/getting-started"
          isCurrentPage={isActive('/getting-started')}
          onClick={(e) => { e.preventDefault(); navigate('/getting-started'); }}
        >
          {t('nav.gettingStarted')}
        </HeaderMenuItem>
        <HeaderMenuItem
          href="/demo"
          isCurrentPage={isActive('/demo')}
          onClick={(e) => { e.preventDefault(); navigate('/demo'); }}
        >
          {t('nav.demo')}
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          onClick={toggleTheme}
          tooltipAlignment="end"
        >
          {theme === 'dark' ? <Light size={20} /> : <Asleep size={20} />}
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label={locale === 'en' ? '日本語' : 'English'}
          onClick={toggleLocale}
          tooltipAlignment="end"
        >
          <Language size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="GitHub"
          onClick={() => window.open('https://github.com/QAMP-62/qamposer-react', '_blank')}
          tooltipAlignment="end"
        >
          <LogoGithub size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
}
