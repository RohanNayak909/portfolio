import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import type { PortfolioData } from '../types/portfolio';
import { GitHubSpotlight } from './GitHubSpotlight';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const Section = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(11),
}));

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

interface ContactProps {
  data: PortfolioData;
}

export function Contact({ data }: ContactProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successOpen, setSuccessOpen] = useState(false);

  const validate = (values: FormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (values.subject.trim().length < 3) nextErrors.subject = 'Please add a short subject.';
    if (values.message.trim().length < 20) nextErrors.message = 'Please write at least 20 characters.';
    return nextErrors;
  };

  const isReady = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [
      `Hello Rohan,`,
      '',
      form.message.trim(),
      '',
      `From: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
    ].join('\n');

    const mailto = `mailto:${data.personal.email}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(body)}`;
    setSuccessOpen(true);
    window.location.href = mailto;
  };

  return (
    <Section id="contact" aria-labelledby="contact-title">
      <Container maxWidth="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s discuss the next engineering challenge"
            description="This static portfolio validates your message and then opens your default email application, so no personal form data is stored on a server."
          />
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.2fr) minmax(300px, .8fr)' },
            gap: 2.5,
          }}
        >
          <Reveal>
            <Paper
              component="form"
              onSubmit={handleSubmit}
              noValidate
              elevation={0}
              sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 5, border: '1px solid', borderColor: 'divider' }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                  gap: 2,
                }}
              >
                <TextField
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  required
                  autoComplete="name"
                />
                <TextField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  required
                  autoComplete="email"
                />
                <TextField
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  error={Boolean(errors.subject)}
                  helperText={errors.subject}
                  required
                  sx={{ gridColumn: '1 / -1' }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  error={Boolean(errors.message)}
                  helperText={errors.message ?? `${form.message.length}/20 minimum characters`}
                  required
                  multiline
                  minRows={6}
                  sx={{ gridColumn: '1 / -1' }}
                />
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{
                  mt: 2.5,
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  All fields are required.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendRoundedIcon />}
                  aria-disabled={!isReady}
                >
                  Prepare email
                </Button>
              </Stack>
            </Paper>
          </Reveal>

          <Stack spacing={2.5}>
            <Reveal>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 5, border: '1px solid', borderColor: 'divider' }}
              >
                <Typography variant="h5">Direct contact</Typography>
                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                    <EmailRoundedIcon color="primary" />
                    <Link href={`mailto:${data.personal.email}`} underline="hover">
                      {data.personal.email}
                    </Link>
                  </Stack>
                  <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                    <PhoneRoundedIcon color="primary" />
                    <Link href={`tel:${data.personal.phone.replace(/\s/g, '')}`} underline="hover">
                      {data.personal.phone}
                    </Link>
                  </Stack>
                </Stack>
              </Paper>
            </Reveal>

            <Reveal>
              <GitHubSpotlight
                apiUrl={data.githubApiUrl}
                fallbackAvatar={data.personal.avatarUrl}
              />
            </Reveal>
          </Stack>
        </Box>
      </Container>

      <Snackbar open={successOpen} autoHideDuration={4500} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSuccessOpen(false)}>
          Your email application is opening with the validated message.
        </Alert>
      </Snackbar>
    </Section>
  );
}
