import React, {
  useState,
  useEffect
} from 'react'
import { app } from './base';
import './App.css'
const db = app.firestore()

function App() {
  const [fileUrl, setFileUrl] = useState(null);
  const [collection, setCollection] = useState([]);
  const onFileChange = async e => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL())
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const userName = e.target.username.value;
    if (!userName) return;
    await db.collection("album").doc(userName).set({
      name: userName,
      image: fileUrl,
      test: new Date().getTime()
    })
    e.target.reset();
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollections = await db.collection("album").orderBy('test', 'desc').get();
      setCollection(userCollections.docs.map(doc => {
        console.log(doc.data());
        return doc.data();
      }))
    }
    fetchUsers();
  }, [])

  return (
    <div className="App" onSubmit={handleSubmit}>
      <form>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" />
        <button onSubmit={handleSubmit}>Upload</button>
      </form>
      {collection.map(data => (
        <React.Fragment key={data.image}>
          <img src={data.image} />
          <p>{data.name}</p>
        </React.Fragment>
      ))}
    </div>
  )
}

export default App
