const fetchNewsApiData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeNewsApiData = (data) => {
    return {
        news: data.articles
    }
};

const getNewsApiData = async (name) => {
    try {
<<<<<<< HEAD
        const data = await fetchNewsApiData(`${process.env.REACT_APP_API_URL}/api/news_api/${name}`);
=======
        const data = await fetchNewsApiData(`https://rep-radar-2d24b585519f.herokuapp.com/api/news_api/${name}`);
>>>>>>> 418d141ef4f0e8e0a5202ebb941f866b7a8a3414
        return reshapeNewsApiData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            news: {},
            error: true,
            errorMessage: error.message
        };
    };
};

export default getNewsApiData;
