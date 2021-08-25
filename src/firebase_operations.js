 import firebase from './firebase'
 import { nanoid } from 'nanoid'

export {getPosts, getUsers, addPost, deletePost, addLike, getCommentsByPostId, addComment, deleteComment, getRankings}

const dbPosts =  firebase.firestore().collection('posts')
const authorizedUsers = firebase.firestore().collection('users')

function getCommentsByPostId(postId, setComments) {
  const unsubscribe = dbPosts.doc(postId).onSnapshot((doc) => {
    if(doc.data())
      setComments(doc.data().comments);
  });
  return unsubscribe
}

async function addComment(user, postId, setComments, comment) {
  const postRef = dbPosts.doc(postId);
  const contents = {
    author: {
      name: user.displayName, 
      email: user.email, 
      avatar: user.providerData[0].photoURL
    },
    dateTime: getDate(),
    comment: comment.trim(),
    id: nanoid()
  }
  try {
    await firebase.firestore().runTransaction(async transaction => {
      const doc = await transaction.get(postRef);
      if (!doc.data().comments) {
        setComments([contents]);
        transaction.set({ comments: [contents] });
      } else {
        let totalComments = doc.data().comments;
        totalComments.unshift(contents);
        setComments(totalComments);
        transaction.update(postRef, { comments: totalComments });
      }
    })
    console.log("Transaction successfully committed!");
  } catch (error) {
    console.log("Transaction failed: ", error)
  }
}

async function deleteComment(commentToDelete, postId) {
  dbPosts.doc(postId).update({
    "comments": firebase.firestore.FieldValue.arrayRemove(commentToDelete)
  })
}


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
  setLoadingUsers && setLoadingUsers(true)
  authorizedUsers.get().then((querySnapshot) => {
    const items = []
    querySnapshot.forEach((doc) => {
      items.push(doc.data().email)
    });
    setUsers(items)
    setLoadingUsers && setLoadingUsers(false)
  });
}

function getRankings(setLoading, posts, setRankings) {
  setLoading(true)
  const users = []
  authorizedUsers.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      users.push({email: doc.data().email})
    });
  }).then(() => {
    const rankings = users.map(user => {
      const foundUser = posts.find(p => p.author.email === user.email)
      return {
        name: foundUser?.author.name,
        totalPosts: posts.filter(post => post.author.email === user.email).length,
        avatar: foundUser?.author.avatar,
      }
    })
    .filter(el => el.name !== undefined)
    .sort((a, b) => {
      return b.totalPosts - a.totalPosts
    })
    setRankings(rankings)
    setLoading(false)
  })
}

async function addPost(message, imgData, setLoading, currentUser) {
  setLoading(true)
  let image;
  
  isString(imgData) ? image = imgData : image = await uploadImage(imgData)

  dbPosts.doc().set({
      message: message,
      image: image,
      author: {
        email: currentUser.email, 
        name: currentUser.displayName,
        avatar: currentUser.providerData[0].photoURL
      },
      dateTime: getDate(),
      dateTimeSort: getDateForSort(),
      store: !isString(imgData),
      likes: [],
      comments: []
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
  return date.toLocaleString('en-GB',
    {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric'}
  );
}

async function addLike(user, post, setLikes) {
  const postRef = dbPosts.doc(post.id);
  const contents = {name: user.displayName, email: user.email, avatar: user.providerData[0].photoURL}
  try {
    await firebase.firestore().runTransaction(transaction => {
      return transaction.get(postRef).then(doc => {
        if (!doc.data().likes) {
          setLikes([contents])
          transaction.set({
            likes: [contents]
          })
        } else {
          let totalLikes = doc.data().likes
          totalLikes.map(el => el.email).includes(user.email) 
          ? totalLikes = totalLikes.filter(el => el.email !== user.email) 
          : totalLikes.push(contents)
          setLikes(totalLikes)
          transaction.update(postRef, { likes: totalLikes })
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