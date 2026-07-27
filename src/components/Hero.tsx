import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import type { PortfolioData } from '../types/portfolio';

const HeroRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: '50%',
    top: -180,
    right: -130,
    background: `radial-gradient(circle, ${theme.palette.primary.main}28 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 430,
    height: 430,
    borderRadius: '50%',
    bottom: -220,
    left: -160,
    background: `radial-gradient(circle, ${theme.palette.secondary.main}22 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
}));

const HeroGrid = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gap: theme.spacing(6),
  alignItems: 'center',
  gridTemplateColumns: 'minmax(0, 1.2fr) minmax(300px, 0.8fr)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    textAlign: 'center',
  },
}));

const PortraitFrame = styled(Paper)(({ theme }) => ({
  position: 'relative',
  maxWidth: 410,
  marginInline: 'auto',
  padding: theme.spacing(2),
  borderRadius: 40,
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}12)`,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 35px 100px rgba(0,0,0,.45)'
    : '0 35px 100px rgba(36,65,93,.16)',
}));

const GradientTitle = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

interface HeroProps {
  data: PortfolioData;
}

export function Hero({ data }: HeroProps) {
  const resumeHref = `${import.meta.env.BASE_URL}${data.personal.resumeUrl}`;

  const goToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroRoot component="section" id="home" aria-labelledby="hero-title">
      <Container maxWidth="lg">
        <HeroGrid>
          <Box>
            <Chip
              label={data.personal.availability}
              color="primary"
              variant="outlined"
              sx={{ mb: 2.5, fontWeight: 800 }}
            />
            <Typography variant="h5" color="text.secondary" fontWeight={700}>
              Hello, I&apos;m {data.personal.name}
            </Typography>
            <GradientTitle
              id="hero-title"
              variant="h1"
              sx={{ mt: 1.2, mb: 2, fontSize: { xs: '3rem', sm: '4rem', lg: '5rem' } }}
            >
              {data.personal.headline}
            </GradientTitle>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: 760, lineHeight: 1.5, mx: { xs: 'auto', md: 0 } }}
            >
              {data.personal.subheadline}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2.4, maxWidth: 720, fontSize: '1.06rem', mx: { xs: 'auto', md: 0 } }}
            >
              {data.personal.summary}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ mt: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={goToContact}
              >
                Let&apos;s connect
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DownloadRoundedIcon />}
                href={resumeHref}
                download
              >
                Download resume
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={0.7}
              alignItems="center"
              sx={{ mt: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <LocationOnRoundedIcon color="primary" fontSize="small" />
              <Typography color="text.secondary" fontWeight={700}>
                {data.personal.location}
              </Typography>
            </Stack>
          </Box>

          <PortraitFrame elevation={0}>
            <Avatar
              src={data.personal.avatarUrl}
              alt={`${data.personal.name} profile photograph`}
              sx={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1 / 1',
                borderRadius: '30px',
                bgcolor: 'primary.dark',
                fontSize: '5rem',
                fontWeight: 900,
              }}
            >
              {data.personal.initials}
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                position: 'absolute',
                left: -24,
                bottom: 30,
                px: 2.2,
                py: 1.3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Core focus
              </Typography>
              <Typography fontWeight={900}>Java · Spring · Web</Typography>
            </Paper>
          </PortraitFrame>
        </HeroGrid>
      </Container>
    </HeroRoot>
  );
}
