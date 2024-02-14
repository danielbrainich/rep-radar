function Finances({ contributions, summary, name }) {


    return (
        <div className="container d-flex flex-column align-items-start flex-fill vh-90">
            <div className="flex-grow-1 d-flex align-items-start justify-content-center mx-lg-5 px-lg-5">
                { name && contributions?.cycle && summary && contributions?.contributors?.length > 0 ? (
                <div className="col d-flex flex-column justify-content-between mx-lg-5 px-lg-5">
                    <div className="mt-md-5 pt-md-5">
                        <h4 className="pb-2">Finances</h4>
                        <p>
                            Follow the money! Transparency in campaign finance is essential for democratic integrity. The info below shows campaign finance data for Rep. {name} for the {contributions.cycle} election cycle.
                            This info comes from <a href="https://www.opensecrets.org" target="_blank" rel="noopener noreferrer">OpenSecrets</a>.
                        </p>
                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                        <div className="pb-2 mb-4">
                            <h5 className="pb-2">Summary</h5>
                            <div className="table-responsive">
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
                        <div className="pb-2">
                            <h5 className="pb-2">Top {contributions.contributors.length} Contributors</h5>
                            <div className="table-responsive">
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
                </div>
                ) : (
                    <div className="text-center">
                        <img className="mb-2" src="error-message.png" width="50px" alt="Error Message"/>
                        <div className="mb-2">Sorry, I'm unable to find financial info for your rep.</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Finances;
