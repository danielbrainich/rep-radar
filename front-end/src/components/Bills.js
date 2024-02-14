function Bills({ sponsoredBills, name }) {

    const hasError = sponsoredBills.error

    const validBills = sponsoredBills?.sponsoredLegislation?.filter(bill => bill.type != null && bill.number != null && bill.title != null) || [];


    return (
        <div className="container d-flex flex-column vh-95">
            <div className="flex-grow-1 d-flex align-items-start justify-content-center mx-lg-5 px-lg-5">
                {!hasError && validBills.length > 0 && name ? (
                <div className="col d-flex flex-column justify-content-between">
                    <div className="mt-md-5 pt-md-5">
                        <h4 className="pb-2">Bills</h4>
                        <p>
                            Reps sponsor bills to introduce or amend laws. The process involves drafting a bill and navigating it through
                            legislative hurdles to become law. This process can demonstrate a lawmaker's priorities and political skill. Rep. {name} has sponsored a total of {sponsoredBills.count} bills since joining Congress.
                            Below are the {sponsoredBills.sponsoredLegislation.length} most recent. This info comes from <a href="https://www.congress.gov/" target="_blank" rel="noopener noreferrer">Congress.gov</a>.
                        </p>

                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                        {validBills.map((bill, index) => (
                            <div className="mt-5" key={`bill-${index}`}>
                                <h5 className="mx-2">{`${bill.type}-${bill.number}`}</h5>
                                <table className="table table-borderless bills-table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Introduced</th>
                                            <td>{bill.introducedDate}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row no-wrap">Bill Title</th>
                                            <td>{bill.title}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row no-wrap">Latest Action</th>
                                            <td>{`${bill.latestAction.text} (${bill.latestAction.actionDate})`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-5" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                            </div>
                           ))}
                    </div>
                </div>
                ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <img className="mb-2" src="error-message.png" width="50px" alt="Error Message"/>
                        <div>Sorry, I'm unable to find info about bills your rep has sponsored.</div>
                    </div>
                </div>
                    )}
            </div>
        </div>
    );
}

export default Bills;
