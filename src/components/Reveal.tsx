import type { PropsWithChildren } from 'react';
import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useReveal } from '../hooks/useReveal';

const AnimatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'visible',
})<{ visible: boolean }>(({ visible }) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(28px)',
  transition: 'opacity 700ms ease, transform 700ms ease',
}));

export function Reveal({ children, ...props }: PropsWithChildren<BoxProps>) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <AnimatedBox ref={ref} visible={isVisible} {...props}>
      {children}
    </AnimatedBox>
  );
}
