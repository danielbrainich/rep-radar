function Finances({ contributions, summary, name }) {
    return (
        <div className="container d-flex flex-column vh-100">
            <div className="row flex-grow-1 mx-lg-5 px-lg-5">
                <div className="col d-flex flex-column justify-content-between">
                    {summary && contributions && (
                    <div className="mt-md-5 pt-md-5">
                        <h4 className="pb-2">Finances</h4>
                        <p>
                            Follow the money! Transparency in campaign finance is essential for democratic integrity. The info below shows campaign finance data for Rep. {name} for the {contributions.cycle} election cycle.
                            This info comes from <a href="https://www.opensecrets.org" target="_blank" rel="noopener noreferrer">OpenSecrets</a>.
                        </p>
                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                        <div className="pb-2 mb-4 d-flex flex-column">
                            <h5 className="pb-2">Summary</h5>
                            <div className="col">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Cash on hand</th>
                                            <td className="text-end">{summary.cashOnHand}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Raised this cycle</th>
                                            <td className="text-end">{summary.total}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total debt</th>
                                            <td className="text-end">{summary.debt}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Spent this cycle</th>
                                            <td className="text-end">{summary.spent}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="pb-2 d-flex flex-column">
                            <h5 className="pb-2">Top {contributions.contributors.length} Contributors</h5>
                            <div className="col">
                                <table className="table">
                                    <tbody>
                                        {contributions.contributors.map((contributor, index) => (
                                            <tr key={`contributor-${index}`}>
                                                <td>{contributor['@attributes'].org_name}</td>
                                                <td className="text-end">
                                                    {new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    }).format(contributor['@attributes'].total)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className="text-center mb-4">
                    Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener norefferer">@danielbrainich</a>
                </div>
            </div>
     </div>
    );
}

export default Finances;
