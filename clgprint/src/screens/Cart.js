import React from 'react'
import { useCart, useDispatchCart } from '../Components/ContextReducer'
import trash from "../trash.svg";

export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    let userName = localStorage.getItem("userName")
    let userEmail = localStorage.getItem("userEmail");
    if (data.length === 0) {
        return (
            <div>
                <div className='text-center text-white'>Hello!! {userName}</div>
                <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    var link = "upi://pay?pa=utkarshrai146@oksbi%26am=" + totalPrice + "%26cu=INR%26aid=uGICAgICXtpSdRw";
    var upi = "https://qrcode.tec-it.com/API/QRCode?data=" + link;
    let odi = randomNumberInRange(10090009, 20000909);
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
            alert("Verifying your Payment, Check your mail for Confirmation\nYour Order_ID is:" + odi)
            dispatch({ type: "DROP" })
        }
    }

    return (
        <div>
            <div className='container m-auto mt-5 text-white table-responsive table-responsive-sm table-responsive-md'>
                <table class="table table-hover">
                    <thead className='text-success fs-4'>
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
                                <td className='text-white' ><button type="button" className="btn p-0 bg-white"><img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div style={{ textAlign: "center" }}>
                    <div>
                        <h1>Scan here to Pay the Amount: </h1>
                        <img className={upi} src={upi} style={{height:"80px"}}/>
                        <form style={{ display: " flex", justifyContent: "center", alignItems: " center", paddingTop: "20px" }}>
                            <label htmlFor="exampleInputtext" className="form-label">Enter UTR/Ref_no here:</label>
                            <input type="text" className="form-control" name='utr' style={{ width: "50px" }} />
                        </form>
                    </div>
                    <div>
                        <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
