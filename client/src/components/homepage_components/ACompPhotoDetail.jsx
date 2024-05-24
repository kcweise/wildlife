// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

// const ACompPhotoDetail = ({ photo, open, onClose, onVote, isLoggedIn }) => {


//   //Dynamically changing relative file path.
//   const modifyPhotoURL = (competitionPhoto) =>{
//     if (competitionPhoto.photo.photo_url.startsWith('../../../'))
//       return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
//     else 
//       return competitionPhoto.photo.photo_url;
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>{photo ? photo.photo.title : 'Untitled'}</DialogTitle>
//       <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         {photo && (
//           <img 
//             src={modifyPhotoURL(photo)} 
//             alt={photo.title || 'Untitled'} 
//             style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} 
//           />
//         )}
//       </DialogContent>
//       <DialogActions>
//         {isLoggedIn && (
//           <Button variant="contained" color="primary" onClick={() => onVote(photo)}>
//             Vote
//           </Button>
//         )}
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ACompPhotoDetail;


import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { useAuth } from "../../UserContext";

const ACompPhotoDetail = ({ photo, open, onClose, onVote, isLoggedIn }) => {
  const [countDown, setCountDown] = useState(0);
  const [hasVotedRecently, setHasVotedRecently]=useState(false);
  const [alreadyVotedDialogOpen, setAlreadyVotedDialogOpen] = useState(false);
  const { user } = useAuth();

//   useEffect(() => {
//     let intervalId;

//     if (countDown!==null) {
//       intervalId = setInterval(() => {
//         const now = new Date().getTime();
//         const distance = countDown - now;

//         if (distance <= 0) {
//           clearInterval(intervalId);
//           setCountDown(null);
//         } else {
//           const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//           setCountDown(`${hours}h ${minutes}m ${seconds}s`);
//         }
//       }, 1000);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [countDown]);

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

    //if (hasVoted) {
      // Display a message indicating when the user can vote again
      //   const lastVoteRating = user.user_posted_ratings.find(rating => {
      //   const ratingDate = new Date(rating.created_at);
      //   const currentDate = new Date();
      //   const timeDifference = currentDate - ratingDate;
      //   const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      //   return hoursDifference < 24;
      // });

      // const lastVoteTime = new Date(lastVoteRating.created_at);
      // const nextVoteTime = new Date(lastVoteTime.getTime() + 24 * 60 * 60 * 1000);
      // setCountDown(nextVoteTime.getTime());

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