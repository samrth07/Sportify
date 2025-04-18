"use client"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import { motion } from 'framer-motion'

const Sportpage = () => {
  // Sports data with images and descriptions
  const sportsData = [
    {
      id: 1,
      name: "Cricket",
      route: "/cricket",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
      description:
        "Stay connected with all cricket matches happening in college. Follow runs, wickets, and over-by-over commentary.",
    },
    {
      id: 2,
      name: "Kabaddi",
      route: "/matches",
      state: { sport: "kabaddi" },
      image: "https://images.indianexpress.com/2016/01/kabaddi-m.png",
      description:
        "Follow kabaddi tournaments and matches. Get real-time updates on raids, tackles and match progression.",
    },
    {
      id: 3,
      name: "Football",
      route: "/matches",
      state: { sport: "football" },
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop",
      description:
        "Follow live scores from football matches across campus leagues. Stay updated with the latest goals, cards, and match highlights.",
    },
    {
      id: 4,
      name: "Badminton",
      route: "/matches",
      state: { sport: "badminton" },
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop",
      description:
        "Follow badminton tournaments and matches. Get real-time updates on scores and tournament progression.",
    },
    {
      id: 5,
      name: "Carrom",
      route: "/matches",
      state: { sport: "carrom" },
      image: "https://images.unsplash.com/photo-1652558973276-365360d5024a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Track carrom board competitions. Follow match scores, player rankings, and tournament brackets.",
    },
    {
      id: 6,
      name: "Basketball",
      route: "/matches",
      state: { sport: "basketball" },
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
      description:
        "Track basketball tournaments and championships. Get real-time updates on scores, player stats, and upcoming fixtures.",
    },
  ]

  // Reference for animation
  const cardsRef = useRef([])

  // Animation on load
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100 * index)
      }
    })
  }, [])

  return (
    <div className="sports-page">
      {/* Sports Page Hero */}
      <div
  className="relative h-[400px] bg-cover bg-center flex items-center justify-center mb-12"
  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop')` }}
>

        <div className="absolute inset-0 bg-black/50 z-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            College Sports Live Scores
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200">
            Click on any sport to view live scores and upcoming matches
          </p>

          
        </motion.div>
      </div>


      {/* Sports Cards Grid */}
      <div className="sports-container">
        {sportsData.map((sport, index) => (
          <Link
            key={sport.id}
            to={sport.route}
            state={sport.state}
            className="sport-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="card-inner">
              <div className="card-image-container">
                <img src={sport.image || "/placeholder.svg"} alt={sport.name} className="card-image" />
                <div className="card-overlay">
                  <div className="view-scores-container">
                    <span className="view-scores">View Live Scores</span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h2 className="sport-name font-bold">{sport.name}</h2>
                <p className="sport-description">{sport.description}</p>
                <div className="score-btn">Check Scores</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Global Styles */
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .sports-page {
          width: 100%;
          min-height: 100vh;
          padding-bottom: 2rem;
        }

        /* Sports Hero Section */
        .sports-hero {
          background: url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          padding: 4rem 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .sports-hero::after {
          content: '';
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(to bottom, rgba(245, 245, 245, 0));
        }

        .sports-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          animation: fadeInDown 0.8s ease-out;
        }

        .sports-hero p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          animation: fadeInUp 0.8s ease-out;
        }

        /* Sports Container */
        .sports-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .sport-card {
          background-color: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          color: inherit;
          display: block;
          opacity: 0;
          transform: translateY(30px);
          width: 80%;
          margin: 0 auto;
        }

        .sport-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .card-inner {
          display: flex;
          flex-direction: row;
          height: 220px;
        }

        .card-image-container {
          position: relative;
          width: 40%;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .sport-card:hover .card-image {
          transform: scale(1.1) rotate(2deg);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          // background: rgba(16, 185, 129, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: translateY(10px);
        }

        .sport-card:hover .card-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .view-scores-container {
          transform: translateY(20px);
          transition: transform 0.4s ease 0.1s;
        }

        .sport-card:hover .view-scores-container {
          transform: translateY(0);
        }

        .view-scores {
          color: white;
          font-weight: 600;
          background-color: rgba(0, 0, 0, 0.6);
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          display: inline-block;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .card-content {
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 60%;
          position: relative;
          overflow: hidden;
        }

        .card-content::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #10b981;
          transform: scaleY(0);
          transition: transform 0.4s ease;
          transform-origin: bottom;
        }

        .sport-card:hover .card-content::before {
          transform: scaleY(1);
        }

        .sport-name {
          font-size: 1.8rem;
          margin-bottom: 0.8rem;
          color: #333;
          position: relative;
          display: inline-block;
        }

        .sport-name::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 3px;
          background-color: #10b981;
          transition: width 0.3s ease;
        }

        .sport-card:hover .sport-name::after {
          width: 100%;
        }

        .sport-description {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .score-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
          text-align: center;
          align-self: flex-start;
          position: relative;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
        }

        .score-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: #059669;
          transition: width 0.3s ease;
          z-index: -1;
        }

        .score-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
        }

        .score-btn:hover::before {
          width: 100%;
        }

        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 900px) {
          .card-inner {
            flex-direction: column;
            height: auto;
          }
          
          .card-image-container, .card-content {
            width: 100%;
          }
          
          .card-image-container {
            height: 200px;
          }
          
          .sport-card {
            width: 90%;
          }
        }

        @media (max-width: 600px) {
          .sports-hero h1 {
            font-size: 2rem;
          }
          
          .sports-container {
            padding: 0 1rem;
          }
          
          .sport-card {
            width: 100%;
          }
          
          .sport-name {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Sportpage
