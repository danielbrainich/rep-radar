import { OPEN_SECRETS_API_KEY } from '../apiKeys';

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

export { getOpenSecretsRepId, getOpenSecretsCandidateContributions, getOpenSecretsCandidatePersonalFinances };
