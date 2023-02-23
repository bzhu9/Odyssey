import React, { useState } from "react";

export const CreateEvent = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [seq, setSeq] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-form-container">
        This is the map page
        </div>
    )
}