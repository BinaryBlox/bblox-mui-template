import type { FC } from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import type { NavColor } from 'src/types/settings';

interface Option {
  label: string;
  value: NavColor;
}

const options: Option[] = [
  {
    label: 'Blend-in',
    value: 'blend-in'
  },
  {
    label: 'Discreet',
    value: 'discreet'
  },
  {
    label: 'Evident',
    value: 'evident'
  }
];

interface OptionsNavColorProps {
  onChange?: (value: NavColor) => void;
  value?: NavColor;
}

export const OptionsNavColor: FC<OptionsNavColorProps> = (props) => {
  const { onChange, value } = props;

  return (
    <Stack spacing={1}>
      <Typography
        color="text.secondary"
        variant="overline"
      >
        Nav Color
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
      >
        {options.map((option) => (
          <Chip
            key={option.label}
            label={option.label}
            onClick={() => onChange?.(option.value)}
            sx={{
              borderColor: 'transparent',
              borderRadius: 1.5,
              borderStyle: 'solid',
              borderWidth: 2,
              ...(option.value === value && {
                borderColor: 'primary.main'
              })
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};
