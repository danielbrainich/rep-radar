import { useState, useEffect } from 'react';
import { getCivicInfoRepByAddress, getOpenSecretsRepId, getOpenSecretCandidatesInfo } from './api';
import statesData from './statesData';

function GetRepByAddressForm() {

    const [representative, setRepresentative] = useState({});
    const [repOpenSecretsId, setRepOpenSecretsId] = useState({});
    const [repContribData, setRepContribData] = useState({});
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });

    useEffect(() => {
        if (repContribData.response && repContribData.response.contributors) {
            console.log('repContribData:', repContribData.contributor[0]['@attributes'].org_name);
        }
    }, [repContribData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const address = `${formData.streetAddress} ${formData.city} ${formData.state} ${formData.zipCode}`

        const repData = await getCivicInfoRepByAddress(address);
        setRepresentative(repData.representative);

        const repId = await getOpenSecretsRepId(repData.state, repData.representative.name);
        setRepOpenSecretsId(repId)

        const contribData = await getOpenSecretCandidatesInfo(repId);
        setRepContribData(contribData.response.contributors);
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
                <div className="row">
                    <div className="col">
                        <p>Enter your address:</p>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleAddressChange} required placeholder='Street address' type='text' id='streetAddress' name='streetAddress' className='form-control my-2' />
                            <input onChange={handleAddressChange} required placeholder='City' type='text' id='city' name='city' className='form-control my-2' />
                            <div>
                            <select id="stateDropdown" onChange={handleAddressChange} className='form-control my-2' >
                                <option value="">-- State --</option>
                                {statesData.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name}
                                </option>
                                ))}
                            </select>
                            </div>
                            <input onChange={handleAddressChange} required placeholder='Zip code' type='text' id='zipCode' name='zipCode' className='form-control my-2' />
                            <button className="btn btn-primary my-2">Submit</button>
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
