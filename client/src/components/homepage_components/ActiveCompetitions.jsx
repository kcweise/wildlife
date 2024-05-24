import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useAuth } from "../../UserContext";
import ACompPhotoDetail from './ACompPhotoDetail';


const ActiveCompetitions = () => {


  const { isLoggedIn, user, login } = useAuth();
  const [competitions, setCompetitions] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  //const [countDown, setCountDown] = useState(null);

  useEffect(() => {
    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.active_competitions);
        
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);
  
  
  
  // useEffect(() => {
  //   let intervalId;

  //   if (countDown) {
  //     intervalId = setInterval(() => {
  //       const now = new Date().getTime();
  //       const distance = countDown - now;

  //       if (distance <= 0) {
  //         clearInterval(intervalId);
  //         setCountDown(null);
  //       } else {
  //         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //         setCountDown(`${hours}h ${minutes}m ${seconds}s`);
  //       }
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [countDown]);

  const handleVote = async (photo) => {
    
      try {
        const response = await fetch('/api/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            photo_id: photo.id
          })
        });

        if (response.ok) {
          //Patch to competition photo to increment vote count
          const voteRes = await fetch(`/api/vote/${photo.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (voteRes.ok) {
            const data = await voteRes.json();
            const updatedPhoto = data.competition_photo;

            setCompetitions(prevCompetitions => {
              return prevCompetitions.map(comp => {
                if (comp.id === updatedPhoto.competition_id) {
                  return {
                    ...comp,
                    competition_photos: comp.competition_photos.map(p =>
                      p.id === updatedPhoto.id ? { ...p, votes: updatedPhoto.votes } : p
                    )
                  };
                }
                return comp;
              });
            });



          login(response.user);
          handleCloseModal();
          
        } else {
          const errorData = await voteResponse.json();
          console.error('Error voting:', errorData);
        }
      } else {
        const errorData = await ratingResponse.json();
        console.error('Error posting rating:', errorData);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  //}
};
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
        Active Competitions
      </Typography>
      <Grid container spacing={2}>
        {competitions.map((comp) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={comp.id}>
            <Card>
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
                        {selectedPhoto === photo && isLoggedIn && (
                          <Button variant="contained" onClick={() => handleVote(photo)}>Vote</Button>
                        )}
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
        <ACompPhotoDetail 
          photo={selectedPhoto} 
          open={selectedPhoto !== null} 
          onClose={handleCloseModal} 
          onVote={handleVote} 
          isLoggedIn={isLoggedIn}          
        />
      )}
      {/* {countDown && (
        <Typography variant="body2">
          You can vote again in this competition in {countDown}.
        </Typography>
      )} */}
      </section>
  );
};

export default ActiveCompetitions;