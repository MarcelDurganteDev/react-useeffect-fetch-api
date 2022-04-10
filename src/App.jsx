import { useState, useEffect } from 'react';

export default function App() {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('react');
    const [url, setUrl] = useState(
        `https://hn.algolia.com/api/v1/search?query=${searchQuery}`
    );
    const [isLoading, setIsLoading] = useState( false );

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            const response = await fetch( `https://hn.algolia.com/api/v1/search?query=${searchQuery}` )
            const data = await response.json();
            setNews( data.hits );
            setIsLoading( false );
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [url] );
    
    const handleChange = ( e ) => {
        setSearchQuery(e.target.value);
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
    }
     


    return (
        <div>
            <h2>News Titles</h2>
            {isLoading ? <p>Loading...</p> : ''}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>

            {news.map((n, index) => (
                <p key={index}>{n.title}</p>
            ))}
        </div>
    );
}
