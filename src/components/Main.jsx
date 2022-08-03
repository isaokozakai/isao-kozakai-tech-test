import { useState } from 'react';
import _ from 'lodash';
import { Box, Button, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Paper } from '@mui/material';
import { getRandomActivity } from './utils';
import Result from './Result';

const types = ['busywork', 'charity', 'cooking', 'diy', 'education', 'music', 'recreational', 'relaxation', 'social'];

const Main = () => {
  const [activity, setActivity] = useState();
  const [error, setError] = useState();
  const [type, setType] = useState('');
  const [participants, setParticipants] = useState('');
  const [minprice, setMinprice] = useState('');
  const [maxprice, setMaxprice] = useState('');
  const [minaccessibility, setMinaccessibility] = useState('');
  const [maxaccessibility, setMaxaccessibility] = useState('');

  const handleSubmit = async () => {
    let criteria = null;
    if (type || participants || minprice || maxprice || minaccessibility || maxaccessibility) {
      criteria = { type, participants, minprice, maxprice, minaccessibility, maxaccessibility };
    }

    try {
      const randomActivity = await getRandomActivity(criteria);
      setActivity(randomActivity);
      setError();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box my={5} mx={7} display="flex" flexDirection="column" gap={3}>
      <Button variant="contained" sx={{ width: '250px' }} onClick={handleSubmit} id="submit">
        Get an activity to do
      </Button>
      <Paper sx={{ paddingY: 2, paddingX: 3 }}>
        <Typography>Criteria</Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type">Type</InputLabel>
          <Select id="type" value={type} onChange={(e) => setType(e.target.value)} label="Type">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {types.map((item) => (
              <MenuItem value={item} key={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Participants"
            variant="standard"
            type="number"
            inputProps={{ min: '0' }}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Minimum Price"
            variant="standard"
            type="number"
            inputProps={{ step: '0.1', min: '0' }}
            value={minprice}
            onChange={(e) => setMinprice(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Maximum Price"
            variant="standard"
            type="number"
            inputProps={{ step: '0.1', min: '0' }}
            value={maxprice}
            onChange={(e) => setMaxprice(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Minimum Accessibility"
            variant="standard"
            type="number"
            inputProps={{ step: '0.1', min: '0' }}
            value={minaccessibility}
            onChange={(e) => setMinaccessibility(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Maximum Accessibility"
            variant="standard"
            type="number"
            inputProps={{ step: '0.1', min: '0' }}
            value={maxaccessibility}
            onChange={(e) => setMaxaccessibility(e.target.value)}
          />
        </FormControl>
      </Paper>
      {(() => {
        if (error) {
          return <Typography>{error}</Typography>;
        }

        if (!_.isEmpty(activity)) {
          return <Result activity={activity} />;
        }
      })()}
    </Box>
  );
};

export default Main;
