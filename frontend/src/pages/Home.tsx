// import React, { useEffect, useState } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import { FaPlus, FaTrash } from 'react-icons/fa';
// import Swal from 'sweetalert2'; // Make sure you have imported SweetAlert

import api from '../components/api/Api'
// import AddImageModal from '../components/modal/AddImageModal';
interface ImageItem {
    id: number;
    title: string;
    src: string;
}

// interface ResponseType{
//     _id:string
//     url:string;
//     order:number;
//     title:string;
//     createdAt?:string;
//     isDelete?:boolean
// }

// const Home:React.FC = () => {
//     const [images, setImages] = useState<ImageItem[]>([]);
//     const [selectedImages, setSelectedImages] = useState<number[]>([]);
//     const [modalOpen,setModalOpen]=useState<boolean>(false)
//     useEffect(() => {
        
//         fetchImages();
//     }, []);
//     const fetchImages = async () => {
//         console.log('sdfsdf')
//         try {
//             const response = await api.get('/api/user/home');
//             console.log('API Response:', response.data.images);
//             const fetchedImages = response.data.images.map((image: ResponseType) => ({
//                 id: image._id,
//                 title: image.title,
//                 src: image.url,
//                 order:image.order
//             }));
//             console.log('haii')
//             console.log('Fetched Images:', fetchedImages);
//             setImages(fetchedImages);
//         } catch (error) {
//             console.error('Error fetching images:', error);
//         }
//     };
    

//     const toggleSelectImage = (id: number) => {
//         setSelectedImages((prevSelected) => {
//             if (prevSelected.includes(id)) {
//                 return prevSelected.filter(selectedId => selectedId !== id);
//             } else {
//                 return [...prevSelected, id];
//             }
//         });
//     };
//     const handleDragEnd = async (result:DropResult) => {
//         console.log('re',result)
//         if (!result.destination) {
//             return;
//         }
    
//         const items = Array.from(images);
//         const [movedItem] = items.splice(result.source.index, 1);
//         items.splice(result.destination.index, 0, movedItem);
//         setImages(items);
//         console.log('ite', items);
        
//         const { isConfirmed } = await Swal.fire({
//             title: 'Are you sure?',
//             text: 'Do you want to save the new order of images?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, save it!',
//             cancelButtonText: 'No, cancel!'
//         });
    
//         if (isConfirmed) {
//             try {
//                 const response = await api.put('/api/user/reorder', { images: items });
//                 console.log('response', response);
//                 Swal.fire('Saved!', 'Your image order has been saved.', 'success');
//                 fetchImages()
//             } catch (error) {
//                 console.log('error', error);
//                 Swal.fire('Error!', 'There was an error saving the order.', 'error');
//             }
//         } else {
//             setImages(images);
//             Swal.fire('Cancelled', 'Your image order is unchanged.', 'info');
//         }
//     };
    
//     const handleOpen = () => {
//         setModalOpen(true);
//     };
//  const handleClose=()=>{
//     setModalOpen(false)
//  }

//  const handleDelete = async (id:number) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to mark this image as deleted?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//     });
  
//     // If the user confirms, proceed with deletion
//     if (result.isConfirmed) {
//       try {
//         const response = await api.delete(`/api/user/deleteImage/${id}`); // Assuming your delete endpoint includes the image ID in the URL
//         console.log('Response:', response);
        
//         // Optionally, show success message
//         Swal.fire({
//           title: 'Deleted!',
//           text: 'The image has been marked as deleted.',
//           icon: 'success',
//         });
        
//         fetchImages(); 
//       } catch (error) {
//         console.log('Error:', error);
//         Swal.fire({
//           title: 'Error!',
//           text: 'There was an issue deleting the image.',
//           icon: 'error',
//         });
//       }
//     }
//   };
//   return (
//     <>
//         <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
//             <h1 className='text-white font-extrabold text-4xl mb-8 pt-12'>Image Gallery</h1>
            
//             <button 
//                 onClick={handleOpen}
//                 className='z-10 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full p-4 shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-600 transition-all duration-300 ease-in-out transform hover:scale-110 fixed right-6 bottom-6 flex justify-center items-center'
//                 aria-label="Add new item"
//             >
//                 <FaPlus className="mr-2" />
//                 Add Item
//             </button>

//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <Droppable droppableId="droppable">
//                     {(provided) => (
//                         <div
//                             className="grid grid-cols-1 bg-gray-900 rounded-xl sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full max-w-4xl p-6"
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                         >
//                             {images.length === 0 ? (
//                                 <div className="text-white text-center w-full">
//                                     <p className="text-lg">No images found</p>
//                                 </div>
//                             ) : (
//                                 images.map((item, index) => (
//                                     <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
//                                         {(provided) => (
//                                             <div
//                                                 className={`bg-white p-4 w-[70%] mx-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${selectedImages.includes(item.id) ? 'border-4 border-blue-400' : 'border border-gray-200'}`}
//                                                 onClick={() => toggleSelectImage(item.id)}
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                             >
//                                                 <div className="relative">
//                                                     <img 
//                                                         src={item.src} 
//                                                         className="w-full h-64 object-contain rounded-lg mb-4" 
//                                                     />
                                                    
