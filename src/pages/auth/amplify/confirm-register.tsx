import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField
} from '@mui/material';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/amplify-context';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';

interface Values {
  code: string;
  email: string;
  submit: null;
}

const getInitialValues = (username?: string): Values => {
  return {
    code: '',
    email: username || '',
    submit: null
  };
};

const validationSchema = Yup.object({
  code: Yup
    .string()
    .min(6)
    .max(6)
    .required('Code is required'),
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required')
});

const Page: PageType = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || undefined;
  const { confirmSignUp } = useAuth<AuthContextType>();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(username),
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await confirmSignUp(values.email, values.code);

        if (isMounted()) {
          router.push(paths.auth.amplify.login);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  usePageView();

  return (
    <>
      <Seo title="Confirm Register" />
      <div>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Confirm Register"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                {
                  username
                    ? (
                      <TextField
                        disabled
                        fullWidth
                        label="Email"
                        value={username}
                      />
                    )
                    : (
                      <TextField
                        autoFocus
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                      />
                    )
                }
                <FormControl error={!!(formik.touched.code && formik.errors.code)}>
                  <FormLabel
                    sx={{
                      display: 'block',
                      mb: 2
                    }}
                  >
                    Verification code
                  </FormLabel>
                  <MuiOtpInput
                    length={6}
                    onBlur={() => formik.handleBlur('code')}
                    onChange={(value) => formik.setFieldValue('code', value)}
                    onFocus={() => formik.setFieldTouched('code')}
                    sx={{
                      '& .MuiFilledInput-input': {
                        p: '14px'
                      }
                    }}
                    value={formik.values.code}
                  />
                  {!!(formik.touched.code && formik.errors.code) && (
                    <FormHelperText>
                      {formik.errors.code}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Confirm
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
