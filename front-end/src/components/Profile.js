import CongressGovPhoto from './CongressGovPhoto';

function Profile({ profile, info, photo }) {

    const generateSocialMediaLink = (channel) => {
        let baseUrl = '';
        if (channel.type.toLowerCase() === 'facebook') {
            baseUrl = 'https://www.facebook.com/';
        } else if (channel.type.toLowerCase() === 'twitter') {
            baseUrl = 'https://twitter.com/';
        }
        return baseUrl + channel.id;
    };

    return (
        <>
            {profile.representative && (
                <div className="text-center">
                    <h2 className="card-title pb-4">{profile.representative.name}</h2>
                    <div className="pb-2">
                        <CongressGovPhoto info={info} photo={photo} />
                    </div>

                    <div>{profile.representative.office}</div>
                    <div>{profile.representative.party}</div>
                    <div>{profile.representative.state} {profile.representative.district}</div>
                    {profile.representative.channels && (
                         <div>
                         {profile.representative.channels.map((channel, index) => (
                             <div className="card-text" key={`channel-${index}`}>
                                {`${channel.type}: `}
                                 <a href={generateSocialMediaLink(channel)} target="_blank" rel="noopener noreferrer">
                                      {channel.id}
                                 </a>
                             </div>
                         ))}
                     </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Profile;
