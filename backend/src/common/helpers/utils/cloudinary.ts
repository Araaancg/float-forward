// import { v2 as cloudinary } from 'cloudinary'

// // cloudinary.config({
// //   cloud_name: CLOUDINARY.CLOUD_NAME,
// //   api_key: CLOUDINARY.API_KEY,
// //   api_secret: CLOUDINARY.API_SECRET
// // })

// export const uploader = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream({
//       resource_type: 'image'
//     }, (error, result) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(result)
//       }
//     })

//     uploadStream.end(fileBuffer.buffer)
//   })
// }
