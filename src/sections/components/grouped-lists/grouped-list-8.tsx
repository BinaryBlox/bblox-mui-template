import type { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

interface Member {
  id: string;
  avatar: string;
  job: string;
  name: string;
}

const members: Member[] = [
  {
    id: '5e887a62195cc5aef7e8ca5d',
    avatar: '/assets/avatars/avatar-marcus-finn.png',
    job: 'Front End Developer',
    name: 'Marcus Finn'
  },
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    job: 'UX Designer',
    name: 'Carson Darrin'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    job: 'Copyright',
    name: 'Jie Yan Song'
  }
];

export const GroupedList8: FC = () => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark'
        ? 'neutral.800'
        : 'neutral.100',
      p: 3
    }}
  >
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          sx={{ pb: 0 }}
          title="Project members"
          titleTypographyProps={{ variant: 'overline' }}
        />
        <CardContent>
          <List disablePadding>
            {members.map((member) => (
              <ListItem
                disableGutters
                key={member.id}
              >
                <ListItemAvatar>
                  <Avatar src={member.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={(
                    <Typography variant="subtitle2">
                      {member.name}
                    </Typography>
                  )}
                  secondary={(
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      {member.job}
                    </Typography>
                  )}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            color="inherit"
            size="small"
          >
            Manage members
          </Button>
        </CardActions>
      </Card>
    </Container>
  </Box>
);
