import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./styles/add.seminar.module.css";
import img from "../../../assets/headimgadd.png";
import ImgHead from "./img.head";
import { useNavigate } from "react-router-dom";

const AddSeminar = () => {
  const [seminarData, setSeminarData] = useState({});
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ValidateToken(getUser);
    console.log(user);
  }, []);

  function ValidateToken(callback) {
    //send axios request to server to validate token with custom header
    // When the browser has both tokens got from google and our server, It will throw an error
    axios
      .post(
        "http://localhost:8000/users/validatetoken",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.data._id);
        callback(res.data.data._id);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  const getUser = async (_id) => {
    const user = await axios.get(`http://localhost:8000/users/${_id}`);
    setUser(user.data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSeminarData({ ...seminarData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const seminar = {
      seminarDate: seminarData.seminarDate,
      seminarTime: seminarData.seminarTime,
      seminarLocation: seminarData.seminarLocation,
      seminarLocationDis: seminarData.seminarLocationDis,
      seminarDescription: seminarData.seminarDescription,
    };

    axios
      .post("http://localhost:8000/seminars/new", seminar, {
        withCredentials: true,
      })
      .then(() => {
        alert("Add item successful!");
        navigate("/seminars");
      })
      .catch((err) => {
        alert("Add item failed, " + err.response.data.message);
      });
  };
  return (
    <div>
      <section className={styles.contact}>
        <ImgHead name="Added by us" title="Seminar Sessions" cover={img} />
        <div className={styles.container}>
          <form className={styles.shadow}>
            <h4>Fillup The Form</h4> <br />
            <div className={styles.shadow1}>
              <input
                type="text"
                id="seminardate"
                name="seminarDate"
                value={seminarData.seminarDate}
                onChange={handleInputChange}
                required
                className={styles.shadowin}
                placeholder="Date"
              />

              <input
                type="text"
                id="seminartime"
                name="seminarTime"
                value={seminarData.seminarTime}
                onChange={handleInputChange}
                required
                className={styles.shadowin}
                placeholder="Time"
              />

              <input
                type="text"
                id="seminarlocation"
                name="seminarLocation"
                value={seminarData.seminarLocation}
                onChange={handleInputChange}
                required
                className={styles.shadowin}
                placeholder="Location"
              />
            </div>
            <div>
              <input
                type="text"
                id="sseminarlocationdis"
                name="seminarLocationDis"
                value={seminarData.seminarLocationDis}
                onChange={handleInputChange}
                required
                className={styles.shadowin}
                placeholder="Location Description"
              />
            </div>
            <textarea
              cols="30"
              rows="5"
              id="seminardescription"
              name="seminarDescription"
              value={seminarData.seminarDescription}
              onChange={handleInputChange}
              required
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
            {/* <button>Submit Request</button> */}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddSeminar;
