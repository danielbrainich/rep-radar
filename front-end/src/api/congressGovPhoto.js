const fetchCongressGovPhotoData = async (bioId) => {
    const url = `http://localhost:8000/api/congress_gov/photo/${bioId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeCongressGovPhotoData = (data) => {
    return {
        imageUrl: data.member.depiction.imageUrl
    };
};

const getCongressGovPhoto = async (bioId) => {
    try {
        const data = await fetchCongressGovPhotoData(bioId);
        return reshapeCongressGovPhotoData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            imageUrl: '',
            error: true,
            errorMessage: error.message
        };
    }
};

export default getCongressGovPhoto;
