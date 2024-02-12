const fetchCongressGovPhotoData = async (bioId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/congress_gov/photo/${bioId}`;
    console.log("URL", process.env.REACT_APP_API_URL)
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
