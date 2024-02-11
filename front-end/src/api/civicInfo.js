const fetchCivicInfoData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeCivicInfoData = (data) => {

    function extractDistrictNumber(inputString) {
        const cdSection = inputString.split("cd:");
        if (cdSection.length === 2) {
            return parseInt(cdSection[1], 10);
        }
        else if (!inputString.includes("cd:")) {
            return "At-Large";
        }
        return null;
    }
    console.log("districtnumber", extractDistrictNumber(data.offices[0].divisionId))
    return {
        representative: {
            name: data.officials[0].name,
            party: data.officials[0].party,
            urls: data.officials[0].urls,
            channels: data.officials[0].channels,
            office: data.offices[0].name,
            district: extractDistrictNumber(data.offices[0].divisionId),
            state: data.normalizedInput.state,
        },
    };
};

const getCivicInfoData = async (address) => {
    try {
        const data = await fetchCivicInfoData(`http://localhost:8000/api/civic_info/${address}`);
        console.log(data)
        return reshapeCivicInfoData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
            error: true,
            errorMessage: error.message
        };
    };
};

export default getCivicInfoData;
