import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import { Theme } from '@carbon/react';
import { LocaleProvider } from './i18n';
import { ThemeProvider, useTheme, getCarbonTheme } from './theme';
import { Layout } from './components';
import { Home, GettingStarted, Demo } from './pages';

// Handle SPA redirect from 404.html
function RedirectHandler({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = searchParams.get('p');
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [searchParams, navigate]);

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <RedirectHandler>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/demo" element={<Demo />} />
        </Route>
      </Routes>
    </RedirectHandler>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <Theme theme={getCarbonTheme(theme)}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Theme>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </LocaleProvider>
  );
}
