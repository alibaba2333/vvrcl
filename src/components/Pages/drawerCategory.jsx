import React from 'react';
import {Button, Modal, Form, Input} from 'antd';
import {useDispatch, useSelector} from "react-redux";





const App = ({isModalOpen,setIsModalOpen}) => {
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const {editData} = useSelector(state => state.CategoryReducer)


    const dispatch = useDispatch()

    const [form] = Form.useForm()


    function onFinish(value) {
        if (editData.id){
            dispatch({type:"EDIT_SAVE",payload:value})

        }

        else {
            dispatch({type:"ADD_CATEGORY", payload:value})


        }


        form.resetFields()

    }
    return (
        <>
            <Modal className={"position-relative"} title="Add Category"   open={isModalOpen}  onCancel={handleCancel}>

                <Form  form={form} onFinish={onFinish} layout={"vertical"}>

                    <Form.Item initialValue={editData.idx} name={"idx"} label={"ID"} rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item initialValue={editData.name} name={"name"} label={"Category name:"} rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item className={"   position-absolute "} style={{right:"25px",bottom:"-5px",zIndex:"1"}}  >
                        <Button htmlType={"submit"} type={"primary"} onClick={handleOk} >Ok</Button>
                    </Form.Item>
                </Form>
            </Modal>



        </>
    );
};
export default App;