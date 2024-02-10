function Finances({ contributions, summary, name }) {
    return (
        <>
            {summary && contributions && (
                <div className="col">
                    <h3 className="text-center pb-2">Finances</h3>
                    <p>
                        Follow the money! Transparency in campaign finance is essential for democratic integrity. The info below shows campaign finance data for Rep. {name} for the {contributions.cycle} election cycle.
                        This info comes from <a href="https://www.opensecrets.org" target="_blank" rel="noopener noreferrer">OpenSecrets</a>.
                    </p>

                    <hr className="pb-2"/>

                    <div className="pb-2 d-flex flex-column align-items-center">
                        <h4 className="text-center pb-2">Summary</h4>
                        <div className="col-12 col-md-6">
                            <table className="table table-hover">
                                <tbody>
                                    <tr>
                                        <th scope="row">Cash on Hand</th>
                                        <td className="text-end">{summary.cashOnHand}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Raised This Cycle</th>
                                        <td className="text-end">{summary.total}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Debt</th>
                                        <td className="text-end">{summary.debt}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Spent this Cycle</th>
                                        <td className="text-end">{summary.spent}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr className="pb-2"/>

                    <div className="pb-2 d-flex flex-column align-items-center">
                        <h4 className="text-center pb-2">Top {contributions.contributors.length} Contributors</h4>
                        <div className="col-12 col-md-6">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Contributor</th>
                                        <th className="text-end">Amount</th>
                                    </tr>
                                </thead>
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
        </>
    );
}

export default Finances;
