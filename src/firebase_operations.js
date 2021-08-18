 
import firebase from './firebase'

export {getPosts, getUsers, addPost, deletePost}

const dbPosts =  firebase.firestore().collection('posts')
const authorizedUsers = firebase.firestore().collection('users')

function getPosts(setLoading, setPosts) {
    setLoading(true)
    dbPosts.onSnapshot( (querySnapshot) => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push({...doc.data(), id: doc.id})
      });
      setPosts(items)
      setLoading(false)
    })
  }

  function getUsers(setLoadingUsers, setUsers) {
    setLoadingUsers(true)
    authorizedUsers.get().then((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data().email)
      });
      setUsers(items)
      setLoadingUsers(false)
    });
}

  async function addPost(title, message, imgData, setLoading) {
    setLoading(true)
    let image;
    isString(imgData) ? image = imgData : image = await uploadImage(imgData)

    dbPosts.doc().set({
        title: title,
        message: message,
        image: image,
        store: !isString(imgData)
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    setLoading(false)
  }

  async function uploadImage(file) {
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    return await fileRef.getDownloadURL()
  }

  const isString = (val) => typeof val === 'string' || val instanceof String


  function deletePost(post, setLoading) {
    setLoading(true)
    dbPosts.doc(post.id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
      post.store && deleteImage(post)
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
    setLoading(false)
  }

  function deleteImage(post) {
      var desertRef = firebase.storage().refFromURL(post.image)
      desertRef.delete()
      .then(() => {
        console.log('deleted image from storage successfully')
      })
      .catch( 
        () => console.log('error occured on the storage cloud')
      );
  }