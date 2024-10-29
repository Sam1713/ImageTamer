import { Request, Response, NextFunction } from "express";
import ImageModel from "../models/imageModel"; // Adjust this import
import cloudinary from "../utils/cloudinary";

export const postImages = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log('Started uploading images');
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const userId = req.user?.id; 
    let titles: string[] = Array.isArray(req.body.titles) ? req.body.titles : [req.body.titles];

    console.log('title',req.body.titles)
    console.log('ri',titles)
    let fileUrls: { url: string; title: string; order: number }[] = [];

    console.log('tit',titles.length)
    console.log('file',files.length)
    // if (titles.length !== files.length) {
    //   return res.status(400).json({ message: 'Number of titles must match the number of files' });
    // }

    const existingImages = await ImageModel.find({ userId }).select('files.order');

    const currentMaxOrder = existingImages.reduce((max, img) => {
      const maxOrderInImage = img.files.reduce((innerMax, file) => {
        return file.order ? Math.max(innerMax, file.order) : innerMax;
      }, 0);
      return Math.max(max, maxOrderInImage);
    }, 0) || 0;

    const fileUploads = await Promise.all(
      files.map(async (file, index) => {
        const result = await cloudinary.uploader.upload(file.path);
        return { 
          url: result.secure_url, 
          title: titles[index], 
          order: currentMaxOrder + index + 1, 
          isDelete:false
        }; 
      })
    );

    fileUrls = await Promise.all(fileUploads);
    console.log('fi',fileUrls)

    const newImage = new ImageModel({
      userId: userId,
      files: fileUrls,
    });

    await newImage.save();
    console.log('fi',fileUrls)
    res.status(200).json({
      message: 'Images uploaded and saved successfully',
      images: fileUrls,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Error uploading images' });
  }
};

export const homePage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.user?.id;

    const userImages = await ImageModel.find({ userId: userId});
    console.log('us',userImages)

    if (!userImages || userImages.length === 0) {
      return res.status(404).json({ message: 'No images found for this user' });
    }

    const sortedImages = userImages
      .flatMap(img => img.files.filter(file => !file.isDelete)) // Exclude deleted images
      .sort((a, b) => b.order - a.order); 

    console.log('fi', sortedImages);
    res.status(200).json({
      message: 'Images retrieved successfully',
      images: sortedImages,
    });
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ message: 'Error retrieving images' });
  }
};

export const rearrangeImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { images } = req.body; 
    console.log('ima', images);

    if (!Array.isArray(images) || images.length === 0) {
      res.status(400).json({ message: 'Invalid data: images should be a non-empty array.' });
    }
    let imgLength=images.length
    const updatedImages = images.map((image:any, index:number) => ({
      ...image,
      order: imgLength--
    }));
    console.log('upa',updatedImages)

    const updatePromises = updatedImages.map(async (image: { id: string; order: number }) => {
      if (typeof image.id !== 'string' || !image.id.trim() || typeof image.order !== 'number') {
        throw new Error(`Invalid image data: ${JSON.stringify(image)}`); 
      }

      await ImageModel.updateOne(
        { "files._id": image.id }, 
        { $set: { "files.$.order": image.order } } 
      );
    });
    console.log('upa',updatePromises)
    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Image orders updated successfully' });
  } catch (error) {
    console.error('Error updating image orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const deleteImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id; 
  const imageId = req.params.id as string; 

  try {
    // Find the image in the database
    const image = await ImageModel.findOne({ userId, 'files._id': imageId });

    if (!image) {
    res.status(404).json({ message: 'Image not found' });
    }

    // Find the specific file to mark as deleted
    const fileToDelete:any = image?.files.find(file => file._id.toString() === imageId);
    
    if (!fileToDelete) {
      res.status(404).json({ message: 'File not found in image' });
    }

    console.log('f',fileToDelete)

    // Mark the file as deleted
    fileToDelete.isDelete = true; // Assuming you have an isDelete field in your file object
    
    // Save the updated image document
    await image?.save();

    res.status(200).json({ message: 'Image marked as deleted successfully' });
  } catch (error) {
    console.error('Error marking image as deleted:', error);
    res.status(500).json({ message: 'Error marking image as deleted' });
  }
};
