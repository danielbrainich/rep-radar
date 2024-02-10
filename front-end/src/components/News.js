
function News({ news, name}) {

    return (
        <div className="col p-4">
            <div>
                <h2 className="text-center pb-2">Latest News</h2>
                <p>The press plays important role in keeping us informed about our our reps' actions in and out of Congress. This ensures they remain accountable to their constituents.
                    Here are some recent news articles that mention Rep. {name}.</p>
            </div>

            <hr className="pb-2"/>

            {news ? (news.news.map((article, index) => {
                    return (
                        <div className="card" key={`article-${index}`}>
                            <div className="card-body">
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
                            </div>
                        <hr />
                        </div>
                    );
                })
            ) : null}
        </div>
    );
}

export default News;
