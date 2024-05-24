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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const ACompPhotoDetail = ({ photo, open, onClose, onVote, isLoggedIn }) => {
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    let intervalId;

    if (countDown!==null) {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDown - now;

        if (distance <= 0) {
          clearInterval(intervalId);
          setCountDown(null);
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setCountDown(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [countDown]);

  // Dynamically changing relative file path.
  const modifyPhotoURL = (competitionPhoto) => {
    if (competitionPhoto.photo.photo_url.startsWith('../../../'))
      return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
    else 
      return competitionPhoto.photo.photo_url;
  };

  const handleVoteClick = () => {
    onVote(photo);
  };

  return (
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
      {countDown && (
        <div style={{ textAlign: 'center' }}>
          <p>You can vote again in this competition in {countDown}.</p>
        </div>
      )}
    </Dialog>
  );
};

export default ACompPhotoDetail;