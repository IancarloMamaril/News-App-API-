import {useState, useEffect} from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "hehehe";

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
    <div className="App">
      <h2>📰 News App</h2>

      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button onClick={getNews}>
        {loading ? "Loading..." : "Get News"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <p>Fetching news...</p>}

      {news.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.link} target="_blank" rel="noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;

// API Dashboard: https://newsdata.io/search-dashboard 
