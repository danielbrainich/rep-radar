import { useState } from 'react';
import { getCivicInfoOfficialsByAddress, getOpenSecretsCandidateIds } from './api'

function GetOfficialsByAddressForm() {

    const [representative, setRepresentative] = useState({});
    const [senator1, setSenator1] = useState({});
    const [senator2, setSenator2] = useState({});
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
            data.representative.name,
            data.senator1.name,
            data.senator2.name
        );

        console.log(officialsIds);
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
