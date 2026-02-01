import './App.css';
import 'leaflet/dist/leaflet.css';
import { useEffect,useState } from 'react';
import {isEmpty, update} from "lodash";
import { Form, Button} from "react-bootstrap";
import "./index.css";


function Inputform({mountain, setClimbed}) {
  const [dateClimbed, setDateClimbed] = useState(JSON.parse(localStorage.getItem(mountain.name)) || "00-00-0000")
  const [climbedWith, setClimbedWith] = useState(JSON.parse(localStorage.getItem(mountain.name)) || null)
  const [description, setDescription] = useState(JSON.parse(localStorage.getItem(mountain.name)) || null)
  const [mountainData,setMountainData] = useState(JSON.parse(localStorage.getItem(mountain.name)) || 0)

  useEffect(()=>{
    updateInfo();
  },[mountain])

  const handleSubmit = (event) => {
    //update the local storage
    event.preventDefault();
    saveLogForm(mountain)
  }

  const updateInfo = () => {
    setDateClimbed(JSON.parse(localStorage.getItem(mountain.name)) || null);
    setClimbedWith(JSON.parse(localStorage.getItem(mountain.name)) || null);
    setDescription(JSON.parse(localStorage.getItem(mountain.name)) || null);
    setMountainData(JSON.parse(localStorage.getItem(mountain.name)) || 0);
  }

  const saveLogForm = (mountain) => {
    const newLogs = [dateClimbed, climbedWith, description];
    localStorage.setItem(mountain.name, JSON.stringify(newLogs));
    setClimbed(() => {
      return new Set(Object.keys(localStorage));
    });
    updateInfo();
  };

  const deleteLog = (mountain) => {
    if (mountain) {
      localStorage.removeItem(mountain.name);
      setMountainData(JSON.parse(localStorage.getItem(mountain.name)) || 0)
      setClimbed(() => {
        return new Set(Object.keys(localStorage));
      });
    }
  };

  return (
    <div className="inputForm">


      {mountainData ? (
          <div>
            <p>Climbed on: {mountainData[0]}</p>
            <p>With: {mountainData[1]}</p>
            <p><em>"{mountainData[2]}"</em></p>
            <button onClick={() => deleteLog(mountain)}>Delete Log</button>
          </div>
        ) : (
        <Form onSubmit={handleSubmit}>
          <h1 className="mountainLabel">{mountain.name}</h1>
          <Form.Group controlId="body">
            <Form.Label className="inputLabels">description</Form.Label>
            <Form.Control className="inputText" name="descriptionBody" as="textarea" placeholder="Enter a description of the mountain" onChange={(e) => setDescription(e.target.value)}/>
            <p></p>
            <Form.Label className="inputLabels">Who did you climbed it with</Form.Label>
            <Form.Control className="inputText" name="whoClimbed" as="textarea" placeholder="Who did you climb this with" onChange={(e) => setClimbedWith(e.target.value)}/>
            <Form.Label className="inputLabels">date it was climbed {dateClimbed}</Form.Label>
            <input type="date" value={"value"} onChange={(e) => setDateClimbed(e.target.value)}/>
            <button type="submit">Submit</button>
          </Form.Group>
        </Form>
        )}



    </div>
  );
}

export default Inputform;
