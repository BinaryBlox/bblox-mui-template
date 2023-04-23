import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, Typography } from '@mui/material';
import type { Review } from 'src/types/job';
import { CompanyReview } from './company-review';
import { CompanyReviewAdd } from './company-review-add';
import { CompanyReviewsSummary } from './company-reviews-summary';

interface CompanyReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export const CompanyReviews: FC<CompanyReviewsProps> = (props) => {
  const { reviews, averageRating, ...other } = props;

  return (
    <Stack
      spacing={3}
      {...other}
    >
      <div>
        <Typography variant="h6">
          Reviews
        </Typography>
      </div>
      <Stack spacing={3}>
        <CompanyReviewsSummary
          averageRating={averageRating}
          totalReviews={reviews.length}
        />
        {reviews.map((review) => (
          <CompanyReview
            key={review.id}
            review={review}
          />
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button color="inherit">
            Load more
          </Button>
        </Box>
        <CompanyReviewAdd />
      </Stack>
    </Stack>
  );
};

CompanyReviews.defaultProps = {
  reviews: [],
  averageRating: 0
};

CompanyReviews.propTypes = {
  // @ts-ignore
  reviews: PropTypes.array.isRequired,
  averageRating: PropTypes.number.isRequired
};
