import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import DeletePhoto from './DeletePhoto';
import EditPhoto from './EditPhoto';
import EnterCompetition from './EnterCompetition';

const PhotoDetail = ({ photo, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
          <DialogTitle>{photo ? photo.title : 'Untitled'}</DialogTitle>
          <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={photo ? photo.photo_url : ''} alt={photo ? photo.title : ''} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
          </DialogContent>
          <DialogActions>
            <DeletePhoto photoId={photo.id} onClose = {onClose} />
            <EnterCompetition photo={photo} onClose={onClose} />
            <EditPhoto photo={photo} onClose = {onClose} />
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </Dialog>
      );
    };

export default PhotoDetail;