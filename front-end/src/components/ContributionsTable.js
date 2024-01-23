function ContributionsTable({ contributions, summary }) {
    return (
        <>
            {summary && contributions && contributions.cycle && contributions.contributors && (

                <div className="col p-4 pb-0">

                    <div className="pb-2">
                        <h2 className="text-center pb-2">Campaign Finance</h2>
                        <p>
                            Transparency in campaign finance is essential for democratic integrity. This summary for Rep. REP_NAME_HERE for the {contributions.cycle} election cycle, sourced from
                            <a href="https://www.opensecrets.org" target="_blank">OpenSecrets</a>, provides insights into contributions and expenditures, reflecting the campaign's financial transparency.
                            The <a href="https://www.fec.gov" target="_blank">Federal Election Commission (FEC)</a> enforces campaign finance laws to ensure this transparency.
                        </p>
                    </div>

                    <hr className="pb-2"/>

                    <div className="pb-2 d-flex flex-column align-items-center">
                        <h3 className="text-center pb-2">Finances Summary</h3>
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
                        {/* <p className="small">(Information last updated {summary.lastUpdated})</p> */}
                    </div>

                    <hr className="pb-2"/>

                    <div className="pb-2 d-flex flex-column align-items-center">
                        <h3 className="text-center pb-2">Top {contributions.contributors.length} Contributors</h3>
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

export default ContributionsTable;
