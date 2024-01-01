import { CIVIC_INFO_API_KEY, OPEN_SECRETS_API_KEY } from './apiKeys';

const getCivicInfoOfficialsByAddress = async (zipCode) => {

    const apiUrl = 'https://www.googleapis.com/civicinfo/v2/representatives';
    const params = {
        address: zipCode,
        includeOffices: true,
        levels: 'country',
        roles: ['legislatorLowerBody', 'legislatorUpperBody'],
        key: CIVIC_INFO_API_KEY,
    };

    const urlWithParams = `${apiUrl}?address=${params.address}&includeOffices=${params.includeOffices}&levels=${params.levels}&roles=${params.roles[0]}&roles=${params.roles[1]}&key=${params.key}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        function getOfficialIndicesByRole(offices, roleName) {
            let OfficialIndices = null;
            for (let office of offices) {
                if (office.name === roleName) {
                    OfficialIndices = office.officialIndices;
                    break;
                }
            }
            return OfficialIndices;
        }

        const indexSenator1 = getOfficialIndicesByRole(data.offices, 'U.S. Senator')[0];
        const indexSenator2 = getOfficialIndicesByRole(data.offices, 'U.S. Senator')[1];
        const indexRepresentative = getOfficialIndicesByRole(data.offices, 'U.S. Representative')[0];

        return {
            representative: data.officials[indexRepresentative],
            senator1: data.officials[indexSenator1],
            senator2: data.officials[indexSenator2],
            state: data.normalizedInput.state,
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
            senator1: {},
            senator2: {},
            state: '',
        }
    }
};

const getOpenSecretsCandidateIds = async (officialsState, representativeName, senator1Name, senator2Name) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'getLegislators',
        id: officialsState,
        apiKey: OPEN_SECRETS_API_KEY,
        output: 'json',
    }

    const urlWithParams = `${apiUrl}?method=${params.method}&id=${params.id}&apikey=${params.apiKey}&output=${params.output}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        function getLegislatorIdFromName(data, name) {
            for (let legislator of data) {
                if (legislator['@attributes'].firstlast === name) {
                    return {
                        firstlast: legislator['@attributes'].firstlast,
                        cid: legislator['@attributes'].cid,
                    };
                }
            }
            return null;
        }

        const representativeId = getLegislatorIdFromName(data.response.legislator, representativeName);
        const senator1Id = getLegislatorIdFromName(data.response.legislator, senator1Name);
        const senator2Id = getLegislatorIdFromName(data.response.legislator, senator2Name);

        return {
            a: representativeId,
            b: senator1Id,
            c: senator2Id,
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representativeId: '',
            senator1Id: '',
            senator2Id: '',
        }
    }

};

export { getCivicInfoOfficialsByAddress, getOpenSecretsCandidateIds };
