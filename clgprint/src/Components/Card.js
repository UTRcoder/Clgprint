import React, { useRef, useState, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOption = Object.keys(options);
    const priceRef = useRef();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")
    let finalPrice = qty * parseInt(options[size]);


    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
    }

    // setBtnEnable(true)
    useEffect(() => {
        setSize(priceRef.current.value)

    }, [])





    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }}></img>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItems.name}</h5>
                    <div className='container w-100 d-flex'>
                        <select className='m-2 h-100 bg-white text-dark rounded' onChange={(e) => setQty(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-white text-dark rounded-3' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOption.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline fs-5 h-100'>
                            Rs{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className={`btn btn-success text-white justify-center ms-2`} onClick={handleAddToCart}>AddToCart</button>
                </div>
            </div>
        </div>
    )
}