//                                                     <button
//                                                         onClick={(e) => {
//                                                             e.stopPropagation(); 
//                                                             handleDelete(item.id);
//                                                         }}
//                                                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
//                                                         aria-label="Delete"
//                                                     >
//                                                         <FaTrash className="h-5 w-5" />
//                                                     </button>
//                                                 </div>
//                                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2 rounded-b-lg">
//                                                     <p className="text-center text-red-900 text-2xl font-bold">{item.title}</p>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))
//                             )}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//         </div>
//         <AddImageModal isOpen={modalOpen} onClose={handleClose} fetchImages={fetchImages}/>
//     </>
// );

// }


// export default Home;
import React, { useEffect, useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
import { FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AddImageModal from '../components/modal/AddImageModal';

interface ImageItem {
  id: string;
  title: string;
  src: string;
  order: number;
}

function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [items, setItems] = useState(images);
      const [modalOpen,setModalOpen]=useState<boolean>(false)
      const [loading, setLoading] = useState(true); // Loading state


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
        setLoading(true);

      const response = await api.get('/api/user/home');
      const fetchedImages = response.data.images.map((image: any) => ({
        id: image._id,
        title: image.title,
        src: image.url,
        order: image.order
      }));
      console.log('d',fetchedImages)
      setImages(fetchedImages);
      setItems(fetchedImages); // Initialize items with fetched images
      setLoading(false);

    } catch (error) {
        setLoading(false);

      console.error('Error fetching images:', error);
    }
  };

  const onChange=async(sourceId: string, sourceIndex: number, targetIndex: number, targetId: string)=> {
    console.log('so',sourceId)
    console.log('index',sourceIndex)
    console.log('tae',targetIndex)
    console.log('idd',targetId)
    console.log('ima',images)
    const nextState = swap(images, sourceIndex, targetIndex);
    console.log('ne',nextState)
    console.log('i',items)
    console.log('ima',images)

    setItems(nextState);
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
                const response = await api.put('/api/user/reorder', { images: nextState });
                console.log('response', response);
                Swal.fire('Saved!', 'Your image order has been saved.', 'success');
                fetchImages()
            } catch (error) {
                console.log('error', error);
                Swal.fire('Error!', 'There was an error saving the order.', 'error');
            }
        } else {
            setItems(images);
            Swal.fire('Cancelled', 'Your image order is unchanged.', 'info');
        }

    
  }
      const handleOpen = () => {
        setModalOpen(true);
    };
 const handleClose=()=>{
    setModalOpen(false)
 }

  return (
    <>
      
      <GridContextProvider onChange={onChange}>
  <div className="flex flex-col items-center bg-black min-h-screen py-10 px-6 sm:px-12 lg:px-20">
    
    <h1 className="text-3xl font-bold text-white mb-8 mt-12">
      Manage Your Image Collection
    </h1>
    <p className="text-lg text-gray-300 mb-6 text-center max-w-3xl">
      Add, drag, and arrange your images effortlessly. Click "Add Item" to upload new images and organize them to suit your style.
    </p>

   

    {loading ? (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-300">
            <FaSpinner className="animate-spin h-10 w-10 text-green-500" />
            <p className="text-lg font-semibold">Loading items...</p>
          </div>
        ) :
    items.length > 0 ? (
        
      <GridDropZone
        id="items"
        boxesPerRow={4}
        rowHeight={240}
        className={`bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl shadow-lg 
            ${items.length > 8 ? 'overflow-y-scroll' : 'overflow-y-hidden'} 
            overflow-x-hidden`}
                  style={{
          height: "500px",
          width: "80%",
          padding: '1rem',
          border: '1px solid rgba(0, 0, 0, 0.2)',
        }}
      >
        {items.map((item) => (
          <GridItem key={item.id}>
            <div
              className="bg-black rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center p-4 hover:shadow-xl relative"
              style={{
                height: "220px",
                margin: "8px",
                width: "85%",
              }}
            >
              <div className="flex items-center justify-center h-3/4 w-full">
                <img src={item.src} alt={item.title} className="h-full w-auto rounded-md object-contain" />
              </div>
              <div className="mt-3 text-center text-base font-semibold text-gray-200 bg-gray-800 bg-opacity-80 rounded-md px-2 py-1">
                {item.title}
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDelete(item.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                aria-label="Delete"
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          </GridItem>
        ))}
         <button 
      onClick={handleOpen}
      className="z-10 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full p-5 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-110 fixed right-6 top-[15%] flex items-center justify-center"
      aria-label="Add new item"
    >
      <FaPlus className="mr-2 text-lg" />
      Add Item
    </button>
      </GridDropZone>
      
    ) : (
      // No Images Found Message
      <div className="flex flex-col items-center justify-center m- w-full text-gray-300">
        <p className="text-4xl font-semibold">No Images Found</p>
        <button 
      onClick={handleOpen}
      className="z-10 bg-yellow-500 text-white rounded-full p-5 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-110 fixed top-[50%] flex items-center justify-center"
      aria-label="Add new item"
    >
      <FaPlus className="mr-2 text-lg" />
      Add Item 
    </button>

      </div>
    )}
  </div>
</GridContextProvider>



      <AddImageModal isOpen={modalOpen} onClose={handleClose} fetchImages={fetchImages} />
    </>
  );

}
export default Home;