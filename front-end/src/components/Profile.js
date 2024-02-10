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
   let subject_pronoun = "they";
   let object_pronoun = "them";
   if (info.gender === "F") {
       possessive_pronoun = "her";
       subject_pronoun = "she";
       object_pronoun = "her";
   } else if (info.gender === "M") {
       possessive_pronoun = "his";
       subject_pronoun = "he";
       object_pronoun = "him";
   }
   const capitalizedPossessivePronoun = possessive_pronoun.charAt(0).toUpperCase() + possessive_pronoun.slice(1);
    return (
        <>
            <div class="col d-flex flex-between flex-column">
                {profile.representative && (
                    <div className="text-center">
                        <h3 className="card-title pb-4">{profile.representative.name}</h3>
                        Your rep is Rep. {profile.representative.name}. {capitalizedPossessivePronoun} congressional district
                        is {profile.representative.state}-{profile.representative.district} and {subject_pronoun} is a member of the {profile.representative.party}. Explore this site
                        for info on {possessive_pronoun} voting record, campaign finances, sponsored bills, public statements, and more!
                        {console.log("INFO", info)}
                        <div className="pb-2">
                            <CongressGovPhoto info={info} photo={photo} />
                        </div>
                        <div>{profile.representative.office}</div>
                        <div>{profile.representative.party}</div>
                        <div>{profile.representative.state}-{profile.representative.district}</div>
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
                <div className="text-center mt-5">Created by <a href="https://www.danielbrainich.com" target="_blank" rel="noopener norefferer">@danielbrainich</a></div>
            </div>
        </>
    );
}

export default Profile;
