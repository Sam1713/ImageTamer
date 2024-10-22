import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import api from '../api/Api'
import Swal from 'sweetalert2';

import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
interface ImageTypes {
    isOpen: boolean;
    onClose: () => void;
    fetchImages:()=>void;
}

const AddImageModal: React.FC<ImageTypes> = ({ isOpen, onClose,fetchImages }) => {
    const [files, setFiles] = useState<{ file: File; title: string }[]>([]);
    const [error, setError] = useState('');
    const [showMessage, setShowMessage] = useState(true);

    if (!isOpen) return null;

    
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        const selectedFiles = Array.from(event.target.files || []);
        const newFiles = selectedFiles
            .filter(file => file.type.startsWith('image/')) // Ensure only images are added
            .map(file => ({ file, title: '' }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleTitleChange = (index: number, value: string) => {
        const updatedFiles = [...files];
        updatedFiles[index].title = value;
        setFiles(updatedFiles);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
      
        // Create FormData object
        const formData = new FormData();
        let hasError = false;
      
        // Clear previous errors
        setError('');
        console.log('dfi', files);
      
        // Append each valid file and its title to the FormData object
        files.forEach((fileObject: { file: File; title: string }) => {
          const { file, title } = fileObject;
      
          // Check if the file is of the correct type
          if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            formData.append('files', file); // Append the file with the 'files' key
            formData.append('titles', title); // Append corresponding title
          } else {
            hasError = true;
            return;
          }
        });
      
        if (hasError) {
          setError('Please upload only PNG or JPEG images.');
          await Swal.fire({
            icon: 'error',
            title: 'Invalid File Type',
            text: 'Please upload only PNG or JPEG images.',
          });
          return; 
        }
      
        // Show confirmation dialog
        const { isConfirmed } = await Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to submit the form?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, submit!',
          cancelButtonText: 'No, cancel!',
        });
      
        if (isConfirmed) {
          try {
            const response = await api.post('/api/user/postImages', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }, // Ensure the proper header is set
            });
            console.log('Response:', response);
      
            // Show success message
            await Swal.fire({
              icon: 'success',
              title: 'Upload Successful',
              text: 'Images uploaded successfully!',
            });
      
            fetchImages();
          } catch (error) {
            console.error('Error uploading files:', error);
      
            // Show error message for upload failure
            await Swal.fire({
              icon: 'error',
              title: 'Upload Failed',
              text: 'There was an error uploading your images. Please try again.',
            });
          }
      
          setFiles([]);
          onClose(); // Close the modal after submission
        } else {
          // User canceled the submission
          await Swal.fire({
            icon: 'info',
            title: 'Cancelled',
            text: 'Your submission has been cancelled.',
          });
        }
      };
      
    const handleCloseItem = (index: number) => {
        const filteredFiles = files.filter((_, fileIndex) => fileIndex !== index);
        setFiles(filteredFiles); 
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-custom-gradient p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-white">Add Images</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>} {/* Error message */}

            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                {/* File Input */}
                <label className="block text-sm font-medium text-gray-300">
                  Choose Files
                </label>
                <TextField
                  type="file"
                  inputProps={{ accept: 'image/*', multiple: true }}
                  onChange={handleFileChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{ mt: 1 }}
                  className='bg-teal-100'
                />
              </Box>
              {showMessage && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 1, transition: 'opacity 0.5s ease', opacity: showMessage ? 1 : 0 }}
        >
          Only JPEG, PNG, JPG images are allowed.
        </Typography>
      )}
    
              <div className={`mt-2 h-[40vh] ${files.length > 3 ? 'overflow-y-scroll' : ''}`}>
              {files.map((fileItem, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <img
                      src={URL.createObjectURL(fileItem.file)}
                      alt={`Preview ${index}`}
                      className="w-16 h-16 object-cover rounded-md shadow mr-2"
                    />
                    <TextField
                      placeholder="Enter title"
                      value={fileItem.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                      sx={{ marginRight: 2 }}
                      className='bg-white rounded-lg p'
                    />
                    <IconButton onClick={() => handleCloseItem(index)} size="small">
                      <FaTimes className="text-red-500" size={24} />
                    </IconButton>
                  </Box>
                ))}
              </div>
    
              <Box 
    display="flex" 
    justifyContent="flex-end" 
    sx={{ marginTop: 2 }} // Add some top margin for spacing
><Button
    onClick={onClose}
    variant="outlined"
    sx={{ 
        borderColor: '#FF5733', // Custom border color
        color: '#FF5733', // Custom text color
        marginRight: 2, // Add some margin for spacing
        '&:hover': {
            backgroundColor: '#FF5733', // Background color on hover
            color: 'white', // Text color on hover
        }
    }}
>
    Cancel
</Button>

    <Button 
        disabled={files.length === 0} 
        type="submit" 
        variant="contained" 
        color="primary"
    >
        Add
    </Button>
</Box>

            </form>
          </div>
        </div>
      );
    };
    

export default AddImageModal;
