import Map, { Marker, Popup } from 'react-map-gl';
import { Room } from '@mui/icons-material'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react'
import Star from '@mui/icons-material/Star';
import './App.css';
import axios from 'axios'
// import { format } from 'timeago.js'

function App() {

  const currentUsername = "john"
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 3,
  });

  // const handleMarkerClick = (id, lat, long) => {
  //   setCurrentPlaceId(id);
  //   setViewport({ ...viewport, latitude: lat, longitude: long });

  // };


  // using lat lng from event by destruturing
  const handleAddClick = (e) => {
    const { lngLat } = e;
    setNewPlace({
      latitude: lngLat.lat,
      longitude: lngLat.lng
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/pins", newPin);
      // ...pins means all same except whats different in res.data
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };


  const getPins = async () => {
    try {
      // to get the data from the server we use axios
      const res = await axios.get("http://localhost:3000/api/pins") // here we dont give full location becoz of proxy
      setPins(res.data)  // every data in res
      getPins()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getPins()
  }, );

  return (
    <Map
      style={{ width: '98vw', height: '97vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={handleAddClick}
      transitionDuration="400"
    // {...viewport}

    >
      {/* setting map for pin */}
      {/* {pins.map(p=>())}  // it looks like this */}

      {pins.map(p => (
        <div key={p._id}>
          {/* // it will create a marker and a popup for each pin */}
          <Marker
            key={p._id}
            longitude={p.longitude}
            latitude={p.latitude}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          // anchor="bottom" 
          >

            <Room key={p._id} className="Room" style={{ fontSize: viewport.zoom * 10, color: "red" }}
            // onClick={() => handleMarkerClick(p._id, p.latitude, p.longitude)}
            />

          </Marker>
          {p._id === currentPlaceId && (
            <Popup key={p._id} longitude={p.longitude} latitude={p.latitude} closeButton={true} closeOnClick={false} onClose={() => setCurrentPlaceId(null)}
              anchor="top"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  {Array(p.rating).fill(<Star className="star" />)}

                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username} </b>
                </span>
                {/* <span className="date">{format(p.createdAt)}</span> */}
              </div>
            </Popup>
          )}
        </div>
      ))}
      {/* now on double click the new popup will appear at the given lat and long */}
      {newPlace && (
        <>
          <Marker
            longitude={newPlace.longitude}
            latitude={newPlace.latitude}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
            anchor="bottom"
          >

            <Room className="Room" style={{ fontSize: viewport.zoom * 10, color: "red" }}
            />

          </Marker>
          <Popup longitude={newPlace.longitude} latitude={newPlace.latitude} closeButton={true} closeOnClick={false} onClose={() => setNewPlace(null)}
            anchor="top"
          >
            <div>
              <form onSubmit={handleSubmit}>
                {/* <form> */}
                <label>Title</label>
                <input type="text" placeholder='Enter the Title' onChange={(e) => setTitle(e.target.value)} />
                <label>Description</label>
                <textarea id="" cols="30" rows="10" placeholder='Tell us more' onChange={(e) => setDesc(e.target.value)} />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className='submitButton' type='submit'>Add pin</button>
              </form>
            </div>
          </Popup>
        </>

      )}


    </Map>
  );
}


export default App;



