import React, { useState } from 'react';
import getCivicInfoRepByAddress from './api/civicInfoApi';
import { getOpenSecretsRepId, getOpenSecretsCandidateContributions, getOpenSecretsCandidatePersonalFinances } from './api/openSecretsApi';
import { getRepresentativeProPublicaInfo } from './api/proPublicaApi';
import AddressForm from './components/AddressForm';
import RepresentativeInfo from './components/RepresentativeInfo';
import ContributionsTable from './components/ContributionsTable';
import ProPublicaInfo from './components/ProPublicaInfo';
import getCongressGovPhoto from './api/congressApi';

function GetRepByAddressForm() {
    const [representativeInfo, setRepresentativeInfo] = useState({});
    const [repContribData, setRepContribData] = useState({});
    const [proPublicaInfo, setProPublicaInfo] = useState({});
    const [repPhoto, setRepPhoto] = useState({});

    const handleFormSubmit = async (formData) => {

        const address = `${formData.streetAddress} ${formData.city} ${formData.state} ${formData.zipCode}`;

        const repData = await getCivicInfoRepByAddress(address);
        setRepresentativeInfo(repData);

        const repId = await getOpenSecretsRepId(repData.state, repData.representative.name);

        const contribData = await getOpenSecretsCandidateContributions(repId.repId);
        setRepContribData(contribData);

        const proPubInfo = await getRepresentativeProPublicaInfo(repData.representative.name);
        setProPublicaInfo(proPubInfo);

        const congressGovPhoto = await getCongressGovPhoto(proPubInfo.id);
        setRepPhoto(congressGovPhoto);
    };

    return (
        <div className="container">
            <AddressForm onSubmit={handleFormSubmit} />
            <RepresentativeInfo repInfo={representativeInfo} />
            <ContributionsTable contributions={repContribData} />
            <ProPublicaInfo info={proPublicaInfo} />
        </div>
    );
}

export default GetRepByAddressForm;
