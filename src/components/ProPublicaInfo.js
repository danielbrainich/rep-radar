
function ProPublicaInfo({ info, photo }) {
    return (
        <div>
            {console.log('Photo!', photo)}
            {info && photo ? (
                <img src={photo} alt="Loaded content" />
            ) : (
                <p>Loading data...</p>  // Figure out how to put a loading spinner here
            )}
        </div>
    );
}

export default ProPublicaInfo;
