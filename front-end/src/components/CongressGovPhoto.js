
function CongressGovPhoto({ info, photo }) {
    return (
        <>
            {info && photo ? (
                <img className="rounded" src={photo} alt={`Portrait of Rep. ${info.first_name} ${info.last_name}`}/>
            ) : (
                <div class="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </>
    );
}

export default CongressGovPhoto;
