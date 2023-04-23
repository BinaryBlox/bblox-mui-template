import type { SyntheticEvent } from 'react';
import { useCallback, useState } from 'react';
import { Avatar, Box, Button, OutlinedInput, Rating, Stack } from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { getInitials } from 'src/utils/get-initials';

export const CompanyReviewAdd = () => {
  const user = useMockedUser();
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = useCallback(
    (event: SyntheticEvent, newRating: number | null): void => {
      setRating(newRating);
    },
    []
  );

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      spacing={2}
    >
      <Avatar src={user.avatar}>
        {getInitials(user.name)}
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <OutlinedInput
          fullWidth
          multiline
          placeholder="Send your review"
          rows={3}
        />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          spacing={1}
          sx={{ mt: 3 }}
        >
          <Rating
            onChange={handleRatingChange}
            value={rating}
          />
          <Button variant="contained">
            Send Review
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
