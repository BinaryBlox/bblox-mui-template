import { Box, Container } from '@mui/material';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Previewer } from 'src/sections/components/previewer';
import { Typography1 } from 'src/sections/components/typography/typography-1';
import type { Page as PageType } from 'src/types/page';

const Page: PageType = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Typography" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Previewer title="Typography">
            <Typography1 />
          </Previewer>
        </Container>
      </Box>
    </>
  );
};

export default Page;
