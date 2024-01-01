import { useState } from 'react';
import { getCivicInfoOfficialsByAddress, getOpenSecretsCandidateIds } from './api'

function GetOfficialsByAddressForm() {

    const [representative, setRepresentative] = useState({});
    const [senator1, setSenator1] = useState({});
    const [senator2, setSenator2] = useState({});
    // const [representativeId, setRepresentativeId] = useState({});
    // const [senator1Id, setSenator1Id] = useState({});
    // const [senator2Id, setSenator2Id] = useState({});
    const [formData, setFormData] = useState({
        zipCode: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await getCivicInfoOfficialsByAddress(formData.zipCode);
        setRepresentative(data.representative);
        setSenator1(data.senator1);
        setSenator2(data.senator2);

        const officialsIds = await getOpenSecretsCandidateIds(
            data.state,
            representative.name,
            senator1.name,
            senator2.name
        );
        // setRepresentativeOpenSecretsId(data.RepresentativeOpenSecretsId)
        // setSenator1OpenSecretsId(data.Senator1OpenSecretsId)
        // setSenator2OpenSecretsId(data.Senator2OpenSecretsId)

    };


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
                <li>Senators: {senator1.name} and {senator2.name}</li>
            </ul>
        </>
    );
};

export default GetOfficialsByAddressForm;
