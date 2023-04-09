import React, { useState } from "react";

export const Map = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [seq, setSeq] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
           <div className="google-map-code">
            <iframe src="https://www.google.com/maps/d/embed?mid=1iJNavSKjqCfmz_2OqApvTrRtsO0&hl=en_US&ehbc=2E312F" width="640" height="480"></iframe>
          {/* <iframe src="https://www.google.com/maps/d/u/0/viewer?mid=1iJNavSKjqCfmz_2OqApvTrRtsO0&hl=en_US&ll=40.424713372458996%2C-86.8911078768158&z=14" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
        </div>
    )
}