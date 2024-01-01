import { useState, useEffect } from 'react';
import { getCivicInfoRepByAddress, getOpenSecretsRepId, getOpenSecretCandidatesInfo } from './api'

function GetRepByAddressForm() {

    const [representative, setRepresentative] = useState({});
    const [repOpenSecretsId, setRepOpenSecretsId] = useState({});
    const [repContribData, setRepContribData] = useState({});
    const [formData, setFormData] = useState({
        zipCode: '',
    });


    useEffect(() => {
        if (repContribData.response && repContribData.response.contributors) {
            console.log('repContribData:', repContribData.contributor[0]['@attributes'].org_name);
        }
    }, [repContribData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const repData = await getCivicInfoRepByAddress(formData.zipCode);
        setRepresentative(repData.representative);

        const repId = await getOpenSecretsRepId(repData.state, repData.representative.name);
        setRepOpenSecretsId(repId)

        const contribData = await getOpenSecretCandidatesInfo(repId);
        setRepContribData(contribData.response.contributors);
    }

    const handleZipCodeChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p>Enter your zip code:</p>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleZipCodeChange} required placeholder='Zip code' type='number' id='zipCode' name='zipCode' className='form-control' />
                            <button className="btn btn-primary">Submit</button>
                        </form>
                        <p>Representative: {representative.name}</p>
                        {repContribData.contributor ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Contributor</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {repContribData.contributor.map((contributor, index) => (
                                <tr key={`contributor-${index}`}>
                                    <td>{contributor['@attributes'].org_name}</td>
                                    <td>{contributor['@attributes'].total}</td>
                                </tr>

                                ))}
                            </tbody>
                        </table>
                        ) : null}
                    </div>
                </div>
            </div>
    );
};

export default GetRepByAddressForm;
