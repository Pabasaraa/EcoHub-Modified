// import React from "react"
// import { Seminarlist } from "./dummyData/dummyData.js";
// import { BsFillCalendar2DateFill } from "react-icons/bs";
// import { BsFillClockFill} from "react-icons/bs";
// import { ImLocation2} from "react-icons/im";
// import styles from "./styles/listCard.seminar.module.css";

// const ManageCard = () => {
//   return (
//     <>
//       {Seminarlist.map((val) => (
//         <div className='items shadow'>

//           <div  className= {styles.text}>
//             <div  className= {styles.Box}>
//               <span className= {styles.Box1}>
//                 <i className= {styles.flexSB} >< BsFillCalendar2DateFill/></i>
//                 <label htmlFor=''>{val.date}</label>
//               </span>
//               <span className= {styles.Box2}>
//                 <i className= {styles.flexSB}><BsFillClockFill/></i>
//                 <label htmlFor=''>{val.time}</label>
//               </span>
//               <span className= {styles.Box3}>
//                 <i className= {styles.flexSB}><ImLocation2 /></i>
//                 <label htmlFor=''>{val.location}</label>
//               </span>
//             </div>
//             <h>{val.location_des}</h>
//             <p>{val.desc}</p>

//             <div className= {styles.btngroup}>

//             <button className= {styles.btn}>Update</button>
//             <button className= {styles.btn}s>Delete</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   )
// }

// export default ManageCard

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import styles from "./styles/listCard.seminar.module.css";
import axios from "axios";

const ManageCard = () => {
  const [seminars, setSeminars] = useState(null);
  const navigate = useNavigate();

  const retriveSeminar = () => {
    axios
      .get("http://localhost:8000/seminars/get/all")
      .then((res) => {
        setSeminars(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    retriveSeminar();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/seminars/delete/${id}`).then((res) => {
      alert("delete");
      retriveSeminar();
    });
  };
  return (
    <>
      {seminars &&
        seminars.map((seminar, key) => (
          <div className="items shadow">
            <div className={styles.text}>
              <div className={styles.Box}>
                <span className={styles.Box1}>
                  <i className={styles.flexSB}>
                    <BsFillCalendar2DateFill />
                  </i>
                  <label htmlFor="">{seminar.seminarDate}</label>
                </span>
                <span className={styles.Box2}>
                  <i className={styles.flexSB}>
                    <BsFillClockFill />
                  </i>
                  <label htmlFor="">{seminar.seminarTime}</label>
                </span>
                <span className={styles.Box3}>
                  <i className={styles.flexSB}>
                    <ImLocation2 />
                  </i>
                  <label htmlFor="">{seminar.seminarLocation}</label>
                </span>
              </div>
              <h>{seminar.seminarLocationDis}</h>
              <p>{seminar.seminarDescription}</p>

              <div className={styles.btngroup}>
                <button
                  className={styles.btn}
                  onClick={() => navigate(`/seminars/update/${seminar._id}`)}
                >
                  Update
                </button>

                {/* <button className= {styles.btn}>Update</button> */}
                {/* <button className= {styles.btn}s>Delete</button> */}
                <button
                  className={styles.btn}
                  // onClick={handleDelete (seminar._id)}
                  onClick={() => handleDelete(seminar._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ManageCard;
