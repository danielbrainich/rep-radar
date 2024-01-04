import { CONGRESS_GOV_API_KEY } from '../apiKeys';


const getCongressGovPhoto = async (bioGuideId) => {

    const params = {
        bioGuideId: bioGuideId,
        api_key: CONGRESS_GOV_API_KEY,
    }


    const apiUrl = `https://api.congress.gov/v3/member/${params.bioGuideId}?api_key=${params.api_key}`

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.member.depiction.imageUrl);
    }

    catch (error) {
        console.error('Error fetching data:', error);
        return {
            district: '',
            geoid: '',
            crp_id: '',
        }
    }
}

export default getCongressGovPhoto;
