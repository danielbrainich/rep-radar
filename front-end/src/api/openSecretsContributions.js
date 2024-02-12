const fetchOpenSecretsData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeOpenSecretsContributions = (data) => {
    return {
        contributions: {
            contributors: data.response.contributors.contributor,
            cycle: data.response.contributors['@attributes'].cycle,
            notice: data.response.contributors['@attributes'].notice,
            origin: data.response.contributors['@attributes'].origin,
        }
    };
};

const getOpenSecretsContributions = async (cid) => {
    try {
        const data = await fetchOpenSecretsData(`https://rep-radar-2d24b585519f.herokuapp.com/api/open_secrets/contributions/${cid}`);
        return reshapeOpenSecretsContributions(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            contributions: {},
            error: true,
            errorMessage: error.message
        };
    }
};

export default getOpenSecretsContributions;
