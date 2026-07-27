import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import type { PortfolioData } from '../types/portfolio';

interface FooterProps {
  data: PortfolioData;
}

export function Footer({ data }: FooterProps) {
  return (
    <Box component="footer" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Typography color="text.secondary" variant="body2">
            © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Built with React, TypeScript, Vite and Material UI.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
