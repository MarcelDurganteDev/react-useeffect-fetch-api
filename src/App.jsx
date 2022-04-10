import { useState, useEffect } from 'react';

export default function App() {
    const [news, setNews] = useState([]);

    const fetchNews = () => {
        fetch('https://hn.algolia.com/api/v1/search?query=react')
            .then(result => result.json())
            .then(data => setNews(data.hits))
          .catch( error => console.log( error ) );
    };

    useEffect(() => {
        fetchNews();
    },[]);

    return (
        <div>
            <h2>News Titles</h2>
            {news.map((n, index) => (
                <p key={index}>{n.title}</p>
            ))}
        </div>
    );
}
