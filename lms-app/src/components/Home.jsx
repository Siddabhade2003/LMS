import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    if (isAuthenticated) {
      navigate('/courselist');
    } else {
      navigate('/login');
    }
  };

  const testimonialAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5 } },
  };

  return (
    <div>
      <motion.div className="jumbotron">
        <div className="container">
          <div className='bg'>
            <motion.img
              src="bg.jpg"
              alt="Background Image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="display-4">Welcome to CodeNest</h2>
              <p className="lead">Learn and grow with our diverse range of courses.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div className="container mt-5">
        <div className="row">
          <motion.div className="col-md-6" whileHover={{ scale: 1.1 }}>
            <motion.div className='course-image'>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >Discover Your Learning Path</motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Embark on a journey of knowledge with our diverse range of expert-led courses.
              </motion.p>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={handleExploreCourses} 
                className="btn btn-primary"
              >
                Start Exploring
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className="row mt-5">
          <motion.div className="col-md-8" whileHover={{ scale: 1.05 }}>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
             Built-in-Compiler
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Dive into coding instantly with our powerful built-in compiler. Write, compile, conquer!
            </motion.p>
            <Link 
              to="/compiler" 
              className="btn btn-primary"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Try Compiler Now
            </Link>
          </motion.div>
        </div>

        {/* Additional Section: Testimonials */}
        <div className="row mt-5">
          <motion.div className="col-md-12" variants={testimonialAnimation} initial="hidden" animate="visible">
            <h1>Student Testimonials</h1>
            <div className="testimonial">
              <motion.img
                src="testmonial1.png"
                alt="Testimonial 1"
                className="testimonial-img"
                whileHover={{ scale: 1.1 }}
              />
              <div className="testimonial-content">
                <motion.p whileHover={{ scale: 1.1 }}>
                  "CodeNest has been instrumental in helping me learn programming in a fun and interactive way. I highly recommend it to anyone looking to enhance their coding skills."
                </motion.p>
                <motion.p whileHover={{ scale: 1.1 }}>- John Doe</motion.p>
              </div>
            </div>
            <div className="testimonial">
              <motion.img
                src="testmonial2.jpeg"
                alt="Testimonial 2"
                className="testimonial-img"
                whileHover={{ scale: 1.1 }}
              />
              <div className="testimonial-content">
                <motion.p whileHover={{ scale: 1.1 }}>
                  "The courses offered on CodeNest are top-notch. The instructors are knowledgeable, and the platform is user-friendly. I've learned a lot here!"
                </motion.p>
                <motion.p whileHover={{ scale: 1.1 }}>- Jane Smith</motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.footer className="footer mt-5 py-3 bg-light" style={{ backgroundColor: 'blue' }}>
        <div className="container">
          <div className="row">
            <motion.div className="col-md-4" whileHover={{ scale: 1.1 }}>
              <h5>About Us</h5>
              <p>Welcome to our Online Learning Management System (OLMS)! We are dedicated to providing a dynamic and accessible platform for learners of all backgrounds and levels of expertise.</p>
            </motion.div>
            <motion.div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/">Home</Link></li>
                
                <li><Link to="/compiler">Compiler</Link></li>
                <li><Link to="/aboutus">About</Link></li>
              </ul>
            </motion.div>
            <motion.div className="col-md-4" whileHover={{ scale: 1.1 }}>
              <h5>Contact Us</h5>
              <p>Email: info@example.com</p>
              <p>Phone: 123-456-7890</p>
            </motion.div>
          </div>
          <hr />
          <div className="text-center">
            <span className="text-muted">© 2024 CodeNest</span>
          </div>
          {/* New "Created By" section */}
          <div className="text-center mt-3">
            <p>Created By: Siddharth, Sarvesh, Suraj</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;
