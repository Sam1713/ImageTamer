import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    files: [
      {
        url: { type: String, required: true },  // Image URL or path
        title: { type: String, required: true }, // Title for the image
        order: { type: Number, required: true },  // Order for the image
        isDelete:{
          type:Boolean
        },
        createdAt: { type: Date, default: Date.now }
      },
    ],
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;