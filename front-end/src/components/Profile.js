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

   let possessive_pronoun = "their";
   let subject_pronoun = "they are";
   if (info.gender === "F") {
       possessive_pronoun = "her";
       subject_pronoun = "she is";
   } else if (info.gender === "M") {
       possessive_pronoun = "his";
       subject_pronoun = "he is";
   }
   const capitalizedPossessivePronoun = possessive_pronoun.charAt(0).toUpperCase() + possessive_pronoun.slice(1);

   const hasError = profile?.error || info?.error;

    return (
        <div className="container d-flex flex-column vh-100">
            {!hasError && profile?.representative && info ? (
            <div>
                <div className="col d-flex flex-column justify-content-between mx-lg-5 px-lg-5">
                    <div className="mt-md-5 pt-md-5">
                        {photo && <CongressGovPhoto info={info} photo={photo} />}
                        <h3 className="card-title mt-5 mb-3">{profile.representative.name}</h3>
                        <div className="larger-text">{profile.representative.office}</div>
                        <div className="larger-text">{profile.representative.party}</div>
                        <div className="larger-text">{profile.representative.state}-{profile.representative.district}</div>
                        {profile.representative.channels && (
                        <div className="mt-3">
                            {profile.representative.channels.map((channel, index) => (
                            <div className="medium-text" key={`channel-${index}`}>
                            {`${channel.type}: `}
                                <a href={generateSocialMediaLink(channel)} target="_blank" rel="noopener noreferrer">
                                    {channel.id}
                                </a>
                            </div>
                            ))}
                        </div>
                        )}
                        <div className="my-4" style={{ borderBottom: '1px solid black', margin: '20px 0' }}></div>
                            <p>
                                Your rep is Rep. {profile.representative.name}. {capitalizedPossessivePronoun} congressional district
                                is {profile.representative.state}-{profile.representative.district} and {subject_pronoun} a member of the {profile.representative.party}.
                                Explore this site for info on {possessive_pronoun} voting record, campaign finances, sponsored bills, public statements, and press coverage.
                                Head over to Rep. {info.last_name}'s official Congressional <a href={info.url} target="_blank" rel="noopener noreferrer">website</a> for
                                contact info and more!
                            </p>
                        </div>
                    </div>
                </div>
                ) : (
                <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                    <div className="text-center">
                        <img src="error-message.png" height="75px" alt="Error Message"></img>
                        <div className="mb-2">Something went wrong. <br />I'm unable to load info for your rep.</div>
                    </div>
                </div>
                )}
                <div className="text-center mb-4">
                    Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener noreferrer">@danielbrainich</a>
                </div>
            </div>
    );
}

export default Profile;
