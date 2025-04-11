"use client"
import { Link } from "react-router-dom"

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
      image: "https://images.unsplash.com/photo-1582093458397-8ef076ebad13?q=80&w=1000&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1611251135345-18c56206d219?q=80&w=1000&auto=format&fit=crop",
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

  return (
    <div className="sports-page">
      {/* Sports Page Hero */}
      <div className="sports-hero">
        <h1>College Sports Live Scores</h1>
        <p>Click on any sport to view live scores and upcoming matches</p>
      </div>

      {/* Sports Cards Grid */}
      <div className="sports-grid">
        {sportsData.map((sport) => (
          <Link key={sport.id} to={sport.route} state={sport.state} className="sport-card">
            <div className="card-image-container">
              <img src={sport.image || "/placeholder.svg"} alt={sport.name} className="card-image" />
              <div className="card-overlay">
                <span className="view-scores">View Live Scores</span>
              </div>
            </div>
            <div className="card-content">
              <h2 className="sport-name">{sport.name}</h2>
              <p className="sport-description">{sport.description}</p>
              <div className="score-btn">Check Scores</div>
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
          background-color: #f5f5f5;
          padding-bottom: 2rem;
        }

        /* Sports Hero Section */
        .sports-hero {
          background: linear-gradient(rgba(245, 158, 11, 0.9), rgba(245, 158, 11, 0.7)), url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          padding: 4rem 2rem;
          margin-bottom: 2rem;
        }

        .sports-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .sports-hero p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        /* Sports Grid */
        .sports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sport-card {
          background-color: white;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .sport-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sport-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(245, 158, 11, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sport-card:hover .card-overlay {
          opacity: 1;
        }

        .view-scores {
          color: white;
          font-weight: 600;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .sport-name {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .sport-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .score-btn {
          background-color: #f59e0b;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
          display: inline-block;
          text-align: center;
        }

        .score-btn:hover {
          background-color: #d97706;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .sports-hero h1 {
            font-size: 2rem;
          }
          
          .sports-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Sportpage
