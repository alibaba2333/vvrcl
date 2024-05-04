import React, { useState, useEffect } from "react";
import { Button, Drawer, Input, Space } from "antd";
import { message } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Logo from "../assets/IBS logo white ÐºÐ¾Ð¿Ð¸Ñ_.7a193cd0948119428115.png";
import "./kurslar.css";

const Contact = () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [info, setInfo] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [cards, setCards] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedCards = localStorage.getItem('cards');
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, []);

    const saveCardsToLocalStorage = (newCards) => {
        localStorage.setItem('cards', JSON.stringify(newCards));
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        setEditIndex(null);
        // Reset input fields
        setName('');
        setAge('');
        setInfo('');
        setPrice('');
        setCategory('');
    };

    const addToCard = () => {
        if (!name || !age || !info || !price || !category) {
            message.error("All fields are required!");
            return;
        }

        const newCard = { name, age, info, price, category };

        if (editIndex !== null) {
            const newCards = [...cards];
            newCards[editIndex] = newCard;
            setCards(newCards);
            saveCardsToLocalStorage(newCards);
        } else {
            const newCards = [...cards, newCard];
            setCards(newCards);
            saveCardsToLocalStorage(newCards);
        }

        onClose();
    };

    const editCard = (index) => {
        const cardToEdit = cards[index];
        setName(cardToEdit.name);
        setAge(cardToEdit.age);
        setInfo(cardToEdit.info);
        setPrice(cardToEdit.price);
        setCategory(cardToEdit.category);
        setEditIndex(index);
        setVisible(true);
    };

    const deleteCard = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
        saveCardsToLocalStorage(newCards);
        if (newCards.length === 0) {
            message.info("No data available");
        }
    };

    return (
        <div className="py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mx-4">Kurslar</h3>
                <Button className="float-end mx-5 bg-warning" type="primary" onClick={showDrawer}>
                    Add
                </Button>
            </div>
            <div className="px-4">
            <div className="line w-100 border "></div>

            </div>

            <Drawer
                title={editIndex !== null ? "Edit Card" : "Add Card"}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Input className="form-control my-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input className="form-control my-2" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <Input className="form-control my-2" placeholder="Additional Info" value={info} onChange={(e) => setInfo(e.target.value)} />
                <Input className="form-control my-2" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <Input className="form-control my-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <Button type="primary" className="bg-warning" onClick={addToCard}>
                    {editIndex !== null ? "Edit Card" : "Add to Card"}
                </Button>
            </Drawer>

            <div className="card-container px-4 py-3 d-flex flex-wrap gap-4">
                {cards.length === 0 ? (
                    <div className="d-flex my-5 justify-content-center">
                        <div>
                            <p className="text-center">

                        No data available
                            </p>

                        </div>
                        </div>
                ) : (
                    cards.map((card, index) => (
                        <div className="card border border-none py-1" style={{ width: '290px' }} key={index}>
                            <div className="text bg-white px-4 d-flex align-items-md-center justify-content-between card-header">
                                <b className="cst fs-5">{card.name}</b>
                            </div>

                            <div className="info border border-none py-3 flex-wrap px-4" >
                                <img className="sls1 w-25" src={Logo} alt="" />
                                <div className="d-flex justify-content-between">
                                    <h4 className="text-dark my-2">{card.price}</h4>
                                    <h4 className="text-dark">{card.category}</h4>
                                </div>
                                <p style={{ fontFamily: 'sans-serif', fontSize: '16px' }} className="py-2">{card.info}</p>
                            </div>

                            <Space className="display-flex my-3 justify-content-center gap-5">
                                <Button className="d-flex justify-content-between align-items-center" onClick={() => editCard(index)}><EditOutlined /></Button>
                                <Button className="d-flex justify-content-between align-items-center" onClick={() => deleteCard(index)}><DeleteOutlined /></Button>
                            </Space>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Contact;
