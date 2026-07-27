import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const AccentLine = styled(Box)(({ theme }) => ({
  width: 68,
  height: 4,
  borderRadius: 999,
  marginTop: theme.spacing(1.5),
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
      <Typography
        variant="overline"
        color="primary.main"
        sx={{ letterSpacing: '0.18em', fontWeight: 800 }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ mt: 0.5 }}>
        {title}
      </Typography>
      <AccentLine />
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, fontSize: { xs: '1rem', md: '1.08rem' } }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
