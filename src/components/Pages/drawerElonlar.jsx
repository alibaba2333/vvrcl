import React from 'react';
import {Button, Drawer, Form, Input,Upload,Switch} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const App = ({open,setOpen}) => {




    const [form] = Form.useForm()

    const onClose = () => {
        setOpen(false);
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>

            <Drawer title="E'lon qo'shish" onClose={onClose} open={open}>

                <Form form={form}  layout={"vertical"}>
                    <Form.Item style={{border:"none",width:"100px"}}  rules={[{required:true}]}>
                        <input type={"file"}  placeholder={"Choose file"}/>
                    </Form.Item>

                        <Form.Item   valuePropName="fileList" getValueFromEvent={normFile} rules={[{required:true}]}>
                            <Upload style={{height:"40px"}} action="/upload.do" listType="picture-card">
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                        height:"40px"

                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: "20px",
                                        }}
                                    >
                                        Upload Image
                                    </div>
                                </button>
                            </Upload>
                        </Form.Item>
                    <Form.Item   rules={[{required:true}]}>

                        <Input

                            type={"text"} placeholder={"E'lon nomi"}/>

                    </Form.Item >

                    <Form.Item  rules={[{required:true}]} >
                        <TextArea placeholder={"E'lon haqida"} rows={4} />
                    </Form.Item>
                    <Form.Item  valuePropName="checked"  rules={[{required:true}]}>
                        <Switch />

                        <button
                            style={{backgroundColor:"#FEC200",padding:"0 10px",
                                color:"white",fontWeight:"400",borderRadius:"5px",
                            border:"1px solid transparent"}}
                                htmlType={"submit"}  className={"  float-end"}>Saqlash</button>
                    </Form.Item>


                </Form>

            </Drawer>
        </>
    );
};
export default App;