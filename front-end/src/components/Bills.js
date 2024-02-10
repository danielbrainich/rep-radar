
function Bills({ sponsoredBills, name }) {
    return (
<div className="col">
        <h3 className="text-center pb-2">Bills</h3>
        <p>
            Reps sponsor bills to introduce or amend laws. The process involves drafting, gaining support, and navigating the bill through
            legislative hurdles to become law. It can demonstrate a lawmaker's priorities and political skill. Rep. {name} has sponsored a total of {sponsoredBills.count} bills since joining Congress.
            Below are the {sponsoredBills.sponsoredLegislation.length} most recent. This info comes from <a href="https://www.congress.gov/" target="_blank" rel="noopener noreferrer">Congress.gov</a>.
        </p>

    <hr className="pb-2"/>

    {sponsoredBills.sponsoredLegislation && sponsoredBills.sponsoredLegislation.map((bill, index) => (
        <div className="card" key={`bill-${index}`}>
            <div className="card-body">
                <h5 className="card-title ps-2">{`${bill.type}-${bill.number}`}</h5>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row">Introduced</th>
                            <td>{bill.introducedDate}</td>
                        </tr>
                        <tr>
                            <th scope="row">Bill Title</th>
                            <td>{bill.title}</td>
                        </tr>
                        <tr>
                            <th scope="row">Latest Action</th>
                            <td>{`${bill.latestAction.text} (${bill.latestAction.actionDate})`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
        </div>
    ))}
</div>
    );
}

export default Bills;
