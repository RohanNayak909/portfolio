import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import type { PortfolioData } from '../types/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const Section = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(11),
}));

const ProjectGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ProjectCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: 26,
  border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
  boxShadow: active
    ? `0 24px 70px ${theme.palette.primary.main}1F`
    : 'none',
  transform: active ? 'translateY(-8px)' : 'translateY(0)',
  transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
}));

interface ProjectsProps {
  data: PortfolioData;
}

export function Projects({ data }: ProjectsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Section id="projects" aria-labelledby="projects-title">
      <Container maxWidth="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that demonstrate cross-layer ownership"
            description="The applications below reflect my experience across requirements, user interfaces, backend services, data processing, deployment and production support."
          />
        </Reveal>

        <ProjectGrid>
          {data.projects.map((project, index) => (
            <Reveal key={project.name} sx={{ transitionDelay: `${index * 90}ms` }}>
              <ProjectCard
                active={hovered === project.name}
                elevation={0}
                onMouseEnter={() => setHovered(project.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="overline" color="primary.main" sx={{ fontWeight: 900 }}>
                    Project {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 0.8 }}>
                    {project.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                    {project.description}
                  </Typography>

                  <List dense disablePadding sx={{ mt: 2 }}>
                    {project.highlights.map((highlight) => (
                      <ListItem key={highlight} disableGutters alignItems="flex-start">
                        <ListItemIcon sx={{ minWidth: 30, mt: 0.3 }}>
                          <CheckCircleRoundedIcon color="primary" sx={{ fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={highlight}
                          slotProps={{ primary: { variant: 'body2', sx: { color: 'text.secondary' } } }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Stack direction="row" sx={{ mt: 2, flexWrap: 'wrap', gap: 0.8 }}>
                    {project.technologies.map((technology) => (
                      <Chip key={technology} label={technology} size="small" />
                    ))}
                  </Stack>
                </CardContent>

                {project.link && (
                  <CardActions sx={{ px: 3, pb: 3 }}>
                    <Button
                      href={project.link}
                      endIcon={<ArrowOutwardRoundedIcon />}
                      aria-label={`${project.linkLabel ?? 'Open'}: ${project.name}`}
                    >
                      {project.linkLabel ?? 'Open project'}
                    </Button>
                  </CardActions>
                )}
              </ProjectCard>
            </Reveal>
          ))}
        </ProjectGrid>
      </Container>
    </Section>
  );
}
