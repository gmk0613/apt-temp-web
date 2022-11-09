import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

// components
import Iconify from '../../components/iconify';
// @mui
// sections

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => {
    if (login) {
      dispatch({
        type: 'account/login',
        data: {
          userId: id,
        },
      });
      navigate('/app');
    }
  }, [login]);

  const handleClick = () => {
    setLogin(true);
  };

  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Stack spacing={3}>
              <TextField name="email" label="Email address" onChange={(e) => setId(e.target.value)} />

              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPw(e.target.value)}
              />
            </Stack>
            <br />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Login
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
