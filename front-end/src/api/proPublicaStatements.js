const fetchProPublicaStatements = async (repId) => {
    const apiUrl = `http://localhost:8000/api/pro_publica/statements/${repId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const reshapeProPublicaResponse = (data) => {
    return data;
};

const getProPublicaStatements = async (repId) => {
    try {
        const rawData = await fetchProPublicaStatements(repId);
        const reshapedData = reshapeProPublicaResponse(rawData);
        return reshapedData;
    } catch (error) {
        console.error('Error in getProPublicaStatements:', error);
        return {
            error: true,
            message: error.message || 'An error occurred while fetching data',
            data: null
        };
    }
};

export default getProPublicaStatements;
