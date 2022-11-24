import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Stack,
  Card,
  Grid,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

UserDialog.propTypes = {
  dialog: PropTypes.bool,
  manager: PropTypes.object,
  closeDialog: PropTypes.func,
};

export default function UserDialog({ dialog, manager, isCreate, closeDialog }) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [inputs, setInputs] = useState({
    userId: manager.userId,
    userName: manager.userName,
    email: manager.email,
    phoneNumber: manager.phoneNumber,
    role: manager.role,
  });

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={dialog} onClose={closeDialog}>
        <DialogTitle>{isCreate ? 'Create User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
            }}
          >
            <Stack>
              <Card sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2}>
                    아이디
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <FormControl fullWidth>
                      <TextField
                        id="userId"
                        name="userId"
                        variant="outlined"
                        label="아이디"
                        value={inputs.userId}
                        onChange={handleInputsChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={2}>
                    이름
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <FormControl fullWidth>
                      <TextField
                        id="userName"
                        name="userName"
                        variant="outlined"
                        label="이름"
                        value={inputs.userName}
                        onChange={handleInputsChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={2}>
                    email
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <FormControl fullWidth>
                      <TextField
                        id="email"
                        name="email"
                        variant="outlined"
                        label="email"
                        value={inputs.email}
                        onChange={handleInputsChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={2}>
                    휴대전화
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <FormControl fullWidth>
                      <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        variant="outlined"
                        label="휴대전화"
                        value={inputs.phoneNumber}
                        onChange={handleInputsChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>저장</Button>
          <Button onClick={closeDialog}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
