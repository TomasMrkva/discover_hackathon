 
import firebase from './firebase'

export {getPosts, getUsers, addPost, deletePost, addLike}

const dbPosts =  firebase.firestore().collection('posts')
const authorizedUsers = firebase.firestore().collection('users')

function getPosts(setLoading, setPosts) {
    setLoading(true)
    dbPosts.orderBy("dateTimeSort", "desc").onSnapshot( (querySnapshot) => {
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

  async function addPost(message, imgData, setLoading, currentUser) {
    setLoading(true)
    let image;
    
    isString(imgData) ? image = imgData : image = await uploadImage(imgData)

    dbPosts.doc().set({
        message: message,
        image: image,
        author: currentUser.displayName,
        authorProfile: currentUser.providerData[0].photoURL,
        dateTime: getDate(),
        dateTimeSort: getDateForSort(),
        store: !isString(imgData),
        likes: []
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    setLoading(false)
  }

  const getDateForSort = () => new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')


  const getDate = () => {
    const date = new Date(Date().toString());
    return date.toLocaleString('default',
      {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
    );
  }

  async function addLike(user, post, setLikes) {
    console.log(post.id)
    const postRef = dbPosts.doc(post.id);
    try {
      await firebase.firestore().runTransaction(transaction => {
        return transaction.get(postRef).then(doc => {
          if (!doc.data().likes) {
            transaction.set({
              likes: [user.email]
            })
            setLikes([user.email])
          } else {
            let totalLikes = doc.data().likes
            totalLikes.includes(user.email) 
              ? totalLikes = totalLikes.filter(email => email !== user.email) 
              : totalLikes.push(user.email)
            transaction.update(postRef, { likes: totalLikes })
            setLikes(totalLikes)
          }
        })
      })
      console.log("Transaction successfully committed!");
    } catch (error) {
      console.log("Transaction failed: ", error)
    }
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