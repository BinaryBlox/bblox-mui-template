import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';

interface Values {
  password: string;
  passwordConfirm: string;
}

const initialValues: Values = {
  password: '',
  passwordConfirm: ''
};

const validationSchema = Yup.object({
  password: Yup
    .string()
    .min(7, 'Must be at least 7 characters')
    .max(255)
    .required('Required'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
});

const Page: PageType = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (): void => {}
  });

  return (
    <>
      <Seo title="Reset Password" />
      <div>
        <Box sx={{ mb: 4 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.index}
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
              Dashboard
            </Typography>
          </Link>
        </Box>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Reset Password"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                  fullWidth
                  helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                  label="Password (Confirm)"
                  name="passwordConfirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.passwordConfirm}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Reset
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
