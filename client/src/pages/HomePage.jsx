import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file





function HomePage() {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    fetch('/api/active_competitions')
      .then((res) => res.json())
      .then((data) => {
        setComps(data);
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);



  return (
    <div className="page-container">
    <div className="home-header">
      <h1>Active Competitions</h1>
    </div>
    <section>
      <div className="card-container">
        {comps.map((comp) => (
          <div className="card" key={comp.id}>
            <div className="card-content">
              <h3 className="competition-name">{comp.name}</h3>
              <p>{comp.description}</p>
              <p>Start Date: {new Date(comp.start_date).toLocaleDateString()}</p>
              <p>End Date: {new Date(comp.end_date).toLocaleDateString()}</p>
              <h4>Photos:</h4>
              <div className="photos-container">
                {comp.competition_photos.map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <img src={photo.image_url} alt={`Photo ${photo.id}`} />
                    <p>Votes: {photo.votes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);
}
     
    export default HomePage;






// import { Link } from 'react-router-dom';
// import './HomePage.css'; // CSS 파일 import
// import RestaurantList from '../components/Restaurants/RestaurantList.jsx';

// function HomePage() {
//   const restaurants = RestaurantList(); // RestaurantList를 함수로부터 데이터 받아오기
// }


{/* <>
      <p className="home-header">Find your table for any occasion</p>
      <div className="page-container">
        <div className="card-container">
          {restaurants.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </>
   */}