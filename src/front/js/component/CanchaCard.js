import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/CanchaCard.css";
import { Context } from "../store/appContext";

const CanchaCard = ({ cancha }) => {
  const { store, actions } = useContext(Context);
  const [owner, setOwner] = useState({});
  const imageUrl = cancha.img || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
  const canchaTypeIcon = {
    Tennis: <i className="fa-solid fa-racquet"></i>,
    Football: <i className="fa-solid fa-futbol"></i>,
    Paddle: <i className="fa-solid fa-table-tennis-paddle-ball"></i>,
    Basketball: <i className="fa-solid fa-basketball"></i>,
    BabyFootball: <i className="fa-duotone fa-futbol"></i>
  };


  const getSportTypeIcon = () => {
    const sportType = cancha.sportType;
    return canchaTypeIcon[sportType] || null;
  };



  return (
    <section className="dark">
      <div className="container py-4 ">
        <h1 className="h1 text-center" id="pageHeaderTitle"></h1>

        <article className="postcard dark blue ">
          <a className="postcard__img_link" href="#">
            <img
              className="postcard__img"
              src={imageUrl}
              alt="Image Title"
            />
          </a>
          <div className="postcard__text">
            <h1 className="postcard__title blue">
              <a href="#"> {cancha.name}</a>
            </h1>
            <div className="postcard__subtitle small">
              <time dateTime="2020-05-25 12:00:00">
                <i className="fas fa-map-marker-alt mr-2"> </i> {cancha.location}
              </time>
            </div>
            <div className="postcard__bar"></div>
            <ul className="postcard__tagbox">
              <li className="tag__item">
                {getSportTypeIcon() || <i className="fas fa-tag mr-2"></i>} {cancha.sportType}
              </li>
              <li className="tag__item play blue btn">
                <Link to={`/rent/${cancha?.id}`}>
                  <i className="fas fa-basketball-ball mr-2"></i> Rent
                </Link>
              </li>
            </ul>
          </div>
        </article>

        {/* Add other articles for different cards */}
      </div>
    </section>
  );
};

export default CanchaCard;


  // const handleMouseEnter = () => {
  //   const imageTimer = setTimeout(() => {
  //     setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 2000);
  //   setImageTimer(imageTimer);
  // };

  // const handleMouseLeave = () => {
  //   clearTimeout(imageTimer);
  // };

  // let imageTimer;



                // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}




 // useEffect(() => {
  //   const fetchOwnerData = async () => {
  //     try {
  //       const owner = await actions.getUser(cancha.user_id);
  //       setOwner(owner);
  //     } catch (error) {
  //       console.log("Error fetching owner:", error);
  //     }
  //   }; fetchOwnerData();
  // }, []);

  // console.log(owner, "owner");