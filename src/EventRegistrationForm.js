import React, { useState, useEffect } from 'react';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      errors.guestName = 'Guest Name is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>
            Age:
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </label>
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label>
            Are you attending with a guest?
            <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>
        </div>
        {formData.attendingWithGuest === 'Yes' && (
          <div>
            <label>
              Guest Name:
               <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} /> 
            </label>
            {errors.guestName && <p>{errors.guestName}</p>}
          </div> 
        )}
         <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Form Submission Summary:</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Age: {formData.age}</p>
          <p>Attending with Guest: {formData.attendingWithGuest}</p>
          {formData.attendingWithGuest === 'Yes' && <p>Guest Name: {formData.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
