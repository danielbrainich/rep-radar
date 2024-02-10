
function CongressGovPhoto({ info, photo }) {
    return (
        <div>
            {info && photo ? (
                <img className="rounded" src={photo} alt={`Portrait of Rep. ${info.first_name} ${info.last_name}`}/>
            ) : (
                <div class="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default CongressGovPhoto;
