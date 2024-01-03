import { useState, useEffect } from 'react';
import { getCivicInfoRepByAddress, getOpenSecretsRepId, getOpenSecretsCandidateContributions, getOpenSecretsCandidatePersonalFinances, getRepresentativeProPublicaInfo } from './api';
import statesData from './statesData';

function GetRepByAddressForm() {

    const [representativeInfo, setRepresentativeInfo] = useState({});
    const [repOpenSecretsId, setRepOpenSecretsId] = useState({});
    const [repContribData, setRepContribData] = useState({});
    const [RepFinancesData, setRepFinancesData] = useState({});
    const [RepBioGuideId, setRepBioGuideId] = useState({});
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });

    useEffect(() => {
        if (repContribData.response && repContribData.response.contributors) {
            console.log('repContribData:', repContribData.response.contributors[0]['@attributes'].org_name);
        }
    }, [repContribData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const address = `${formData.streetAddress} ${formData.city} ${formData.state} ${formData.zipCode}`

        const repData = await getCivicInfoRepByAddress(address);
        setRepresentativeInfo(repData);

        const repId = await getOpenSecretsRepId(repData.state, repData.representative.name);
        setRepOpenSecretsId(repId);

        const contribData = await getOpenSecretsCandidateContributions(repId.repId);
        setRepContribData(contribData);

        const bioGuideId = await getRepresentativeProPublicaInfo(repData.representative.name);
        setRepBioGuideId(bioGuideId);

        const financesData = await getOpenSecretsCandidatePersonalFinances(repId.repId);
        setRepFinancesData(financesData);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
            <div className="container">
                <div className="row min-vh-100">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="col-6">
                            <div className="col-6">
                                <p>Enter your address:</p>
                                <form onSubmit={handleSubmit}>
                                    <input onChange={handleAddressChange} required placeholder='Street address' type='text' id='streetAddress' name='streetAddress' className='form-control my-2' />
                                    <input onChange={handleAddressChange} required placeholder='City' type='text' id='city' name='city' className='form-control my-2' />
                                    <div>
                                        <select id="stateDropdown" onChange={handleAddressChange} className='form-control my-2' >
                                            <option value="">-- Select State --</option>
                                            {statesData.map((state) => (
                                            <option key={state.code} value={state.code}>
                                                {state.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <input onChange={handleAddressChange} required placeholder='Zip code' type='text' id='zipCode' name='zipCode' className='form-control my-2' />
                                    <button className="btn btn-primary my-2">Find My Rep</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col vh-25">
                                    {representativeInfo.representative && representativeInfo.office ? (
                                    <div>
                                        <h2>{representativeInfo.representative.name}</h2>
                                        <p>{representativeInfo.office.name}</p>
                                        <p>{representativeInfo.representative.party}</p>
                                        <p>{representativeInfo.office.district}</p>
                                    </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row">
                            <div className="col vh-25">
                            {repContribData && repContribData.contributors? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Contributor</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {repContribData.contributors.map((contributor, index) => (
                                            <tr key={`contributor-${index}`}>
                                                <td>{contributor['@attributes'].org_name}</td>
                                                <td>
                                                    {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    }).format(contributor['@attributes'].total)}
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default GetRepByAddressForm;
