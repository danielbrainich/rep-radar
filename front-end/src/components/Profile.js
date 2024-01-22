
function Profile({ profile }) {
    return (
        <>
            {profile.representative && (
                <div>
                    <h2 className="card-title">{profile.representative.name}</h2>
                    <p className="card-text">{profile.representative.office}</p>
                    <p className="card-text">{profile.representative.party}</p>
                    <p className="card-text">{profile.representative.state} {profile.representative.district}</p>
                    {profile.representative.channels && (
                        <div>
                            {profile.representative.channels.map((channel, index) => (
                                <p className="card-text" key={`channel-${index}`}>
                                    {channel.type}: {channel.id}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Profile;
