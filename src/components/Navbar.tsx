import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import type { PortfolioData } from '../types/portfolio';

const BrandBadge = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 13,
  fontWeight: 900,
  letterSpacing: '-0.04em',
  color: theme.palette.primary.contrastText,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 10px 30px ${theme.palette.primary.main}33`,
}));

interface NavbarProps {
  data: PortfolioData;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}

export function Navbar({ data, mode, onToggleMode }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navigate = (target: string) => {
    setOpen(false);
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'blur(18px)',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(5, 12, 23, 0.78)'
            : 'rgba(248, 251, 255, 0.82)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Stack
            direction="row"
            spacing={1.4}
            onClick={() => navigate('home')}
            sx={{ cursor: 'pointer', mr: 'auto', alignItems: 'center' }}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') navigate('home');
            }}
          >
            <BrandBadge>{data.personal.initials}</BrandBadge>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, lineHeight: 1.05 }}>
                {data.personal.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Full Stack Engineer
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            {data.navigation.map((item) => (
              <Button
                key={item.target}
                color="inherit"
                onClick={() => navigate(item.target)}
                sx={{ fontWeight: 700 }}
              >
                {item.label}
              </Button>
            ))}
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton onClick={onToggleMode} aria-label="Toggle color theme">
                {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}
          >
            <IconButton onClick={onToggleMode} aria-label="Toggle color theme">
              {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
            <IconButton onClick={() => setOpen(true)} aria-label="Open navigation menu">
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, pt: 3 }} role="navigation" aria-label="Mobile navigation">
          <List>
            {data.navigation.map((item) => (
              <ListItemButton key={item.target} onClick={() => navigate(item.target)}>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: 800 } } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
