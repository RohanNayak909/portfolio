import { Box, Chip, Container, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { PortfolioData } from '../types/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const Section = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(11),
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f3f7fb',
}));

const SkillGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const SkillCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.2),
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  height: '100%',
  transition: 'transform 230ms ease, box-shadow 230ms ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 22px 60px rgba(0,0,0,.26)'
        : '0 22px 60px rgba(29,70,112,.12)',
  },
}));

interface SkillsProps {
  data: PortfolioData;
}

export function Skills({ data }: SkillsProps) {
  return (
    <Section id="skills" aria-labelledby="skills-title">
      <Container maxWidth="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Technical toolkit"
            title="Skills used across the delivery lifecycle"
            description="The portfolio keeps Java full-stack engineering at the center while showing the complementary web, cloud, mobile and data technologies I work with."
          />
        </Reveal>

        <SkillGrid>
          {data.skillGroups.map((group, index) => (
            <Reveal key={group.category} sx={{ transitionDelay: `${index * 80}ms` }}>
              <SkillCard elevation={0}>
                <Typography variant="h4">{group.category}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.7, mb: 2.3 }}>
                  {group.summary}
                </Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {group.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      variant="outlined"
                      sx={{
                        fontWeight: 700,
                        transition: 'all 180ms ease',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          borderColor: 'primary.main',
                          color: 'primary.contrastText',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </SkillCard>
            </Reveal>
          ))}
        </SkillGrid>
      </Container>
    </Section>
  );
}
