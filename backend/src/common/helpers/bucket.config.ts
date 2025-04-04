import { Storage } from "@google-cloud/storage";

// Get the 'PROJECT_ID' and 'KEYFILENAME' environment variables from the .env file
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;

// Create a new Storage object with the specified project ID and key file
const storage = new Storage({ projectId, keyFilename });

// Define an asynchronous function to upload a file to Google Cloud Storage
export default async function uploadFile(bucketName: string, file: any, fileOutputName: string) {
  try {
    // Get a reference to the specified bucket
    const bucket = storage.bucket(bucketName);

    // Upload the specified file to the bucket with the given destination name
    const ret = await bucket.upload(file, {
      destination: fileOutputName,
    });

    // Return the result of the upload operation
    return ret;
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error("Error:", error);
  }
}
