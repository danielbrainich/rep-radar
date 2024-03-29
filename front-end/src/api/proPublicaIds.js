const fetchProPublicaMemberData = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/pro_publica/ids`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching member data:', error);
        throw error;
    }
};

const findMatchingMember = (data, repDistrict, repState) => {

    let filteredMembers = data.results[0].members.filter(member =>
        member.state.toLowerCase() === repState.toLowerCase() &&
        String(member.district) === String(repDistrict)
    );

    return filteredMembers.length > 0 ? filteredMembers[0] : null;
};

const getProPublicaIds = async (repDistrict, repState) => {
    try {
        const rawData = await fetchProPublicaMemberData();
        const matchingMember = findMatchingMember(rawData, repDistrict, repState);

        if (matchingMember) {
            return matchingMember;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error in getProPublicaIds:', error);
        return {
            error: true,
            message: error.message,
            data: null
        };
    }
};

export default getProPublicaIds;
