
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-label">
              YOUR PERSONAL READING SPACE
            </p>

            <h1>
              Book <span>Buddy</span>
            </h1>

            <h2>
              Discover. <span>Track.</span> Enjoy.
            </h2>

            <div className="title-decoration"></div>

            <p className="hero-description">
              Your personal reading companion — explore new books,
              track your progress, and build a reading journey
              you'll love!
            </p>

            <a href="#books" className="explore-button">
              Start Exploring <span>›</span>
            </a>
          </div>

          <div className="hero-character">
            <img
              src="/image/Bookish%20Owl%20on%20Colorful%20Book%20Stack.png"
              alt="Book Buddy owl reading a book"
              className="owl-image"
            />
          </div>
        </div>

        <div className="hero-bottom">
          <span></span>
          Read Better. Live Brighter.
          <span></span>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features-section" id="features">
        <article className="feature-card">
          <div className="feature-icon green">▤</div>
          <h3>Build Your Library</h3>
          <p>
            Add and organise the books you want to read.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon purple">▥</div>
          <h3>Track Your Progress</h3>
          <p>
            Keep track of your rading journey and achievements.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon yellow">★</div>
          <h3>Rate &amp; Review</h3>
          <p>
            Share your thoughts and rate the books you read.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon red">♥</div>
          <h3>Discover New Books</h3>
          <p>
            Explore recommendations based on your interests.
          </p>
        </article>
      </section>

      {/* Books Section */}
      <section className="books-section" id="books">
        <p className="section-label">
          YOUR NEXT CHAPTER STARTS HERE
        </p>

        <h2>
          Find your next <span>favourite book.</span>
        </h2>

        <p>
          Discover books, grow your library, and enjoy every page.
        </p>
      </section>
    </main>
  );
}

export default Home;

