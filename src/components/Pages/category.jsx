import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Table, Divider, Button, Popconfirm, message, Input, Form} from "antd";
import Drawer from "./drawerCategory"

function Category(props) {
    const [search, setSearch] = useState('')

    const {category} =useSelector(state => state.CategoryReducer)
    const [open, setOpen] = useState(false);

    const dispatch =useDispatch()
    function editItem(item) {
        dispatch({type:"EDIT_DATA", payload: item})
        setOpen(prevState => !prevState)

    }


    const confirm = (e) => {
        console.log(e);
        message.success('Deleted');
        dispatch({type:"DELETE_CATEGORY",payload:e.id})
    };
    const cancel = (e) => {
        console.log(e);
        message.error('No Deleted');
    };



    return (
        <div style={{width: "95%"}} className={'container  position-relative my-4'}>
            <Input.Search style={{width: "300px"}} placeholder={"Search..."}
                          onSearch={(value) => {
                              setSearch(value)
                          }}
                          onChange={(e) => {
                              setSearch(e.target.value)
                          }}

            />


            <Drawer isModalOpen={open} setIsModalOpen={setOpen}/>


            <Button type={"primary"} onClick={() => setOpen(prevState => !prevState)}
                    className={"float-end "}>Add
            </Button>


            <Divider/>


            <h2 style={{fontWeight: "400"}}>Category List</h2>

            <Table columns={[
                {
                    title: 'ID',
                    dataIndex: 'idx',
                    filteredValue: [search],
                    onFilter: (value, record) => {
                        return (
                            String(record.name)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                            String(record.idx)
                                .toLowerCase()
                                .includes(value.toLowerCase())
                        );
                    }
                },
                {
                    title: 'Name',

                    dataIndex: 'name',
                },

                {
                    title: 'Actions ',
                    render: (item) => <div>
                        <i className={"bi bi-pencil  mx-2 text-primary "} onClick={() => editItem(item)}></i>


                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => confirm(item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <i className={"bi bi-trash3  mx-2 text-danger "}></i>

                        </Popconfirm>


                    </div>
                },


            ]}
                   dataSource={category}
            >


            </Table>
        </div>
    );
}

export default Category;