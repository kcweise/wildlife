
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useAuth } from "../../UserContext";
import FCompPhotoDetail from './FCompPhotoDetail';

const FutureCompetitions = () => {
  
  const [competitions, setCompetitions] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null);  

  useEffect(() => {
    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.future_competitions);
        
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);
console.log(competitions)
  //Dynamically changing relative file path.
  const modifyPhotoURL = (competitionPhoto) =>{
    if (competitionPhoto.photo.photo_url.startsWith('../../../'))
      return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
    else 
      return competitionPhoto.photo.photo_url;
  };

  const handleOpenModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Future Competitions
      </Typography>
      <Grid container spacing={2} justifyContent= "center">
        {competitions.map((comp) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={comp.id}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 
            'space-between',  border: '3px solid #ccc',  borderRadius: '10px',  overflow: 'hidden'}}>
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
                  Photos:
                </Typography>
                <Grid container spacing={1}>
                  {comp.competition_photos.map((photo) => (
                    <Grid item xs={6} sm={3} key={photo.id}>
                      <div className="photo-card" onClick={() => handleOpenModal(photo)}>
                        <img 
                          src={modifyPhotoURL(photo)} 
                          alt={`Photo ${photo.id}`}
                          style={{ width: '100%', height: 'auto' }} 
                        />
                        <Typography variant="body2">Votes: {photo.votes}</Typography>                        
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedPhoto && (
        <FCompPhotoDetail 
          photo={selectedPhoto} 
          open={selectedPhoto !== null} 
          onClose={handleCloseModal}         
                   
        />
      )}  
      </section>
  );
};


export default FutureCompetitions;



// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// const FutureCompetitions = ({ competitions }) => {

//   //Dynamically changing relative file path.
//   const modifyPhotoURL = (competitionPhoto) =>{
//     if (competitionPhoto.photo.photo_url.startsWith('../../../'))
//       return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
//     else 
//       return competitionPhoto.photo.photo_url;
//   };

//   return (
//     <section>
//       <Typography variant="h4" gutterBottom>
//         Future Competitions
//       </Typography>
//       <div className="card-container">
//         {competitions.map((comp) => (
//           <Card key={comp.id} className="card">
//             <CardContent>
//               <Typography variant="h5" component="div">
//                 {comp.name}
//               </Typography>
//               <Typography variant="body2">
//                 {comp.description}
//               </Typography>
//               <Typography variant="body2">
//                 Start Date: {new Date(comp.start_date).toLocaleDateString()}
//               </Typography>
//               <Typography variant="body2">
//                 End Date: {new Date(comp.end_date).toLocaleDateString()}
//               </Typography>
//               <Typography variant="h6" component="div">
//                 Photos:
//               </Typography>
//               <div className="photos-container">
//                 {comp.competition_photos.map((photo) => (
//                   <div key={photo.id} className="photo-card">
//                     <img src={modifyPhotoURL(photo)} alt={`Photo ${photo.id}`}
//                       style={{ maxWidth: '100%', maxHeight: '300px' }} 
//                     />
//                     <Typography variant="body2">Votes: {photo.votes}</Typography>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FutureCompetitions;