import React, { useState } from 'react';
import '../App.css';

const SubscribeForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            setMessage('Submitting...');
            setIsSuccess(false);
            return;
        }

        setIsSubmitting(true);

        setTimeout(async () => {
            const data = {
                name,
                email,
            };

            try {
                const response = await fetch(`${process.env.REACT_APP_PATHLESS_SUBSCRIBE_URL}`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    setMessage(result.message);
                    setIsSuccess(true);
                } else if (response.status === 409) {
                    setMessage(`${email} has already been signed up!`);
                    setIsSuccess(false);
                } else {
                    setMessage('Error: Unable to subscribe. Please try again later.');
                    setIsSuccess(false);
                }
            } catch (error) {
                setMessage('Error: Unable to connect to the server.');
                setIsSuccess(false);
            } finally {
                setIsSubmitting(false);
            }
        }, 1000);
    };

    return (
        <div className="container">
            <h1>The first travel app for every niche</h1>
            <p>Be the first to know when our app goes live!</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
                <button type="submit" disabled={isSubmitting}>Sign up</button>
            </form>
            <footer>
                <p>We'll never share your email with anyone else.</p>
            </footer>
            {message && (
            <div className={`message-box ${isSuccess ? 'success' : 'error'}`}>
                {message}
            </div>
            )}
        </div>
    );
};

export default SubscribeForm;