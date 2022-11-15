import * as React from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // FormControlLabel,
  // Switch,
  DialogActions,
  Button,
} from '@mui/material';

// ----------------------------------------------------------------------

UserDialog.propTypes = {
  dialog: PropTypes.bool,
  user: PropTypes.object,
  closeDialog: PropTypes.func,
};

export default function UserDialog({ dialog, user, closeDialog }) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  return (
    <>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={dialog} onClose={closeDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                // onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
              label="Full width"
            /> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
