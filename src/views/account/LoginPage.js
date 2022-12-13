import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

// components
import apiHelper from 'src/utils/apiHelper';
import appHistory from 'src/appHistory';
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
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  useEffect(() => {
    if (login) {
      dispatch({
        type: 'account/login',
        data: {
          userId: loginId,
          userRole: 'Manager',
          accessToken: 'aToken',
          refreshToken: 'rToken',
        },
      });
      appHistory.push('/tempStatus');
    }
  }, [login]);

  const handleClick = async () => {
    if (loginPw === '') {
      alert('패스워드를 입력하세요.');
      return;
    }
    const param = {
      id: loginId,
      pw: loginPw,
    };

    // login api연동
    // const res = await apiHelper.get('https://jsonplaceholder.typicode.com/users', {});
    // console.log(res);
    if (true) {
      setLogin(true);
    } else {
      alert('접근불가');
    }
  };

  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <img src="/assets/logo.svg" alt="LOGO" />
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Stack spacing={3}>
              <TextField name="email" label="Email address" onChange={(e) => setLoginId(e.target.value)} />

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
                onChange={(e) => setLoginPw(e.target.value)}
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
