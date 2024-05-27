import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ActiveCompetitions from '../components/homepage_components/ActiveCompetitions';
import FutureCompetitions from '../components/homepage_components/FutureCompetitions';
import PastCompetitions from '../components/homepage_components/PastCompetitions';

const HomePage = () => {
  const [activeComps, setActiveComps] = useState([]);
  const [futureComps, setFutureComps] = useState([]);
  const [pastComps, setPastComps] = useState([]);

  useEffect(() => {
    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setActiveComps(data.active_competitions);
        setFutureComps(data.future_competitions);
        setPastComps(data.past_competitions);
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);

  return (
    <Container sx={{ mt: 0 }}>
      <Box sx={{ mt: 0 }}>
          <Typography variant="h2" gutterBottom align="center" sx={{ mt: 0, mb: 2 }}>
          Competitions
        </Typography>
        <ActiveCompetitions competitions={activeComps} />
        <FutureCompetitions competitions={futureComps} />
        <PastCompetitions competitions={pastComps} />
      </Box>
    </Container>
  );
};

export default HomePage;



