import React from 'react';
import {Button, Drawer, Form, Input} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import TextArea from "antd/es/input/TextArea";

const App = ({open,setOpen}) => {

    const {editData} = useSelector(state => state.XodimlarReducer)


    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const onClose = () => {
        setOpen(false);
    };
    function onFinish(value) {
        if (editData.id){
            dispatch({type:"EDIT_SAVE",payload:value})

        }

        else {
            dispatch({type:"ADD_USER", payload:value})


        }

        setOpen(false)
        form.resetFields()

    }
    return (
        <>

            <Drawer title="Hodim qo'shish" onClose={onClose} open={open}>

                <Form form={form} onFinish={onFinish} layout={"vertical"}>
                    <Form.Item className={'w-50 '} initialValue={editData.id} name={"id"} rules={[{required:true}]}>
                        <Input type={"number"}  placeholder={"ID"}/>
                    </Form.Item>
                    <Form.Item initialValue={editData.fullname} name={"fullname"}  rules={[{required:true}]}>

                        <Input
                            prefix={<h5 className={"bi bi-person-circle"}>:</h5>}
                             type={"text"} placeholder={"F.I.Sh..."}/>
                    </Form.Item>
                    <Form.Item initialValue={editData.email} name={"email"}  rules={[{required:true}]}>

                        <Input
                            prefix={<h5 className={"bi bi-envelope-fill"}>:</h5>}
                            type={"text"} placeholder={"Email..."}/>

                    </Form.Item>

                    <Form.Item initialValue={editData.password} name={"password"}  rules={[{required:true}]}>
                        <Input
                            prefix={<h5 className={"bi bi-eye-fill"}>:</h5>}
                            type={"text"} placeholder={"Password..."}/>
                    </Form.Item>

                    <Form.Item  >
                        <button style={{backgroundColor:"#FEC200",padding:"7px 20px",fontSize:"17px",color:"black",fontWeight:"500",
                        border:"1px solid transparent"}}
                                htmlType={"submit"}  className={"  float-end"}>Saqlash</button>
                    </Form.Item>

                </Form>

            </Drawer>
        </>
    );
};
export default App;