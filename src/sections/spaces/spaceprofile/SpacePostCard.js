import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import EmojiPicker from '../../../components/EmojiPicker';

// ----------------------------------------------------------------------

SpacePostCard.propTypes = {
  post: PropTypes.object,
};

export default function SpacePostCard({ post }) {
  const { user } = useAuth();

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isLiked, setLiked] = useState(post.isLiked);

  const [likes, setLikes] = useState(post.personLikes.length);

  const [message, setMessage] = useState('');

  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink} style={{textDecoration: 'none'}}>
            Doraemon
         
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={1} sx={{ p: 2 }}>

        <Typography sx={{ p: 1 }}>{post.message}</Typography>

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
         
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

      </Stack>
    </Card>
  );
}
