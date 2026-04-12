import {useState, useEffect} from "react";
import './App.css';

function App() {
  const [topic, setTopic] = useState("");
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const getNews = async () => {
    if (!topic) {
      setError("Enter a topic");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${topic}&language=en`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();

      if (!data.results) {
        throw new Error("No news found");
      }

      setNews(data.results);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <div className="hero">
      <h1>News App</h1>
      <p>Discover what’s happening now</p>
    </div>

    <div className="search-box">
      <input
        type="text"
        placeholder="Search news by topic (e.g. countries, sports, etc.)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button onClick={getNews}>
        {loading ? "Loading..." : "Search"}
      </button>
    </div>

    {error && <p className="error">{error}</p>}
    {loading && <p className="loading">Fetching news...</p>}

    <div className="news-list">
      {news.map((item, index) => (
        <div key={index} className="card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.link} target="_blank" rel="noreferrer">
            Read more →
          </a>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;

// API Dashboard: https://newsdata.io/search-dashboard 