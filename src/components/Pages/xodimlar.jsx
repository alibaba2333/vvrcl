import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Table,Divider,Button,Popconfirm,message} from "antd";
import Drawer from "./drawer"

function Xodimlar(props) {
    const {xodimlar} =useSelector(state => state.XodimlarReducer)
    const [open, setOpen] = useState(false);

    const dispatch =useDispatch()
    function editItem(item) {
        dispatch({type:"EDIT_DATA", payload: item})
        setOpen(prevState => !prevState)

    }

    const columns = [
        {
            title: 'Full Name',


            dataIndex: 'fullname',
        },
        {
            title: 'Email',
            icon: <i className={"bi bi-envelope-fill"}></i>,

            dataIndex: 'email',
        },
        {
            title: 'Password',
            icon: <i className={"bi bi-key-fill"}></i>,

            dataIndex: 'password',
        },
        {
            title: 'Delete',
            render: (item)=> <div>


                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <i className={"bi bi-trash-fill  mx-2 text-danger "}></i>

                </Popconfirm>
                <i className={"bi bi-pencil-fill  mx-2 text-primary "} onClick={() => editItem(item)}
                ></i>
            </div>
        }


    ];
    const confirm = (e) => {
        console.log(e);
        message.success('Deleted');
        dispatch({type:"DELETE_USER",payload:e.id})
    };
    const cancel = (e) => {
        console.log(e);
        message.error('No Deleted');
    };

    return (
        <div style={{width:"95%"}} className={'container position-relative my-4'}>
            <h2 style={{fontSize: "30px", fontWeight: "400",position:"absolute"}}>Hodimlar ro'yxati</h2>


            <Drawer  open={open} setOpen={setOpen}/>


            <button  style={{
                backgroundColor: "#FEC200", width: "150px", fontWeight: "600", fontSize: "20px", borderRadius: "5px",
                border: "1px solid transparent", marginBottom: "20px"
            }} onClick={() => setOpen(prevState => !prevState)}
                    className={"float-end "}>+ Qo'shish
            </button>


            <Divider/>

            <Table

                columns={columns}
                dataSource={xodimlar}
            >

            </Table>
        </div>
    );
}

export default Xodimlar;