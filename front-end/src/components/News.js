function News({ news, name }) {
    return (
        <div className="container d-flex flex-column vh-100">
            <div className="row flex-grow-1 mx-lg-5 px-lg-5">
                <div className="col d-flex flex-column justify-content-between">
                    <div className="mt-md-5 pt-md-5">
                        <h4 className="pb-2">News</h4>
                        <p>The press plays an important role in keeping us informed about our reps' actions in and out of Congress. This ensures they remain accountable to their constituents.
                            Here are some recent news articles that mention Rep. {name}.</p>

                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>

                        {news ? (news.news.map((article, index) => (
                            <div  className="mt-5" key={`article-${index}`}>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Title</th>
                                            <td><a href={article.url} target='_blank' rel="noopener noreferrer">{article.title}</a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Date</th>
                                            <td>{article.publishedAt}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Author</th>
                                            <td>{article.author}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Source</th>
                                            <td>{article.source.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Description</th>
                                            <td>{article.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-5" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                            </div>
                        ))) : null}
                    </div>
                    <div className="text-center mb-4">
                        Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener norefferer">@danielbrainich</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
