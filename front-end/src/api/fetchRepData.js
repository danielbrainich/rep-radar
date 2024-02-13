import getCivicInfoData from './civicInfo';
import getOpenSecretsContributions from './openSecretsContributions';
import getOpenSecretsSummary from './openSecretsSummary';
import getProPublicaIds from './proPublicaIds';
import getProPublicaStatements from './proPublicaStatements';
import getCongressGovBills from './congressGovBills';
import getCongressGovPhoto from './congressGovPhoto';
import getNewsApiData from './newsApi';

const fetchRepData = async (formData) => {
    const address = `${formData.streetAddress} ${formData.city} ${formData.state} ${formData.zipCode}`;
    const repData = await getCivicInfoData(address);
    const proPubInfo = await getProPublicaIds(repData.representative.district, repData.representative.state);

    // Combine all fetch promises into a single Promise.all call
    const allPromises = Promise.all([
        getCongressGovPhoto(proPubInfo.id),
        getCongressGovBills(proPubInfo.id),
        getProPublicaStatements(proPubInfo.id),
        getNewsApiData(repData.representative.name),
        getOpenSecretsContributions(proPubInfo.crp_id),
        getOpenSecretsSummary(proPubInfo.crp_id)
    ]);

    const [
        congressGovPhoto,
        sponsoredBillInfo,
        statements,
        news,
        contribData,
        contribSummary
    ] = await allPromises;

    const allRepData =  {
        representativeInfo: repData,
        repContribData: contribData.contributions,
        repContribSummary: contribSummary.summary,
        proPublicaInfo: proPubInfo,
        repPhoto: congressGovPhoto,
        repSponsoredBills: sponsoredBillInfo,
        repStatements: statements,
        news: news,
    };

    console.log("All Rep Data:", allRepData);
    return allRepData;
};

export default fetchRepData;
