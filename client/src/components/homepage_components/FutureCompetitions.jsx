import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FutureCompetitions = ({ competitions }) => {
  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Future Competitions
      </Typography>
      <div className="card-container">
        {competitions.map((comp) => (
          <Card key={comp.id} className="card">
            <CardContent>
              <Typography variant="h5" component="div">
                {comp.name}
              </Typography>
              <Typography variant="body2">
                {comp.description}
              </Typography>
              <Typography variant="body2">
                Start Date: {new Date(comp.start_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                End Date: {new Date(comp.end_date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FutureCompetitions;