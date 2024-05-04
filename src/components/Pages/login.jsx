import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Logo from "../assets/black 1.svg";
import { Button, Form, Input } from 'antd';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in using local storage
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            navigate("/kabinet"); // Redirect to kabinet page if user is already logged in
        }
    }, []);

    const checkEmail = (e) => {
        e.preventDefault();
        if (email === "admin" && password === "1234") {
            // Save user data to local storage
            localStorage.setItem("loggedInUser", JSON.stringify({ email }));
            navigate("/kabinet");
        } else {
            toast("Email yoki parol xato ", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <img style={{ width: "250px", margin: "150px 35% 30px 35%" }} src={Logo} alt="" />
            <Form
                name="basic"
                layout={"vertical"}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600, margin: "0 30% 0 35%" }}
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button style={{ backgroundColor: "#FEC200", color: "white", width: "150px" }} htmlType="submit" onClick={checkEmail}>
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;
