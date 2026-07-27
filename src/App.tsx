import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import type { PaletteMode } from '@mui/material';
import type { PortfolioData } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mode, setMode] = useState<PaletteMode>(() => {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolio() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/portfolio.json`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Unable to load portfolio data (${response.status}).`);
        const result = (await response.json()) as PortfolioData;
        setData(result);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setLoadError((error as Error).message);
        }
      }
    }

    void loadPortfolio();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'dark' ? '#20d8f4' : '#007c91' },
          secondary: { main: mode === 'dark' ? '#8d7cff' : '#5b43d6' },
          background: {
            default: mode === 'dark' ? '#07111f' : '#f8fbff',
            paper: mode === 'dark' ? '#0d1929' : '#ffffff',
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          h1: { fontWeight: 950, letterSpacing: '-0.055em', lineHeight: 0.98 },
          h2: { fontWeight: 900, letterSpacing: '-0.035em', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' },
          h3: { fontWeight: 900, letterSpacing: '-0.025em' },
          h4: { fontWeight: 850, letterSpacing: '-0.02em' },
          h5: { fontWeight: 800 },
          button: { textTransform: 'none', fontWeight: 800 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { borderRadius: 12, paddingInline: 20 },
              sizeLarge: { minHeight: 48 },
            },
          },
          MuiTextField: {
            defaultProps: { variant: 'outlined' },
          },
          MuiPaper: {
            styleOverrides: {
              root: { backgroundImage: 'none' },
            },
          },
        },
      }),
    [mode],
  );

  if (loadError) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
          <Alert severity="error" sx={{ maxWidth: 680 }}>
            <Typography sx={{ fontWeight: 900 }}>Portfolio data could not be loaded.</Typography>
            <Typography variant="body2">{loadError}</Typography>
          </Alert>
        </Box>
      </ThemeProvider>
    );
  }

  if (!data) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
          <CircularProgress aria-label="Loading portfolio" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        data={data}
        mode={mode}
        onToggleMode={() => setMode((current) => (current === 'dark' ? 'light' : 'dark'))}
      />
      <Box component="main">
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <Experience data={data} />
        <Contact data={data} />
      </Box>
      <Footer data={data} />
    </ThemeProvider>
  );
}

export default App;
