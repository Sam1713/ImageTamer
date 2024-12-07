


// import React, { useEffect, useState } from "react";
// import {
//   GridContextProvider,
//   GridDropZone,
//   GridItem,
//   swap
// } from "react-grid-dnd";
// import { FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import AddImageModal from '../components/modal/AddImageModal';
// import api from '../components/api/Api'

// interface ImageItem {
//   _id: string;
//   title: string;
//   src: string;
//   order: number;
// }

// interface ImageItem {
//     id: number;
//     title: string;
//     src: string;
// }

// interface ResponseType{
//     _id:string
//     url:string;
//     order:number;
//     title:string;
//     createdAt?:string;
//     isDelete?:boolean
// }
// const Home:React.FC=()=> {
//   const [images, setImages] = useState<ImageItem[]>([]);
//   const [items, setItems] = useState(images);
//       const [modalOpen,setModalOpen]=useState<boolean>(false)
//       const [loading, setLoading] = useState(true); // Loading state


//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//         setLoading(true);

//       const response = await api.get('/api/user/home');
//       const fetchedImages = response.data.images.map((image: ResponseType) => ({
//         id: image._id,
//         title: image.title,
//         src: image.url,
//         order: image.order
//       }));
//       console.log('d',fetchedImages)
//       setImages(fetchedImages);
//       setItems(fetchedImages); 
//       setLoading(false);

//     } catch (error) {
//         setLoading(false);

//       console.error('Error fetching images:', error);
//     }
//   };

//   const onChange=async(sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string)=> {
//     console.log('so',sourceId)
//     console.log('index',sourceIndex)
//     console.log('tae',targetIndex)
//     console.log('idd',targetId)
//     console.log('ima',images)
//     const nextState = swap(images, sourceIndex, targetIndex);
//     console.log('ne',nextState)
//     console.log('i',items)
//     console.log('ima',images)

//     setItems(nextState);
//             const { isConfirmed } = await Swal.fire({
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
//                 const response = await api.put('/api/user/reorder', { images: nextState });
//                 console.log('response', response);
//                 Swal.fire('Saved!', 'Your image order has been saved.', 'success');
//                 fetchImages()
//             } catch (error) {
//                 console.log('error', error);
//                 Swal.fire('Error!', 'There was an error saving the order.', 'error');
//             }
//         } else {
//             setItems(images);
//             Swal.fire('Cancelled', 'Your image order is unchanged.', 'info');
//         }

    
//   }
//       const handleOpen = () => {
//         setModalOpen(true);
//     };
//  const handleClose=()=>{
//     setModalOpen(false)
//  }

//   const handleDelete = async (id:number) => {
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
  
//     if (result.isConfirmed) {
//       try {
//         const response = await api.delete(`/api/user/deleteImage/${id}`); // Assuming your delete endpoint includes the image ID in the URL
//         console.log('Response:', response);
        
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
// }

//   return (
//     <>
      
//       <GridContextProvider onChange={onChange}>
//   <div className="flex flex-col items-center bg-black min-h-screen py-10 px-6 sm:px-12 lg:px-20">
    
//     <h1 className="text-3xl font-bold text-white mb-8 mt-12">
//       Manage Your Image Collection
//     </h1>
//     <p className="text-lg text-gray-300 mb-6 text-center max-w-3xl">
//       Add, drag, and arrange your images effortlessly. Click "Add Item" to upload new images and organize them to suit your style.
//     </p>

   

//     {loading ? (
//           <div className="flex flex-col items-center justify-center h-full w-full text-gray-300">
//             <FaSpinner className="animate-spin h-10 w-10 text-green-500" />
//             <p className="text-lg font-semibold">Loading items...</p>
//           </div>
//         ) :
//     items.length > 0 ? (
        
//       <GridDropZone
//         id="items"
//         boxesPerRow={4}
//         rowHeight={240}
//         className={`bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl shadow-lg 
//             ${items.length > 8 ? 'overflow-y-scroll' : 'overflow-y-hidden'} 
//             overflow-x-hidden`}
//                   style={{
//           height: "500px",
//           width: "80%",
//           padding: '1rem',
//           border: '1px solid rgba(0, 0, 0, 0.2)',
//         }}
//       >
//         {items.map((item) => (
//           <GridItem key={item.id}>
//             <div
//               className="bg-black rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center p-4 hover:shadow-xl relative"
//               style={{
//                 height: "220px",
//                 margin: "8px",
//                 width: "85%",
//               }}
//             >
//               <div className="flex items-center justify-center h-3/4 w-full">
//                 <img src={item.src} alt={item.title} className="h-full w-auto rounded-md object-contain" />
//               </div>
//               <div className="mt-3 text-center text-base font-semibold text-gray-200 bg-gray-800 bg-opacity-80 rounded-md px-2 py-1">
//                 {item.title}
//               </div>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); 
//                   handleDelete(item.id);
//                 }}
//                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
//                 aria-label="Delete"
//               >
//                 <FaTrash className="h-3 w-3" />
//               </button>
//             </div>
//           </GridItem>
//         ))}
//          <button 
//       onClick={handleOpen}
//       className="z-10 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full p-5 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-110 fixed right-6 top-[15%] flex items-center justify-center"
//       aria-label="Add new item"
//     >
//       <FaPlus className="mr-2 text-lg" />
//       Add Item
//     </button>
//       </GridDropZone>
      
