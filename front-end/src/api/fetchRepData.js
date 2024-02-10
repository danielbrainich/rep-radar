import getCivicInfoData from './civicInfo';
import getOpenSecretsId from './openSecretsIds';
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
    const repId = await getOpenSecretsId(repData.representative.state, repData.representative.name);
    const contribData = await getOpenSecretsContributions(repId.repId);
    const contribSummary = await getOpenSecretsSummary(repId.repId);
    const proPubInfo = await getProPublicaIds(repData.representative.name);
    const congressGovPhoto = await getCongressGovPhoto(proPubInfo.id);
    const sponsoredBillInfo = await getCongressGovBills(proPubInfo.id);
    const statements = await getProPublicaStatements(proPubInfo.id);
    const news = await getNewsApiData(repData.representative.name);

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
    console.log("All Rep Data:", allRepData)
    return allRepData
};

export default fetchRepData;
