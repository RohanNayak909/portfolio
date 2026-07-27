import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import TroubleshootRoundedIcon from '@mui/icons-material/TroubleshootRounded';
import type { PortfolioData } from '../types/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const Section = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(11),
  backgroundColor: theme.palette.background.default,
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ValueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 20,
  transition: 'transform 220ms ease, border-color 220ms ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    borderColor: theme.palette.primary.main,
  },
}));

interface AboutProps {
  data: PortfolioData;
}

export function About({ data }: AboutProps) {
  const values = [
    {
      icon: <CodeRoundedIcon color="primary" />,
      title: 'End-to-end engineering',
      text: 'I work across UI, APIs, database logic, deployments and production validation instead of treating each layer in isolation.',
    },
    {
      icon: <TroubleshootRoundedIcon color="primary" />,
      title: 'Production problem solving',
      text: 'I investigate logs, data flows, integration failures and configuration issues to find root causes and stabilize services.',
    },
    {
      icon: <GroupsRoundedIcon color="primary" />,
      title: 'Client and team partnership',
      text: 'I translate business processes into practical solutions and communicate implementation choices, risks and progress clearly.',
    },
  ];

  return (
    <Section id="about" aria-labelledby="about-title">
      <Container maxWidth="lg">
        <Reveal>
          <SectionHeading
            eyebrow="About me"
            title="Practical engineering with business context"
            description="My core strength is Java full-stack development, supported by hands-on delivery across modern web frameworks, databases, Linux environments and cloud services."
          />
        </Reveal>

        <Reveal>
          <StatsGrid sx={{ mb: 3 }}>
            {data.stats.map((stat) => (
              <Paper
                key={stat.label}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}0D)`,
                }}
              >
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 900 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.7, fontWeight: 700 }}>
                  {stat.label}
                </Typography>
              </Paper>
            ))}
          </StatsGrid>
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {values.map((value, index) => (
            <Reveal key={value.title} sx={{ transitionDelay: `${index * 90}ms` }}>
              <ValueCard elevation={0}>
                <Stack spacing={1.3}>
                  {value.icon}
                  <Typography variant="h5">{value.title}</Typography>
                  <Typography color="text.secondary">{value.text}</Typography>
                </Stack>
              </ValueCard>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Section>
  );
}
