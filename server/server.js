import app from './app.js'

import connectToDb from './config/dbConnection.js';
import cloudinary from 'cloudinary';
cloudinary();



const PORT= process.env.PORT || 5000;

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(PORT,async()=>{

    await connectToDb();


    console.log(`App is Running at http:localhost:${PORT}`);
})
