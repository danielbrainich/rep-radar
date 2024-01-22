function ContributionsTable({ contributions, summary }) {
    return (
        <div>
            {summary && contributions && contributions.cycle && contributions.contributors && (
                <div className="col">
                    <h1>Campaign Finance</h1>
                    <p>
                        Transparency in campaign finance is essential for democratic integrity. This summary for Rep. REP_NAME_HERE for the {contributions.cycle} election cycle, sourced from <a href="https://www.opensecrets.org" target="_blank">OpenSecrets</a>, provides insights into contributions and expenditures, reflecting the campaign's financial transparency. The <a href="https://www.fec.gov" target="_blank">Federal Election Commission (FEC)</a> enforces campaign finance laws to ensure this transparency.
                    </p>
                    <hr />
                    <div className="mb-4">
                        <p>Fundraising summary for the {contributions.cycle} election cycle:</p>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Cash on Hand</th>
                                    <td>{summary.cashOnHand}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Raised This Cycle</th>
                                    <td>{summary.total}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Total Debt</th>
                                    <td>{summary.debt}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Spent this Cycle</th>
                                    <td>{summary.spent}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="small">(Information last updated {summary.lastUpdated})</p>
                        <hr />
                    </div>

                    <p>Top {contributions.contributors.length} contributors for the {contributions.cycle} election cycle:</p>
                    <div className="mb-4">
                        <div>
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Contributor</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contributions.contributors.map((contributor, index) => (
                                        <tr key={`contributor-${index}`}>
                                            <td>{contributor['@attributes'].org_name}</td>
                                            <td>
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
    );
}

export default ContributionsTable;
