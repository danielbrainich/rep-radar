
function Voting({ info }) {
    return (
        <>
            {info && (
                <div className="col">
                        <h3 className="text-center pb-2">Voting</h3>
                        <p>
                            Transparency in campaign finance is essential for democratic integrity.
                        </p>

                    <hr className="pb-2"/>

                    <div className="pb-2 d-flex flex-column align-items-center">
                        <h4 className="text-center pb-2">Summary</h4>
                        <div className="col-12 col-md-6">
                            <table className="table table-hover">
                                <tbody>
                                    <tr>
                                        <th scope="row">Missed Vote Percentage</th>
                                        <td>{Math.round(info.missed_votes_pct)}%</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Votes with Party Percentage</th>
                                        <td>{Math.round(info.votes_with_party_pct)}%</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Votes against Party Percentage</th>
                                        <td>{Math.round(info.votes_against_party_pct)}%</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Present Votes</th>
                                        <td>{info.total_present}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Votes</th>
                                        <td>{info.total_votes}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Voting;
