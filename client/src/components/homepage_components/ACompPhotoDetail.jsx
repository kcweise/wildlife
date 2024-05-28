
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { useAuth } from "../../UserContext";

const ACompPhotoDetail = ({ photo, open, onClose, onVote, isLoggedIn }) => {
  const [hasVotedRecently, setHasVotedRecently]=useState(false);
  const [alreadyVotedDialogOpen, setAlreadyVotedDialogOpen] = useState(false);
  const { user } = useAuth();


  // Dynamically changing relative file path.
  const modifyPhotoURL = (competitionPhoto) => {
    if (competitionPhoto.photo.photo_url.startsWith('../../../'))
      return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
    else 
      return competitionPhoto.photo.photo_url;
  };

  const handleVoteClick = () => {

      //Check if the user has voted in the competition in the last 24 hours
          const hasVoted = user.user_posted_ratings.some(rating => {
          const ratingDate = new Date(rating.created_at);
          const currentDate = new Date();
          const timeDifference = currentDate - ratingDate;
          const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
          return hoursDifference < 24;
       
    });


      if (hasVoted) {
        // Display the already voted dialog
        setHasVotedRecently(true);
        setAlreadyVotedDialogOpen(true);
      } else {
        onVote(photo);
      }
    };
  
    const handleAlreadyVotedDialogClose = () => {
      setAlreadyVotedDialogOpen(false);
    };



  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{photo ? photo.photo.title : 'Untitled'}</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {photo && (
            <img 
              src={modifyPhotoURL(photo)} 
              alt={photo.title || 'Untitled'} 
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} 
            />
          )}
        </DialogContent>
        <DialogActions>
          {isLoggedIn && (
            <Button variant="contained" color="primary" onClick={handleVoteClick}>
              Vote
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </DialogActions>       
      </Dialog>
            {/* Already Voted Dialog */}
            <Dialog open={alreadyVotedDialogOpen} onClose={handleAlreadyVotedDialogClose}>
        <DialogTitle>Already Voted</DialogTitle>
        <DialogContent>
          <Typography>
            You have already voted in this competition within the last 24 hours. Please try again later.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlreadyVotedDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ACompPhotoDetail;