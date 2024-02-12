import { getOrdinalSuffix } from "../utility";

function Statements({ statements, name }) {

    const hasError = statements?.errors

    return (
        <div className="container d-flex flex-column vh-100">
            <div className="flex-grow-1 d-flex align-items-center justify-content-center mx-lg-5 px-lg-5">
            { !hasError && statements && statements.results && name ? (
                <div className="col d-flex flex-column justify-content-between">
                    <div className="mt-md-5 pt-md-5">
                        <h4 className="pb-2">Statements</h4>
                        <p>
                            Public statements reflect a rep's stance on political and policy issues. These statements are a key part of how representatives communicate with constituents.
                            Rep. {name} has released {statements.num_results} public statements during the current {getOrdinalSuffix(statements.congress)} Congress. This info comes
                            from <a href="https://www.propublica.org/" target="_blank" rel="noopener noreferrer">ProPublica</a>.
                        </p>
                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                        {statements.results.map((statement, index) => (
                            <div className="mt-5" key={`statement-${index}`}>
                                <h5 className="mx-2">{statement.date}</h5>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td><a href={statement.url} target='_blank' rel="noopener noreferrer">{statement.title}</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-5" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <img src="error-message.png" height="75px" alt="Error Message"></img>
                    <div className="mb-2">Something went wrong. <br />I'm unable to load your rep's public statements.</div>
                </div>
            )}
            </div>
            <div className="text-center mb-4">
                Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener noreferrer">@danielbrainich</a>
            </div>
        </div>

    );
}

export default Statements;
