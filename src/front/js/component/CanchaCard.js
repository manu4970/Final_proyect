import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/CanchaCard.css";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseballBatBall, faBasketball, faFootball, faTableTennisPaddleBall, faVolleyball, faHandshake, faClock } from '@fortawesome/free-solid-svg-icons';

const CanchaCard = ({ cancha }) => {
  const { store, actions } = useContext(Context);
  const [owner, setOwner] = useState({});
  const imageUrl = cancha.img || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
  const canchaTypeIcon = {
    Tennis: <FontAwesomeIcon icon={faBaseballBatBall} />,
    Football: <FontAwesomeIcon icon={faFootball} />,
    Paddle: <FontAwesomeIcon icon={faTableTennisPaddleBall} />,
    Basketball: <FontAwesomeIcon icon={faBasketball} />,
    BabyFootball: <FontAwesomeIcon icon={faVolleyball} />
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
            <li className="list-unstyled"> $ {cancha.precio} (per hour)</li>
            <li className="list-unstyled"> <FontAwesomeIcon icon={faClock} /> {cancha.apertura}:00 Hrs to {cancha.cierre}:00 Hrs </li>
            <ul className="postcard__tagbox">
              <li className="tag__item ">
                {getSportTypeIcon() || <i className="fas fa-tag mr-2 "> </i>} {cancha.sportType}
              </li>

              <li className="tag__item play blue btn">
                <Link to={`/rent/${cancha?.id}`}>
                  <FontAwesomeIcon icon={faHandshake} /> <strong>Rent</strong>
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