import React, { useState } from 'react';

function AboutUs() {
  const [review, setReview] = useState("");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Review submitted:", review);
    setReview(""); // Reset review input after submission
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <section className="about" id="about" style={sectionStyle}>
        <h1 className="heading" style={{ ...headingStyle, animation: 'fadeInDown 1s ease-in' }}>About us</h1>
        <h3 className="title" style={{ ...titleStyle, animation: 'fadeInDown 1s ease-in' }}>Start your journey with us</h3>
        <div className="row" style={rowStyle}>
          <div className="content" style={{ ...contentStyle, animation: 'fadeInLeft 1s ease-in' }}>
            <h3 style={{ fontWeight: 'bold', color: 'blue', animation: 'fadeInLeft 1s ease-in' }}>Build your Tech Career for a better life with our practical courses</h3>
            <p style={{ fontWeight: 'bold', color: 'blueviolet', animation: 'fadeInLeft 1s ease-in' }}>Our mission is to empower individuals with the knowledge and skills they need to succeed in the world of programming. We believe that coding is not just a technical skill but a gateway to creativity, problem-solving, and innovation.</p>
            <a href="#"><button style={{ ...buttonStyle, animation: 'fadeInUp 1s ease-in' }}>Learn more</button></a>
          </div>
          <div className="image" style={{ ...imageStyle, animation: 'zoomIn 1s ease-in' }}>
            <img src="aboutus.jpg" alt="aboutus" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>
      <section className="review-section" style={reviewSectionStyle}>
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
            style={textareaStyle}
            required
          />
          <button type="submit" style={submitBtnStyle}>Submit Review</button>
        </form>
      </section>
    </div>
  );
}

// Define CSS styles
const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headingStyle = {
  fontWeight: 'bold',
};

const titleStyle = {
  fontWeight: 'bold',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
};

const contentStyle = {
  flex: '0 0 50%',
  paddingRight: '20px',
};

const imageStyle = {
  flex: '0 0 50%',
};

const buttonStyle = {
  height: '50px',
  width: '200px',
  backgroundColor: 'rgb(207, 123, 207)',
  color: '#fff',
  border: 'none',
  borderRadius: '5rem',
  boxShadow: '0 .3rem 1rem rgb(0,0,0,.3)',
  cursor: 'pointer',
  fontSize: '20px',
  transition: '.2s',
  marginTop: '10px'
};

const reviewSectionStyle = {
  marginTop: '50px',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const submitBtnStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  backgroundColor: 'rgb(207, 123, 207)',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default AboutUs;
