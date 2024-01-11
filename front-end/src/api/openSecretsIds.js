const fetchOpenSecretsIds = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const cleanName = (repName) => {
    const names = repName.split(' ');
    if (names.length > 2) {
      names.splice(1, 1);
    }
    return names.join(' ');
};

const getOpenSecretsId = async (repState, repName) => {
    const apiUrl = `http://localhost:8000/api/open_secrets/ids/${repState}`;
    try {
        const data = await fetchOpenSecretsIds(apiUrl);
        const cleanedName = cleanName(repName);
        for (let rep of data.response.legislator) {
            if (rep['@attributes'].firstlast === cleanedName) {
                return { 'repId': rep['@attributes'].cid };
            }
        }
        return { 'repId': null };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { 'repId': '', 'error': true, 'errorMessage': error.message };
    }
};

export default getOpenSecretsId;
