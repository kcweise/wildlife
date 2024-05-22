import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
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
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Competitions
      </Typography>
      <ActiveCompetitions competitions={activeComps} />
      <FutureCompetitions competitions={futureComps} />
      <PastCompetitions competitions={pastComps} />
    </Container>
  );
};

export default HomePage;


// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import './HomePage.css'; // Import the CSS file





// function HomePage() {
//   const [comps, setComps] = useState([]);

//   useEffect(() => {
//     fetch('/api/competitions')
//       .then((res) => res.json())
//       .then((data) => {
//         setComps(data);
//       })
//       .catch((error) => console.error('Error fetching Competitions:', error));
//   }, []);



//   return (
//     <div className="page-container">
//     <div className="home-header">
//       <h1>Active Competitions</h1>
//     </div>
//     <section>
//       <div className="card-container">
//         {comps.map((comp) => (
//           <div className="card" key={comp.id}>
//             <div className="card-content">
//               <h3 className="competition-name">{comp.name}</h3>
//               <p>{comp.description}</p>
//               <p>Start Date: {new Date(comp.start_date).toLocaleDateString()}</p>
//               <p>End Date: {new Date(comp.end_date).toLocaleDateString()}</p>
//               <h4>Photos:</h4>
//               <div className="photos-container">
//                 {comp.competition_photos.map((photo) => (
//                   <div key={photo.id} className="photo-card">
//                     <img src={photo.image_url} alt={`Photo ${photo.id}`} />
//                     <p>Votes: {photo.votes}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   </div>
// );
// }
     
//     export default HomePage;




