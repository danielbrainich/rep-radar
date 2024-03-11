function News({ news, name }) {

    const hasError = news.error

    function convertIsoToDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    let filteredNews = [];
    if (news.news.length > 0) {
        filteredNews = news.news.filter(article => {
            return !(article.url === "[Removed]" ||
                article.author === "[Removed]" ||
                article.title === "[Removed]" ||
                article.publishedAt === "[Removed]" ||
                article.description === "[Removed]" ||
                article.source?.name === "[Removed]");
        });
    }

    return (
        <div className="container d-flex flex-column vh-95">
            <div className="flex-grow-1 d-flex align-items-start justify-content-center mx-lg-5 px-lg-5">
                {!hasError && news && news?.news && news.news.length > 0  && name ? (
                <div className="col d-flex flex-column justify-content-between ms-md-5">
                    <div className="mt-md-5 pt-md-5">
                        <h4 className="pb-2">News</h4>
                        <p>The press plays an important role in keeping us informed about our reps' actions in and out of Congress. This ensures they remain accountable to their constituents.
                            Here are some recent news articles that mention Rep. {name}.
                        </p>

                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                        {filteredNews.map((article, index) => (
                            <div  className="mt-5" key={`article-${index}`}>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Title</th>
                                            <td><a href={article.url} target='_blank' rel="noopener noreferrer">{article.title || 'No title available'}</a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Date</th>
                                            <td>{convertIsoToDate(article.publishedAt) || 'No date available'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Author</th>
                                            <td>{article.author || 'No author available'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Source</th>
                                            <td>{article.source?.name || 'No source available'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Description</th>
                                            <td>{article.description || 'No description available.'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-5" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
                ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <img className="mb-2" src="error-message.png" width="50px" alt="Error Message"/>
                        <div>Sorry, I'm unable to find news articles that mention your rep.</div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default News;
