function ContributionsTable({ contributions }) {
    return (
        <div>
            {contributions && contributions.contributors && (
                <table>
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
                                    }).format(contributor['@attributes'].total)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ContributionsTable;
