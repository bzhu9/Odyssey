import React, {useState} from "react"
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const submit = (e) => {
        e.preventDefault()
        console.log(email)
    }
    return (
        <>
        <form onSubmit = {submit}>
            <label for="email">Email </label>
            <input value = {email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder = "Type your email here" id="email" name="email" />
            <br></br>
            <label for="password"> Password </label>
            <input value = {password} onChange={(e) => setPassword(e.target.value)} type = "password " placeholder = "Type your password here" id="password" name="password" />
        </form>
        <button type="submit">Sign in</button>
        <br></br><button>Create an account</button>
        </>
    )
}