import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Make sure you have imported SweetAlert

import api from '../components/api/Api'
import AddImageModal from '../components/modal/AddImageModal';
interface ImageItem {
    id: number;
    title: string;
    src: string;
}

interface ResponseType{
    _id:string
    url:string;
    order:number;
    title:string;
    createdAt?:string;
    isDelete?:boolean
}

const Home = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    const [modalOpen,setModalOpen]=useState<boolean>(false)
    useEffect(() => {
        
        fetchImages();
    }, []);
    const fetchImages = async () => {
        try {
            const response = await api.get('/api/user/home');
            console.log('API Response:', response.data.images);
            const fetchedImages = response.data.images.map((image: ResponseType) => ({
                id: image._id,
                title: image.title,
                src: image.url,
                order:image.order
            }));
            console.log('Fetched Images:', fetchedImages);
            setImages(fetchedImages);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    

    const toggleSelectImage = (id: number) => {
        setSelectedImages((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };
    const handleDragEnd = async (result:DropResult) => {
        console.log('re',result)
        if (!result.destination) {
            return;
        }
    
        const items = Array.from(images);
        const [movedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, movedItem);
        setImages(items);
        console.log('ite', items);
        
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save the new order of images?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'No, cancel!'
        });
    
        if (isConfirmed) {
            try {
                const response = await api.put('/api/user/reorder', { images: items });
                console.log('response', response);
                Swal.fire('Saved!', 'Your image order has been saved.', 'success');
                fetchImages()
            } catch (error) {
                console.log('error', error);
                Swal.fire('Error!', 'There was an error saving the order.', 'error');
            }
        } else {
            setImages(images);
            Swal.fire('Cancelled', 'Your image order is unchanged.', 'info');
        }
    };
    
    const handleOpen = () => {
        setModalOpen(true);
    };
 const handleClose=()=>{
    setModalOpen(false)
 }

 const handleDelete = async (id:number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to mark this image as deleted?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    // If the user confirms, proceed with deletion
    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/api/user/deleteImage/${id}`); // Assuming your delete endpoint includes the image ID in the URL
        console.log('Response:', response);
        
        // Optionally, show success message
        Swal.fire({
          title: 'Deleted!',
          text: 'The image has been marked as deleted.',
          icon: 'success',
        });
        
        fetchImages(); 
      } catch (error) {
        console.log('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue deleting the image.',
          icon: 'error',
        });
      }
    }
  };
  return (
    <>
        <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-white font-extrabold text-4xl mb-8 pt-12'>Image Gallery</h1>
            
            <button 
                onClick={handleOpen}
                className='z-10 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full p-4 shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-600 transition-all duration-300 ease-in-out transform hover:scale-110 fixed right-6 bottom-6 flex justify-center items-center'
                aria-label="Add new item"
            >
                <FaPlus className="mr-2" />
                Add Item
            </button>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            className="grid grid-cols-1 bg-gray-900 rounded-xl sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full max-w-4xl p-6"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {images.length === 0 ? (
                                <div className="text-white text-center w-full">
                                    <p className="text-lg">No images found</p>
                                </div>
                            ) : (
                                images.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className={`bg-white p-4 w-[70%] mx-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${selectedImages.includes(item.id) ? 'border-4 border-blue-400' : 'border border-gray-200'}`}
                                                onClick={() => toggleSelectImage(item.id)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="relative">
                                                    <img 
                                                        src={item.src} 
                                                        className="w-full h-64 object-contain rounded-lg mb-4" 
                                                    />
                                                    
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation(); 
                                                            handleDelete(item.id);
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                                        aria-label="Delete"
                                                    >
                                                        <FaTrash className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2 rounded-b-lg">
                                                    <p className="text-center text-red-900 text-2xl font-bold">{item.title}</p>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
        <AddImageModal isOpen={modalOpen} onClose={handleClose} fetchImages={fetchImages}/>
    </>
);

}


export default Home;
