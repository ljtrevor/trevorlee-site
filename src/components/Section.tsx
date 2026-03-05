import { Box } from '@mui/material';
import type { ElementType, PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  component?: ElementType;
}>;

export function Section({ children, component = 'section' }: SectionProps) {
  return (
    <Box component={component} className="section-enter" sx={{ py: { xs: 4, md: 5 } }}>
      {children}
    </Box>
  );
}
