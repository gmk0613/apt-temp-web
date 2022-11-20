import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogContentText,
  FormControl,
  Stack,
  Card,
  Grid,
  TextField,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from '@mui/material';
import userApproves from 'src/_mock/userApprove';

// ----------------------------------------------------------------------

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
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={2}>
                    role
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <FormControl fullWidth>
                      <Select id="role" name="role" value={inputs.role} onChange={handleInputsChange}>
                        <MenuItem value={'manager'}>Manager</MenuItem>
                        <MenuItem value={'super_admin'}>Super Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button onClick={closeDialog}>save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
