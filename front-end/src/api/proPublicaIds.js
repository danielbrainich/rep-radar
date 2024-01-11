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


const findMatchingMember = (data, repName) => {
    const [firstName, lastName] = repName.split(' ');

    let filteredMembers = data.results[0].members.filter(member =>
        member.last_name.toLowerCase() === lastName.toLowerCase()
    );

    let matchingMember = null;

    if (filteredMembers.length === 1) {
        matchingMember = filteredMembers[0];
    } else if (filteredMembers.length > 1) {
        matchingMember = filteredMembers.find(member =>
            member.first_name.toLowerCase() === firstName.toLowerCase()
        );
    }

    return matchingMember;
};


const getProPublicaIds = async (repName) => {
    try {
        const rawData = await fetchProPublicaMemberData();
        const matchingMember = findMatchingMember(rawData, repName);

        if (matchingMember) {
            console.log('Matching member found:', matchingMember);
            return matchingMember;
        } else {
            console.log(`No match found for ${repName}`);
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
