const fetchProPublicaMemberData = async () => {
    const apiUrl = `http://localhost:8000/api/pro_publica/ids`;

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
    console.log("DATA", data)
    console.log("STATE", repState)
    console.log("DISTRICT", repDistrict)

    let filteredMembers = data.results[0].members.filter(member =>
        member.state.toLowerCase() === repState.toLowerCase() &&
        Number(member.district) === Number(repDistrict)
    );

    return filteredMembers.length > 0 ? filteredMembers[0] : null;
};

const getProPublicaIds = async (repDistrict, repState) => {
    try {
        const rawData = await fetchProPublicaMemberData();
        console.log(rawData);
        const matchingMember = findMatchingMember(rawData, repDistrict, repState);

        if (matchingMember) {
            console.log('Matching member found:', matchingMember);
            return matchingMember;
        } else {
            console.log(`No match found for state: ${repState}, district: ${repDistrict}`);
            return null;
        }
    } catch (error) {
        console.error('Error in getProPublicaIds:', error);
        return {
            error: true,
            message: error.message || 'An error occurred while fetching data',
            data: null
        };
    }
};

export default getProPublicaIds;
