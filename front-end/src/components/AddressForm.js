import { useState } from 'react';
import statesData from '../statesData';

function AddressForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const handleAddressChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="col">
            <form onSubmit={handleSubmit}>
                <input onChange={handleAddressChange} required placeholder='Street address' type='text' id='streetAddress' name='streetAddress' className='form-control my-2 custom-input' />
                <input onChange={handleAddressChange} required placeholder='City' type='text' id='city' name='city' className='form-control my-2 custom-input' />
                <div>
                    <select id="stateDropdown" onChange={handleAddressChange} className='form-control my-2 custom-input'>
                        <option value="">State</option>
                        {statesData.map((state) => (
                            <option key={state.code} value={state.code}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input onChange={handleAddressChange} required placeholder='Zip code' type='text' id='zipCode' name='zipCode' className='form-control my-2 custom-input' />
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary form-control square-edge mt-4">Find my rep</button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;
