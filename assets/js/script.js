// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCi1x-ypNDm4hPKb__ystUoNC2nvWM2ihA",
    authDomain: "pastrygenic-9203d.firebaseapp.com",
    databaseURL: "https://pastrygenic-9203d-default-rtdb.firebaseio.com",
    projectId: "pastrygenic-9203d",
    storageBucket: "pastrygenic-9203d.appspot.com",
    messagingSenderId: "126423739741",
    appId: "1:126423739741:web:a717e7d825f1a36696ccb4",
    measurementId: "G-6T1ELNVG02"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Storage service and RTDB
var storageRef = firebase.storage().ref();
var databaseRef = firebase.database().ref("images");

// Function to upload an image to Firebase Storage and save the URL to RTDB
function uploadImage(file) {
  var filename = file.name;
  var storageFileRef = storageRef.child(filename);
  
  // Upload the file to Firebase Storage
  storageFileRef.put(file).then(function(snapshot) {
    console.log('Image uploaded:', snapshot.metadata.fullPath);
    
    // Get the download URL of the uploaded image
    snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('Download URL:', downloadURL);
      
      // Save the download URL to RTDB
      var imageKey = databaseRef.push().key;
      databaseRef.child(imageKey).set(downloadURL);
      console.log('Image URL saved to RTDB:', downloadURL);
    });
  }).catch(function(error) {
    console.error('Error uploading image:', error);
  });
}

// Example usage with an array of files
var files = [file1, file2, file3]; // Replace with your actual file objects

files.forEach(function(file) {
  uploadImage(file);
});
