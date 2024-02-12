const fetchOpenSecretsIds = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const getOpenSecretsId = async (repState, repId) => {
    const apiUrl = `https://rep-radar-2d24b585519f.herokuapp.com/api/open_secrets/ids/${repState}`;
    try {
        const data = await fetchOpenSecretsIds(apiUrl);
        for (let rep of data.response.legislator) {
            if (rep['@attributes'].bioguide_id === repId) {
                return { 'repId': rep['@attributes'].cid };
            }
        }
        return { 'repId': null };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            'repId': '',
            'error': true,
            'errorMessage': error.message
        };
    }
};

export default getOpenSecretsId;
