import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddressForm = () => {
    const [name, setName] = useState('');
    const [addresses, setAddresses] = useState([{ street: '', city: '', state: '', postalCode: '' }]);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Handle changes in each address field
    const handleAddressChange = (index, e) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index][e.target.name] = e.target.value;
        setAddresses(updatedAddresses);
    };

    // Add another address field
    const addAddressField = () => {
        setAddresses([...addresses, { street: '', city: '', state: '', postalCode: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the name and addresses array to the backend
            const response = await axios.post('http://localhost:4000/api/submit', {
                name: name,
                addresses: addresses  // Pass the entire addresses array
            });
            setMessage('Thank you for submitting your address!');
            setSubmitted(true); // Mark the form as submitted
        } catch (error) {
            console.error('Error submitting data:', error);
            setMessage('There was an error submitting your data. Please try again.');
        }
    };

    // Reset the form after submission
    const resetForm = () => {
        setName('');
        setAddresses([{ street: '', city: '', state: '', postalCode: '' }]);
        setSubmitted(false);
    };

    return (
        <motion.div
            style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '24px',
                marginTop: '40px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {submitted ? (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Thank You!</h2>
                    <p style={{ marginBottom: '16px' }}>Your submission has been received.</p>
                    <button
                        onClick={resetForm}
                        style={{
                            padding: '10px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                    >
                        Submit Another
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ margin: '0' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>User Registration</h2>

                    <div>
                        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                            onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                        />
                    </div>

                    {addresses.map((address, index) => (
                        <motion.div
                            key={index}
                            style={{
                                backgroundColor: '#f9fafb',
                                padding: '16px',
                                borderRadius: '8px',
                                marginTop: '16px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <h3 style={{ fontSize: '18px', fontWeight: '500' }}>Address {index + 1}</h3>

                            {['street', 'city', 'state', 'postalCode'].map((field) => (
                                <div key={field}>
                                    <label style={{ display: 'block' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={address[field]}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            marginTop: '8px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            outline: 'none',
                                            transition: 'border-color 0.3s',
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                                        onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    ))}

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button
                            type="button"
                            onClick={addAddressField}
                            style={{
                                padding: '10px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                        >
                            Add Another Address
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 16px',
                                backgroundColor: '#22c55e',
                                color: 'white',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#22c55e')}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </motion.div>
    );
};

export default AddressForm;
