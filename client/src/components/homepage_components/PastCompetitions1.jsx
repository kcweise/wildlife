// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
// import { useAuth } from "../../UserContext";
// import PCompPhotoDetail from './PCompPhotoDetail';

// const PastCompetitions = () => {

  
//   const [competitions, setCompetitions] = useState([])
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   //const [countDown, setCountDown] = useState(null);

//   useEffect(() => {
//     fetch('/api/competitions')
//       .then((res) => res.json())
//       .then((data) => {
//         setCompetitions(data.past_competitions);
        
//       })
//       .catch((error) => console.error('Error fetching Competitions:', error));
//   }, []);


//   //Dynamically changing relative file path.
//   const modifyPhotoURL = (competitionPhoto) =>{
//     if (competitionPhoto.photo.photo_url.startsWith('../../../'))
//       return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
//     else 
//       return competitionPhoto.photo.photo_url;
//   };

//   // const handleOpenModal = (photo) => {
//   //   setSelectedPhoto(photo);
//   // };

//   // const handleCloseModal = () => {
//   //   setSelectedPhoto(null);
//   // };
  
//   return(
//     {competitions.map((comp) => {
//     const winnerPhoto = comp.competition_photos.length > 0 ?
//       comp.competition_photos.reduce((prev, current) => (prev.votes > current.votes ? prev : current), {}) :
//       null;
  
//     return (
//       <Card key={comp.id} className="card">
//         <CardContent>
//           <Typography variant="h5" component="div">
//             {comp.name}
//           </Typography>
//           <Typography variant="body2">
//             {comp.description}
//           </Typography>
//           <Typography variant="body2">
//             Start Date: {new Date(comp.start_date).toLocaleDateString()}
//           </Typography>
//           <Typography variant="body2">
//             End Date: {new Date(comp.end_date).toLocaleDateString()}
//           </Typography>
//           <Typography variant="h6" component="div">
//             Winner Photo:
//           </Typography>
//           {winnerPhoto ? (
//             <div className="photo-card">
//               <img src={modifyPhotoURL(winnerPhoto.photo)} alt={`Photo ${winnerPhoto.id}`} />
//               <Typography variant="body2">Votes: {winnerPhoto.votes}</Typography>
//             </div>
//           ) : (
//             <Typography variant="body2">
//               {comp.competition_photos.length > 0 ? "No winner selected" : "No photos were entered"}
//             </Typography>
//           )}
//         </CardContent>
//       </Card>
//     );
//   })}
// }


// export default PastCompetitions;

//   return (
//     <section>
//       <Typography variant="h4" gutterBottom>
//         Past Competitions
//       </Typography>
//       <div className="card-container">
//         {competitions.map((comp) => {
//           const winnerPhoto = comp.competition_photos.reduce((prev, current) => (prev.votes > current.votes ? prev : current), {});
//           return (
//             <Card key={comp.id} className="card">
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   {comp.name}
//                 </Typography>
//                 <Typography variant="body2">
//                   {comp.description}
//                 </Typography>
//                 <Typography variant="body2">
//                   Start Date: {new Date(comp.start_date).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body2">
//                   End Date: {new Date(comp.end_date).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="h6" component="div">
//                   Winner Photo:
//                 </Typography>
//                 {winnerPhoto && (
//                   <div className="photo-card">
//                     <img src={winnerPhoto.image_url} alt={`Photo ${winnerPhoto.id}`} />
//                     <Typography variant="body2">Votes: {winnerPhoto.votes}</Typography>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useAuth } from "../../UserContext";
import PCompPhotoDetail from './PCompPhotoDetail';

const PastCompetitions = () => {
  const { modifyPhotoURL } = useAuth();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.past_competitions);
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);

  return (
    <div>
      {competitions.map((comp) => {
        const winnerPhoto = comp.competition_photos.length > 0 ?
          comp.competition_photos.reduce((prev, current) => (prev.votes > current.votes ? prev : current), {}) :
          null;
      
        return (
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
              <Typography variant="h6" component="div">
                Winner Photo:
              </Typography>
              {winnerPhoto ? (
                <div className="photo-card">
                  <img src={modifyPhotoURL(winnerPhoto.photo)} alt={`Photo ${winnerPhoto.id}`} />
                  <Typography variant="body2">Votes: {winnerPhoto.votes}</Typography>
                </div>
              ) : (
                <Typography variant="body2">
                  {comp.competition_photos.length > 0 ? "No winner selected" : "No photos were entered"}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default PastCompetitions;