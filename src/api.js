import { CIVIC_INFO_API_KEY, OPEN_SECRETS_API_KEY, PRO_PUBLICA_API_KEY,  } from './apiKeys';

const getCivicInfoRepByAddress = async (zipCode) => {

    const apiUrl = 'https://www.googleapis.com/civicinfo/v2/representatives';
    const params = {
        address: zipCode,
        includeOffices: true,
        levels: 'country',
        roles: 'legislatorLowerBody',
        key: CIVIC_INFO_API_KEY,
    };

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        function extractDistrictNumber(inputString) {
            const parts = inputString.split("cd:");
            return parts.length === 2 ? parseInt(parts[1], 10) : null;
        }

        const civicInfoRep = {
            representative: {
                name: data.officials[0].name,
                party: data.officials[0].party,
                urls: data.officials[0].urls,
                channels: data.officials[0].channels,
            },
            office: {
                name: data.offices[0].name,
                district: `${data.normalizedInput.state}-${extractDistrictNumber(data.offices[0].divisionId)}`,
            },
            state: data.normalizedInput.state,
        };
        return civicInfoRep;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
            office: {},
            state: '',
        }
    }
};

const getOpenSecretsRepId = async (repState, repName) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'getLegislators',
        id: repState,
        apikey: OPEN_SECRETS_API_KEY,
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        function cleanName(repName) {
            const names = repName.split(' ');
            if (names.length > 2) {
              names.splice(1, 1);
            }
            return names.join(' ');
          }

        function getOpenSecretsRepIdFromName(stateRepList, repName) {
            const cleanedName = cleanName(repName);
            for (let rep of stateRepList) {
                if (rep['@attributes'].firstlast === cleanedName) {
                    return rep['@attributes'].cid
                }
            }
            return null;
        }

        const repId = getOpenSecretsRepIdFromName(data.response.legislator, repName);

        return {'repId': repId};

    } catch (error) {
        console.error('Error fetching data:', error);
        return {'repId': ''};;
    }
};

const getOpenSecretsCandidateContributions = async (officialId) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'candContrib',
        apikey: OPEN_SECRETS_API_KEY,
        cid: officialId,
        cycle: '2024',
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        const contribData = {
            contributors: data.response.contributors.contributor
        }
        console.log(contribData)
        return contribData;

    } catch (error) {
        console.error('Error fetching data:', error);
        return { contributors: [] };
    }
};


const getOpenSecretsCandidatePersonalFinances = async (officialId) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'memPFDprofile',
        apikey: OPEN_SECRETS_API_KEY,
        cid: officialId,
        cycle: '2024',
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representativeContribInfo: '',
        }
    }
}

const getRepresentativeProPublicaInfo = async (repName) => {

    const params = {
        congress: 118,
        chamber: 'house',
        // in_office: true,
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
                geoid: matchingMember.geoid,
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

export { getCivicInfoRepByAddress, getOpenSecretsRepId, getOpenSecretsCandidateContributions, getOpenSecretsCandidatePersonalFinances, getRepresentativeProPublicaInfo};
