import { Link } from 'react-router-dom';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

function Landing() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h2 className="hero-title">Welcome to Sarah's Suggestions</h2>
                    <p className="hero-subtitle">I'm Sarah, a lifelong book lover with a passion for discovering and sharing captivating reads across all genres.
                        Whether you're fiction, non-fiction, or something in between, my blog is here to guide you to your next great book.
                        Join me on this literary adventure, and let's explore the world of books together!</p>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="container">
                    <h2>About Us</h2>
                    <div className="about-content">
                        <div className="text">
                            <p>Sarah's Suggestions is a haven for book lovers from all walks of life.
                                We understand that the world of books offers endless possibilities and insights, but finding a space where you can discuss your favorite titles without feeling judged can sometimes be challenging.
                                That's why we created this blog - to foster a community where every bookworm feels welcomed and valued.
                                Whether you are into fantasy, mystery, non-fiction, or any other genre, you’ll find like-minded individuals ready to share their thoughts and recommendations.
                                Our mission is to create an inclusive environment where passionate discussions about books can thrive.
                                Dive into our curated content, engage in thought-provoking conversations, and discover your next great read here at Sarah's Suggestions.
                            </p>
                        </div>
                    </div>
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
