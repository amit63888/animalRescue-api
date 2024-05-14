 import path from "path";
export const uploadImgFile = (uploadPath: string, file: any) => {
  return new Promise<string>((resolve, reject) => {
    const fileName = file.name.replace(/\s+/g, '_');  
    const filePath = path.join(uploadPath, fileName); // Construct the upload path
    file.mv(filePath, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
};
 export const validateFile = (file: any) => {
  // Define allowed file types
  const allowedTypes = ['image/jpeg','image/png'];
  // Define max file size (in bytes)
  const maxSize = 5 * 1024 * 1024;  
  if (!allowedTypes.includes(file.mimetype)) {
      return 'Invalid file type. Only JPEG and PNG files are allowed.';
  } 
  if (file.size > maxSize) {
      return 'File size exceeds the maximum allowed size of 5 MB.';
  } 
  return null;
};




// login 

// pro
// pass

// otp 
// tocken
// emil //

// /////
// login==
// emil 
// pass





// Login
// [
// 	{
// 		"id":objectId(),
// 		"userId": User_Collection -> ObjectId(user_id)
// 		"email":"",
// 		"password":"",
// 		"salt": "",
// 		"lastLoggin": "Last IP",
// 		"currentLogin":"Currect IP"
// 		"lastLoginTime":"",
// 		"currentLoginTime":""
// 	}
// ]
 
// User
// [
// 	{
// 		"id":"",
// 		"roleId":"",
// 		"firstName":""
// 		"lastName":"",
// 		"mobileNumber":"",
// 		"latLng":{
// 			"lat":0000,
// 			"lng": 000
// 		},
// 		"radius":"",
// 		"photo":"",
// 		"status":"0/1/90",
// 	}
// ]
 
// Cases
// [
// 	{
// 		"id"
// 	}
// ]
 
// Log
// [
// 	{
// 		"id":"",
// 		"userId": User_Collection -> ObjectId(user_id),
// 		"activity":
// 	}
// ]
 
 
// {"email":anoop@techwagger.com,"time:"","activity":"user login","Message":"User "}
 
 
// Uploads
// 	-> UserID
// 		-> CaseID1
// 			-> Thumbnail
// 			-> image.png
// 		-> CaseID2
// 			-> Thumbnail
// 			-> image.png
// has context menu