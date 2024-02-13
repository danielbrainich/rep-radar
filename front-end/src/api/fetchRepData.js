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
    const proPubInfo = await getProPublicaIds(repData.representative.district, repData.representative.state);

    // Fetch data that depends on the ProPublica ID simultaneously
    const promises = [
        getOpenSecretsId(repData.representative.state, proPubInfo.id),
        getCongressGovPhoto(proPubInfo.id),
        getCongressGovBills(proPubInfo.id),
        getProPublicaStatements(proPubInfo.id),
        getNewsApiData(repData.representative.name)
    ];

    const [openSecretsId, congressGovPhoto, sponsoredBillInfo, statements, news] = await Promise.all(promises);

    // Fetch OpenSecrets data simultaneously
    const openSecretsPromises = [
        getOpenSecretsContributions(openSecretsId.repId),
        getOpenSecretsSummary(openSecretsId.repId)
    ];

    const [contribData, contribSummary] = await Promise.all(openSecretsPromises);

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
};

export default fetchRepData;
