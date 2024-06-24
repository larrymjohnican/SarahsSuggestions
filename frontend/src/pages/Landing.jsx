import { Link } from 'react-router-dom';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import '../styles/Landing.css';

function Landing() {
    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <h1 className="header-title">Sarah's Suggestions</h1>
                    <nav className="nav">
                        <ul>
                        <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/book-suggestions">Book Suggestions</Link></li>
                            <li><Link to="/book-reviews">Book Reviews</Link></li>
                            <li><Link to="/events">Events</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h2 className="hero-title">Welcome to Sarah's Suggestions</h2>
                    <p className="hero-subtitle">I'm Sarah, a lifelong book lover with a passion for discovering and sharing captivating reads across all genres.
                        Whether you're fiction, non-fiction, or something in between, my blog is here to guide you to your next great book.
                        Join me on this literary adventure, and let's explore the world of books together!</p>
                    <button className="hero-button">Get Started</button>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <h2>Features</h2>
                    <div className="features-list">
                        <div className="feature-item">
                            <h3>Feature One</h3>
                            <p>Description of feature one.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Feature Two</h3>
                            <p>Description of feature two.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Feature Three</h3>
                            <p>Description of feature three.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="container">
                    <h2>About Us</h2>
                    <p>Sarah's Suggestions is a haven for book lovers from all walks of life.
                        We understand that the world of books offers endless possibilities and insights, but finding a space where you can discuss your favorite titles without feeling judged can sometimes be challenging.
                        That's why we created this blog - to foster a community where every bookworm feels welcomed and valued.
                        Whether you are into fantasy, mystery, non-fiction, or any other genre, you’ll find like-minded individuals ready to share their thoughts and recommendations.
                        Our mission is to create an inclusive environment where passionate discussions about books can thrive.
                        Dive into our curated content, engage in thought-provoking conversations, and discover your next great read here at Sarah's Suggestions.
                    </p>
                </div>
            </section>

            {/* Social Media */}
            <section id="social" className="social">
                <div className="container">
                    <h3>Follow Us!</h3>
                    <a href="https://twitter.com"><FaXTwitter size={32} /></a>
                    <a href="https://facebook.com"><FaFacebookF size={32} /></a>
                    <a href="https://instagram.com"><FaInstagram size={32} /></a>    
                    <a href="https://youtube.com"><FaYoutube size={32} /></a>    

                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 My Website. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
