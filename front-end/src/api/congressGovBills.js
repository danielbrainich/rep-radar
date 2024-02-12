const fetchCongressGovBillsData = async (bioId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/congress_gov/bills/${bioId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeCongressGovBillsData = (data) => {
    return {
        sponsoredLegislation: data.sponsoredLegislation,
        count: data.pagination.count
    };
};

const getCongressGovBills = async (bioId) => {
    try {
        const data = await fetchCongressGovBillsData(bioId);
        return reshapeCongressGovBillsData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            sponsoredLegislation: [],
            count: 0,
            error: true,
            errorMessage: error.message
        };
    }
};

export default getCongressGovBills;
