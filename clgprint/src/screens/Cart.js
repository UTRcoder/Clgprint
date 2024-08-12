import React from 'react'
import { useCart, useDispatchCart } from '../Components/ContextReducer'
import trash from "../trash.svg"

export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    let userEmail = localStorage.getItem("userEmail");
    if (data.length === 0) {
        return (
            <div>
                <div className='text-center'>Hello user {userEmail}</div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let response = await fetch("https://go-food-dgq7.onrender.com/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("JSON RESPONSE:::::", response)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }


    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            <div className='container m-auto mt-5 text-white table-responsive table-responsive-sm table-responsive-md'>
                <table class="table table-hover">
                    <thead className='text-white fs-4'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th className='text-white' scope='row'>{index + 1}</th>
                                <td className='text-white'>{food.name}</td>
                                <td className='text-white'>{food.qty}</td>
                                <td className='text-white'>{food.size}</td>
                                <td className='text-white'>{food.price}</td>
                                <td className='text-white'><button type="button" className="btn p-0 bg-white"><img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success text-white mt-5'onClick={handleCheckOut}> Check Out </button>
                </div>
            </div>
        </div>
    )
}
