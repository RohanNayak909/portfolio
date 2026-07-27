import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import type { PortfolioData } from '../types/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const Section = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(11),
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f3f7fb',
}));

interface ExperienceProps {
  data: PortfolioData;
}

export function Experience({ data }: ExperienceProps) {
  return (
    <Section id="experience" aria-labelledby="experience-title">
      <Container maxWidth="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Long-term product and delivery ownership"
            description="I joined Nirmalya Labs during its early journey and have grown with the organization while handling increasingly broad engineering and delivery responsibilities."
          />
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.7fr) minmax(280px, .7fr)' },
            gap: 2.5,
          }}
        >
          <Stack spacing={2.5}>
            {data.experience.map((item) => (
              <Reveal key={`${item.company}-${item.role}`}>
                <Paper
                  elevation={0}
                  sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 5, border: '1px solid', borderColor: 'divider' }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        flexShrink: 0,
                      }}
                    >
                      <BusinessCenterRoundedIcon />
                    </Box>
                    <Box>
                      <Typography variant="h4">{item.role}</Typography>
                      <Typography color="primary.main" sx={{ mt: 0.4, fontWeight: 900 }}>
                        {item.company} · {item.period}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.location}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography color="text.secondary" sx={{ mt: 2.5 }}>
                    {item.summary}
                  </Typography>
                  <List dense sx={{ mt: 1 }}>
                    {item.responsibilities.map((responsibility) => (
                      <ListItem key={responsibility} disableGutters alignItems="flex-start">
                        <ListItemIcon sx={{ minWidth: 30, mt: 0.2 }}>
                          <CheckRoundedIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={responsibility}
                          slotProps={{ primary: { sx: { color: 'text.secondary' } } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Reveal>
            ))}
          </Stack>

          <Reveal>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 5, border: '1px solid', borderColor: 'divider', height: 'fit-content' }}
            >
              <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                <SchoolRoundedIcon color="primary" />
                <Typography variant="h5">Education</Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {data.education.map((education) => (
                <Box key={education.degree}>
                  <Typography sx={{ fontWeight: 900 }}>{education.degree}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    {education.institution}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {education.location}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Reveal>
        </Box>
      </Container>
    </Section>
  );
}
