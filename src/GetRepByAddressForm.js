import { useState } from 'react';
import { getCivicInfoRepByAddress, getOpenSecretsRepId, getOpenSecretCandidatesInfo } from './api'

function GetRepByAddressForm() {

    const [representative, setRepresentative] = useState({});
    const [repOpenSecretsId, setRepOpenSecretsId] = useState({});
    const [repContribData, setRepContribData] = useState({});
    const [formData, setFormData] = useState({
        zipCode: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const repData = await getCivicInfoRepByAddress(formData.zipCode);
        setRepresentative(repData.representative);

        const repId = await getOpenSecretsRepId(repData.state, repData.representative.name);
        setRepOpenSecretsId(repId)

        const contribData = await getOpenSecretCandidatesInfo(repId);
        setRepContribData(contribData);
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
        <>
            <p>Enter your zip code:</p>
            <form onSubmit={handleSubmit}>
                <input onChange={handleZipCodeChange} required placeholder='Zip code' type='number' id='zipCode' name='zipCode' className='form-control' />
                <button className="btn btn-primary">Submit</button>
            </form>
            <ul>
                <li>Representative: {representative.name}</li>
            </ul>
        </>
    );
};

export default GetRepByAddressForm;
