import { getOrdinalSuffix } from "../utility";

function Statements({ statements }) {
    console.log('hello', statements);
    return (
        <div className="col p-4 pb-0">
            <div className="pb-0">
                <h2 className="text-center pb-2">Statements</h2>
                <p>
                Your representative has released {statements.num_results} public statements during the {getOrdinalSuffix(statements.congress)} Congress, reflecting their stance on political
                issues, policy announcements, and responses to events. These statements are a key part of how representatives communicate with constituents.
                </p>
            </div>

            <hr className="pb-2"/>

            {statements && statements.results && statements.results.map((statement, index) => (
                <div className="card mb-4" key={`statement-${index}`}>
                    <div className="card-body">
                        <h5 className="card-title ps-2">{statement.date}</h5>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Type</th>
                                    <td>{statement.statement_type}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Title</th>
                                    <td><a href={statement.url} target='_blank' rel="noopener noreferrer">{statement.title}</a></td>
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

export default Statements;
