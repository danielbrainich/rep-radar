import { CIVIC_INFO_API_KEY, OPEN_SECRETS_API_KEY } from './apiKeys';
import statesData from './statesData';

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

        const civicInfoRep = {
            representative: data.officials[0],
            state: data.normalizedInput.state,
        }
        //clean this return up when you know exactly what data you'll need
        console.log(civicInfoRep);
        return civicInfoRep;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
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
        console.log(repId);
        return repId;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representativeId: '',
        }
    }
};

const getOpenSecretCandidatesInfo = async (officialId) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'candContrib',
        apiKey: OPEN_SECRETS_API_KEY,
        cid: officialId,
        cycle: '2000', // out of range cycle returns most recent cycle
        output: 'json',
    }

    const urlWithParams = `${apiUrl}?method=${params.method}&apikey=${params.apiKey}&cid=${params.cid}&cycle=${params.cycle}&output=${params.output}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representativeContribInfo: '',
        }
    }
}

export { getCivicInfoRepByAddress, getOpenSecretsRepId, getOpenSecretCandidatesInfo };
