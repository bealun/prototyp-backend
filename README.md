# Tech Test

The challenge is to create a file archive with both frontend and backend in preferred tech stack. 

## Code

For backend I've used:
  * **Node.js**
  * **Express.js**
  * **Mongoose**
  * **MongoDB**
  * **Restful API**


## Endpoints

GET: 
 * /uploads
 *lists all uploads

POST: 
 * /uploads
 *sends metadata with only text
 
 * /uploads/:id/files
 *file uploads, connects with metadata and updates with file
 
DELETE:
 * /uploads/:id
 *find uploads via id and deletes item

## Reflection

Using Cloudinary to store files of pdf and jpeg types. The models of the input are made with mongoose and determines what the input should look like. I then started by creating a POST request with only text followed by a GET to retrive data. Moving on to be able to upload files that connect to the metadata with new POST where I took advantage of the findOneAndUpdate from mongoose. The endpoint updates the existing data with the uploaded file. Magic! Finished with making the delete endpoint. Finding items by id and then deleting with mongoose method findOneandDelete.

Backend wise, this assignment was a thrill to build! Not that much code for a lot of functionality. If I had more time I would have liked to made login for users to be authenitcated before uploading files, be able to clear whole list and also categories the files and descriptions.
