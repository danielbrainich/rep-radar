import { useState } from "react";
import CIVIC_INFO_API_KEY from './apiKeys';

const getData = async (zipCode) => {

    const apiUrl = 'https://www.googleapis.com/civicinfo/v2/representatives';
    const params = {
        address: zipCode,
        includeOffices: true,
        levels: 'country',
        roles: ['legislatorLowerBody', 'legislatorUpperBody'],
        key: CIVIC_INFO_API_KEY,
    };

    const urlWithParams = `${apiUrl}?address=${params.address}&includeOffices=${params.includeOffices}&levels=${params.levels}&roles=${params.roles[0]}&roles=${params.roles[1]}&key=${params.key}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        function getRepresentativeIndex(offices) {
            let representativeIndex = null;
            for (let office of offices) {
                if (office.name === 'U.S. Representative') {
                    representativeIndex = office.officialIndices;
                    break;
                }
            }
            return representativeIndex;
        }

        function getSenatorIndices(offices) {
            let senatorIndices = null;
            for (let office of offices) {
                if (office.name === 'U.S. Senator') {
                    senatorIndices = office.officialIndices;
                    break;
                }
            }
            return senatorIndices;
        }

        const indexSenator1 = getSenatorIndices(data.offices)[0];
        const indexSenator2 = getSenatorIndices(data.offices)[1];
        const indexRepresentative = getRepresentativeIndex(data.offices)[0];

        return {
            representative: data.officials[indexRepresentative],
            senator1: data.officials[indexSenator1],
            senator2: data.officials[indexSenator2],
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
            senator1: {},
            senator2: {},
        }
    }
};

function GetFederalOfficials() {

    const [representative, setRepresentative] = useState({});
    const [senator1, setSenator1] = useState({});
    const [senator2, setSenator2] = useState({});
    const [formData, setFormData] = useState({
        zipCode: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await getData(formData.zipCode);
        setRepresentative(data.representative);
        setSenator1(data.senator1);
        setSenator2(data.senator2);
    };

    const handleChangeInput = (event) => {
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
                <input onChange={handleChangeInput} required placeholder='Zip code' type='number' id='zip' name='zipCode' className='form-control' />
                <button className="btn btn-primary">Submit</button>
            </form>
            <ul>
                <li>Representative: {representative.name}</li>
                <li>Senators: {senator1.name} and {senator2.name}</li>
            </ul>
        </>
    );
};

export default GetFederalOfficials;
