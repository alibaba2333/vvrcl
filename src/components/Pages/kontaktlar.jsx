import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Table, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";

const Contact = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [editingContactId, setEditingContactId] = useState(null);
    const [newContact, setNewContact] = useState({
        email: "",
        phone: "",
        address: "",
        socialnetwork: [],
    });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("contactData");
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            setStaticData(); // Set static data if there's no stored data
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("contactData", JSON.stringify(data));
    }, [data]);

    const setStaticData = () => {
        const staticData = [
            {
                id: "1",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                address: "123 Main St",
                socialnetwork: [
                    { name: "Twitter", url: "https://twitter.com/johndoe" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/johndoe" },
                ],
            },
            {
                id: "2",
                email: "jane.smith@example.com",
                phone: "987-654-3210",
                address: "456 Oak St",
                socialnetwork: [
                    { name: "Twitter", url: "https://twitter.com/janesmith" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/janesmith" },
                ],
            },
        ];

        setData(staticData);
    };

    const handleModalOk = () => {
        if (!newContact.email || !newContact.phone || !newContact.address) {
            error("Please enter email, phone, and address.");
            return;
        }

        if (modalTitle === "Add Contact") {
            addContact();
        } else if (modalTitle === "Edit Contact") {
            editContact();
        }

        setNewContact({
            email: "",
            phone: "",
            address: "",
            socialnetwork: [],
        });

        handleModalCancel();
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingContactId(null);
        // Reset newContact state when the modal is closed
        setNewContact({
            email: "",
            phone: "",
            address: "",
            socialnetwork: [],
        });
    };

    const addContact = () => {
        // Add logic for adding a new contact
        // ...

        // For demonstration, let's add a default contact to the state
        const defaultContact = {
            id: (data.length + 1).toString(),
            email: newContact.email,
            phone: newContact.phone,
            address: newContact.address,
            socialnetwork: newContact.socialnetwork,
        };

        setData([...data, defaultContact]);
    };

    const editContact = () => {
        if (!editingContactId) {
            console.error("No contact ID provided for editing");
            return;
        }

        // Add logic for editing an existing contact
        // ...

        // For demonstration, let's update the state with the edited contact
        const updatedData = data.map((contact) =>
            contact.id === editingContactId
                ? {
                    ...contact,
                    email: newContact.email,
                    phone: newContact.phone,
                    address: newContact.address,
                    socialnetwork: newContact.socialnetwork,
                }
                : contact
        );

        setData(updatedData);
    };
    const deleteContact = (contactId) => {
        // Add logic for deleting a contact
        // ...

        // For demonstration, let's update the state by removing the deleted contact
        const updatedData = data.filter((contact) => contact.id !== contactId);
        setData(updatedData);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Social Network",
            dataIndex: "socialnetwork",
            key: "socialnetwork",
            render: (socialnetwork) => (
                <div style={{ maxHeight: "100px", overflow: "auto" }}>
                    {socialnetwork &&
                    socialnetwork.map(({ name, url }, index) => (
                        <p key={index}>
                            <strong>{name}:</strong>{" "}
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                {url}
                            </a>
                        </p>
                    ))}
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <>
                    <EditOutlined
                        onClick={() => showEditModal(record.id)}
                        style={{ color: "blue", fontSize: "22px", cursor: "pointer" }}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this contact?"
                        onConfirm={() => deleteContact(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{
                                color: "red",
                                fontSize: "22px",
                                marginLeft: "8px",
                                cursor: "pointer",
                            }}
                        />
                    </Popconfirm>
                </>
            ),
        },
    ];

    const error = (errorMsg) => {
        message.error(errorMsg);
    };

    const showAddModal = () => {
        setModalTitle("Add Contact");
        setIsModalVisible(true);
        // Reset newContact state when opening the modal for adding a new contact
        setNewContact({
            email: "",
            phone: "",
            address: "",
            socialnetwork: [],
        });
    };

    const showEditModal = (contactId) => {
        setModalTitle("Edit Contact");
        setIsModalVisible(true);
        setEditingContactId(contactId);

        const selectedContact = data.find((contact) => contact.id === contactId);
        if (selectedContact) {
            setNewContact({
                email: selectedContact.email,
                phone: selectedContact.phone,
                address: selectedContact.address,
                socialnetwork: selectedContact.socialnetwork,
            });
        }
    };

    const handleSearch = () => {
        console.log("Search Query: ", searchQuery);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const filteredData = data.filter((contact) =>
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="px-3">
            <div className="d-flex my-5  justify-content-between align-items-center mb-3">
                <div>
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                </div>
                <div>
                    <Button type="primary" onClick={showAddModal}>
                        Add Contact
                    </Button>
                </div>
            </div>

            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <div>
                    <label htmlFor="contactEmail">Email:</label>
                    <Input
                        id="contactEmail"
                        value={newContact.email}
                        onChange={(e) =>
                            setNewContact({ ...newContact, email: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="contactPhone">Phone:</label>
                    <Input
                        id="contactPhone"
                        value={newContact.phone}
                        onChange={(e) =>
                            setNewContact({ ...newContact, phone: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="contactAddress">Address:</label>
                    <Input
                        id="contactAddress"
                        value={newContact.address}
                        onChange={(e) =>
                            setNewContact({ ...newContact, address: e.target.value })
                        }
                    />
                </div>
                {/* Add social network inputs as needed */}
                <div>
                    <label htmlFor="contactSocialNetwork">Social Network:</label>
                    <Input
                        id="contactSocialNetwork"
                        value={newContact.socialnetwork}
                        onChange={(e) =>
                            setNewContact({ ...newContact, socialnetwork: e.target.value })
                        }
                    />
                </div>
            </Modal>

            <div>
                <h2>Contact List</h2>
                <Table dataSource={filteredData} columns={columns} />
                {filteredData.length === 0 && <p>No data found</p>}
            </div>
        </div>
    );


};

export default Contact;