//     ) : (
//       <div className="flex flex-col items-center justify-center m- w-full text-gray-300">
//         <p className="text-4xl font-semibold">No Images Found</p>
//         <button 
//       onClick={handleOpen}
//       className="z-10 bg-yellow-500 text-white rounded-full p-5 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-110 fixed top-[50%] flex items-center justify-center"
//       aria-label="Add new item"
//     >
//       <FaPlus className="mr-2 text-lg" />
//       Add Item 
//     </button>

//       </div>
//     )}
//   </div>
// </GridContextProvider>



//       <AddImageModal isOpen={modalOpen} onClose={handleClose} fetchImages={fetchImages} />
//     </>
//   );

// }
// export default Home;

import React, { useEffect, useState } from "react";
import { FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AddImageModal from '../components/modal/AddImageModal';
import api from '../components/api/Api';

interface ImageItem {
  id: string;
  title: string;
  src: string;
  order: number;
}

interface ResponseType {
  _id: string;
  url: string;
  order: number;
  title: string;
}

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/user/home');
      const fetchedImages = response.data.images.map((image: ResponseType) => ({
        id: image._id,
        title: image.title,
        src: image.url,
        order: image.order
      }));
      console.log('f',fetchedImages)
      setImages(fetchedImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);
    if (draggedIndex !== index) {
      const updatedImages = [...images];
      const [draggedItem] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(index, 0, draggedItem);
      setImages(updatedImages);

      // Confirm save order
      const { isConfirmed } = await Swal.fire({
        title: 'Save new order?',
        text: 'Do you want to save the new order of images?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
      });

      if (isConfirmed) {
        try {
          await api.put('/api/user/reorder', { images: updatedImages });
          Swal.fire('Saved!', 'Your image order has been saved.', 'success');
          fetchImages(); 
        } catch (error) {
          console.error('Error saving order:', error);
          Swal.fire('Error!', 'There was an error saving the order.', 'error');
          setImages(images);
        }
      } else {
        setImages(images); 
      }
    }
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/user/deleteImage/${id}`);
        Swal.fire('Deleted!', 'The image has been deleted.', 'success');
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
        Swal.fire('Error!', 'There was an issue deleting the image.', 'error');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen py-10 px-6 sm:px-12 lg:px-20">
        <h1 className="text-3xl font-bold text-white mb-8 mt-12">Manage Your Image Collection</h1>
        <p className="text-lg text-gray-300 mb-6 text-center max-w-3xl">
          Add, drag, and arrange your images effortlessly. Click "Add Item" to upload new images.
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-300">
            <FaSpinner className="animate-spin h-10 w-10 text-green-500" />
            <p className="text-lg font-semibold">Loading items...</p>
          </div>
        ) : (
<div   
          className={`grid md:grid-cols-4 lg:grid-cols-4 gap-4 w-4/5 bg-gradient-to-r from-green-400 to-teal-500 p-8 rounded-xl 
            ${images.length > 8 ? 'overflow-y-scroll max-h-[500px]' : 'overflow-y-hidden'}`}
        >         {images.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-black  rounded-lg shadow-md flex flex-col items-center p-4 relative transition-transform transform hover:scale-105"
              style={{ height: "220px" }}
            >
              <div className="relative group">
  <img
    src={item.src}
    alt={item.title}
    className="h-[20vh] w-auto rounded-md object-cover transition duration-300 ease-in-out transform group-hover:blur-sm"
  />
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
    <span className="text-2xl font-bold bg-cyan-500 bg-clip-text text-transparent">
      {item.title}
    </span>
  </div>
</div>

              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Delete"
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          ))}
          
            <button
              onClick={handleOpen}
              className="z-10 bg-green-500 text-white rounded-full p-5 shadow-xl hover:shadow-2xl fixed right-6 top-[15%] flex items-center justify-center"
              aria-label="Add new item"
            >
              <FaPlus className="mr-2 text-lg" />
              Add Item
            </button>
          </div>
        )}
      </div>

      <AddImageModal isOpen={modalOpen} onClose={handleClose} fetchImages={fetchImages} />
    </>
  );
};

export default Home;
