import { PRO_PUBLICA_API_KEY } from '../apiKeys';


const getRepresentativeProPublicaInfo = async (repName) => {

    const params = {
        congress: 118,
        chamber: 'house',
    }
    const apiUrl = `https://api.propublica.org/congress/v1/${params.congress}/${params.chamber}/members.json`

    const headers = new Headers({
        'X-API-Key': PRO_PUBLICA_API_KEY,
    });

    try {
        const response = await fetch(apiUrl, { headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        const [firstName, lastName] = repName.split(' ');

        let matchingMember;

        for (let member of data.results[0].members) {
            if (
                member.first_name.toLowerCase() === firstName.toLowerCase() &&
                member.last_name.toLowerCase() === lastName.toLowerCase()
            ) {
                matchingMember = member;
                break;
            }
        }

        if (matchingMember) {
            const proPublicaRepInfo = {
                district: matchingMember.district,
                id: matchingMember.id,
                crp_id: matchingMember.crp_id,
            }
            return proPublicaRepInfo;

        } else {
            console.log(`No match found for ${firstName} ${lastName}`);
            return null;
        }
    }

    catch (error) {
        console.error('Error fetching data:', error);
        return {
            district: '',
            geoid: '',
            crp_id: '',
        }
    }
}

export { getRepresentativeProPublicaInfo };
