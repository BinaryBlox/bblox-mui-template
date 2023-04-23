import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Lock01Icon from '@untitled-ui/icons-react/build/esm/Lock01';
import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { CheckoutBilling } from 'src/sections/checkout/checkout-billing';
import { CheckoutSummary } from 'src/sections/checkout/checkout-summary';
import type { Page as PageType } from 'src/types/page';

interface Billing {
  address: string;
  cardExpirationDate: string;
  cardNumber: string;
  cardOwner: string;
  cardSecurityCode: string;
  firstName: string;
  lastName: string;
  optionalAddress: string;
  paymentMethod: string;
  state: string;
  zip: string;
}

const initialBilling: Billing = {
  address: '',
  cardExpirationDate: '',
  cardNumber: '',
  cardOwner: '',
  cardSecurityCode: '',
  firstName: '',
  lastName: '',
  optionalAddress: '',
  paymentMethod: 'visa',
  state: '',
  zip: ''
};

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  {
    id: '97375399bf10f57d0f0f7fd9',
    image: '/assets/products/product-1.png',
    name: 'Healthcare Erbology',
    price: 23.99,
    quantity: 1
  },
  {
    id: 'ece4069546ff025047b97735',
    image: '/assets/products/product-2.png',
    name: 'Makeup Lancome Rouge',
    price: 95.00,
    quantity: 1
  }
];

const Page: PageType = () => {
  const [billing, setBilling] = useState(initialBilling);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  usePageView();

  const handleBillingChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setBilling((prevState) => (
        {
          ...prevState,
          [event.target.name]: event.target.value
        }
      ));
    },
    []
  );

  const handleQuantityChange = useCallback(
    (event: SelectChangeEvent<number>, productId: string): void => {
      setProducts((prevState) => {
        return prevState.map((product) => {
          if (product.id !== productId) {
            return product;
          }

          return {
            ...product,
            quantity: event.target.value as number
          };
        });
      });
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
    },
    []
  );

  return (
    <>
      <Seo title="Checkout " />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Home
                  </Typography>
                </Link>
              </div>
              <Typography variant="h3">
                Checkout
              </Typography>
            </Stack>
            <Box mt={6}>
              <Grid
                container
                spacing={6}
              >
                <Grid
                  md={7}
                  xs={12}
                >
                  <CheckoutBilling
                    billing={billing}
                    onChange={handleBillingChange}
                  />
                </Grid>
                <Grid
                  md={5}
                  xs={12}
                >
                  <CheckoutSummary
                    onQuantityChange={handleQuantityChange}
                    products={products}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 6 }}>
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <SvgIcon sx={{ color: 'success.main' }}>
                  <Lock01Icon />
                </SvgIcon>
                <Typography variant="subtitle2">
                  Secure Checkout
                </Typography>
              </Stack>
              <Typography
                color="text.secondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Your purchases are secured by an industry best encryption
                service – Braintree
              </Typography>
              <Button
                color="primary"
                endIcon={(
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                )}
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Complete order
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
