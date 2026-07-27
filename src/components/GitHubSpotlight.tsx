import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import type { GitHubProfile } from '../types/portfolio';

interface GitHubSpotlightProps {
  apiUrl: string;
  fallbackAvatar: string;
}

export function GitHubSpotlight({ apiUrl, fallbackAvatar }: GitHubSpotlightProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch(apiUrl, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        const result = (await response.json()) as GitHubProfile;
        setProfile(result);
      } catch (requestError) {
        if ((requestError as Error).name !== 'AbortError') setError(true);
      } finally {
        setLoading(false);
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, [apiUrl]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        border: '1px solid',
        borderColor: 'divider',
        minHeight: 220,
        display: 'grid',
        placeItems: loading ? 'center' : 'stretch',
      }}
    >
      {loading && <CircularProgress aria-label="Loading GitHub profile" />}

      {!loading && profile && (
        <Stack spacing={2.2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar src={profile.avatar_url || fallbackAvatar} alt="GitHub profile" sx={{ width: 58, height: 58 }} />
            <Box>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <GitHubIcon />
                <Typography variant="h5">GitHub</Typography>
              </Stack>
              <Typography color="text.secondary">@{profile.login}</Typography>
            </Box>
          </Stack>

          {profile.bio && <Typography color="text.secondary">{profile.bio}</Typography>}

          <Stack direction="row" spacing={3}>
            <Box>
              <Typography variant="h5" color="primary.main">{profile.public_repos}</Typography>
              <Typography variant="caption" color="text.secondary">Public repositories</Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="primary.main">{profile.followers}</Typography>
              <Typography variant="caption" color="text.secondary">Followers</Typography>
            </Box>
          </Stack>

          <Button
            variant="outlined"
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            endIcon={<ArrowOutwardRoundedIcon />}
          >
            View GitHub profile
          </Button>
        </Stack>
      )}

      {!loading && error && !profile && (
        <Stack spacing={1.5} alignItems="flex-start">
          <GitHubIcon color="primary" />
          <Typography variant="h5">GitHub profile</Typography>
          <Typography color="text.secondary">
            Live GitHub statistics could not be loaded. The rest of the portfolio remains available.
          </Typography>
        </Stack>
      )}
    </Paper>
  );
}
