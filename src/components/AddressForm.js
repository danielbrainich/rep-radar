import { useState } from 'react';
import statesData from '../statesData';

function AddressForm({ onSubmit, text }) {
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
                <div className="row g-2 mb-3">
                    <div className="col-md">
                        <select id="stateDropdown" onChange={handleAddressChange} className='form-control custom-input'>
                            <option value="">State</option>
                            {statesData.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <input onChange={handleAddressChange} required placeholder='Zip code' type='text' id='zipCode' name='zipCode' className='form-control custom-input' />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-secondary form-control mt-1 mb-4">{text}</button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;
