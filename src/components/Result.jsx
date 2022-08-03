import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Result = ({ activity: { activity: name, type, accessibility, participants, price } }) => {
  return (
    <Accordion sx={{ minWidth: '300px', width: 'fit-content' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography id="name-result">{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography id="type-result">Type: {type}</Typography>
        <Typography id="accessibility-result">Accessibility: {accessibility}</Typography>
        <Typography id="participants-result">Participants: {participants}</Typography>
        <Typography id="price-result">Price: {price}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Result;
