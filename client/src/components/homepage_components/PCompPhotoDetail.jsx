import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';

//Displays detailed photograph when clicked on.
const PCompPhotoDetail = ({ photo, open, onClose }) => {


    // Dynamically changing relative file path.
    const modifyPhotoURL = (competitionPhoto) => {
        if (competitionPhoto.startsWith('../../../'))
          return competitionPhoto.replace(`../../../`, `../../`);
        else 
          return competitionPhoto;
      };

    return (
        <>
          <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            {/* <DialogTitle>{photo.photo.title ? photo.title : 'Untitled'}</DialogTitle>             */}
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
              <Button onClick={onClose}>Close</Button>   

            </DialogActions>
          </Dialog>
        </>
      );
    };
    
    export default PCompPhotoDetail;