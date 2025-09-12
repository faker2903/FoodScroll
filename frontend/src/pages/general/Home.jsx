import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [showAuthMenu, setShowAuthMenu] = useState(false)

  // Fetch videos on mount
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/food', { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems)
      })
      .catch(() => {
        /* optional error handling */
      })
  }, [])

  // Like/unlike video
  async function likeVideo(item) {
    const response = await axios.post(
      'http://localhost:3000/api/food/like',
      { foodId: item._id },
      { withCredentials: true }
    )

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? { ...v, likeCount: v.likeCount + (response.data.like ? 1 : -1) }
          : v
      )
    )
  }

  // Save/unsave video
  async function saveVideo(item) {
    const response = await axios.post(
      'http://localhost:3000/api/food/save',
      { foodId: item._id },
      { withCredentials: true }
    )

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? { ...v, savesCount: v.savesCount + (response.data.save ? 1 : -1) }
          : v
      )
    )
  }

  return (
    <>
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
      />

      {/* Floating Auth Button */}
      <div className="auth-float-container">
        <button
          className="auth-float-btn"
          onClick={() => setShowAuthMenu((prev) => !prev)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {/* Auth Menu Dropdown */}
        {showAuthMenu && (
          <div className="auth-menu">
            <div className="auth-menu-section">
              <h4>Food Lover</h4>
              <Link to="/user/login" className="auth-menu-btn">
                Login
              </Link>
              <Link to="/user/register" className="auth-menu-btn">
                Sign Up
              </Link>
            </div>
            <div className="auth-menu-divider" />
            <div className="auth-menu-section">
              <h4>Food Partner</h4>
              <Link to="/food-partner/login" className="auth-menu-btn">
                Login
              </Link>
              <Link to="/food-partner/register" className="auth-menu-btn">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close menu */}
      {showAuthMenu && (
        <div
          className="auth-menu-overlay"
          onClick={() => setShowAuthMenu(false)}
        />
      )}
    </>
  )
}

export default Home
