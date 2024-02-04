
function Bills({ sponsoredBills }) {
    return (
<div className="col p-4 pb-0">
    <div className="pb-0">
        <h2 className="text-center pb-2">Bills</h2>
        <p>
            Representatives sponsor bills to introduce or amend laws, reflecting the interests of their constituents. This process involves drafting, gaining support, and navigating the bill through
            legislative hurdles to become law. It can showcase a lawmaker's priorities and effectiveness. Your representative has sponsored a total of {sponsoredBills.count} bills. These are
            the {sponsoredBills.sponsoredLegislation.length} most recent:
        </p>
    </div>

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
