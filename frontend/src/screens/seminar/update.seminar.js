import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/add.seminar.module.css";
import img from "../../assets/headimg1.jpg";
import ImgHead from "./img.head";

const UpdateSeminar = () => {
  const [seminarData, setSeminarData] = useState({});

  const navigate = useNavigate("");
  const params = useParams();

  const getdata = async () => {
    const res = await axios.get(`http://localhost:8000/seminars/${params.id}`);

    setSeminarData(res.data.data);
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeminarData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const updateSeminar = async (e) => {
    e.preventDefault();

    console.log(seminarData);

    // const formData = new FormData();
    // formData.append("token", localStorage.getItem("token"));
    // formData.append("seminarDate", seminarData.seminarDate,);
    // formData.append("seminarTime", seminarData.seminarTime);
    // formData.append("seminarLocation", seminarData.seminarLocation);
    // formData.append("seminarLocationDis", seminarData.seminarLocationDis);
    // formData.append("seminarDescription", seminarData.seminarDescription);

    const seminar = {
      seminarDate: seminarData.seminarDate,
      seminarTime: seminarData.seminarTime,
      seminarLocation: seminarData.seminarLocation,
      seminarLocationDis: seminarData.seminarLocationDis,
      seminarDescription: seminarData.seminarDescription,

      token: localStorage.getItem("token"),
    };

    // for (let i = 0; i < images.length; i++) {
    //   formData.append("images", images[i]);
    // }

    await axios
      .put(`http://localhost:8000/seminars/update/${params.id}`, seminar)
      .then((res) => {
        console.log(res);
        alert("Item Updated Successfully");
        navigate("/dashboard/products");
      })
      .catch((err) => {
        console.log(err);
        alert("Item Update Failed. Check console for more details");
      });
  };

  return (
    <div>
      <section className={styles.contact}>
        <ImgHead name="Conducted by us" title="Seminar Sessions" cover={img} />
        <div className={styles.container}>
          <form className={styles.shadow} noValidate>
            <h4>Fillup The Form</h4> <br />
            <div className={styles.shadow1}>
              <input
                type="text"
                className={styles.shadowin}
                id="seminardate"
                name="seminarDate"
                defaultValue={seminarData.seminarDate}
                onChange={handleInputChange}
                placeholder="Date"
              />

              <input
                type="text"
                id="seminartime"
                name="seminarTime"
                defaultValue={seminarData.seminarTime}
                onChange={handleInputChange}
                className={styles.shadowin}
                placeholder="Time"
              />

              <input
                type="text"
                id="seminarlocation"
                name="seminarLocation"
                defaultValue={seminarData.seminarLocation}
                onChange={handleInputChange}
                className={styles.shadowin}
                placeholder="Location"
              />
            </div>
            <div>
              <input
                type="text"
                id="sseminarlocationdis"
                name="seminarLocationDis"
                defaultValue={seminarData.seminarLocationDis}
                onChange={handleInputChange}
                className={styles.shadowin}
                placeholder="Location Description"
              />
            </div>
            <textarea
              cols="30"
              rows="5"
              id="seminardescription"
              name="seminarDescription"
              defaultValue={seminarData.seminarDescription}
              onChange={handleInputChange}
            ></textarea>
            <button
              className="btn btn-success"
              type="submit"
              // style={{ marginTop: "15px" }}
              onClick={updateSeminar}
            >
              <i className="far fa-check-square"></i>
              &nbsp; Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateSeminar;
