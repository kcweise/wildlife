import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const PhotoDetail = ({ photo, open, onClose, onDelete, onEnterCompetition, onEdit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{photo ? photo.title : 'Untitled'}</DialogTitle>
      <DialogContent>
        <img src={photo ? photo.photo_url : ''} alt={photo ? photo.title : ''} style={{ maxWidth: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}>Delete</Button>
        <Button onClick={onEnterCompetition}>Enter Competition</Button>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoDetail;