import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
export default function Home() {
    const [search, setSearch]=useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        // console.log(response[0],response[1]);
        setfoodCat(response[1])
        setfoodItem(response[0]);

    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="true" style={{ objectFit: "contain !important" }}>
            <div className="carousel-inner" id="carousel">
                <div className="carousel-caption" style={{ zIndex: "10" }}>
                    <div className="d-flex justify-content-center">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                    </div>
                </div>
                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/900x450/?burger" className="d-block w-100" style={{ filter: "brightness(45%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x450/?pastry" className="d-block w-100" style={{ filter: "brightness(45%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x450/?barbeque" className="d-block w-100" style={{ filter: "brightness(45%)" }} alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
            <div className='container'>
                {
                    foodCat != []
                        // !== nahi use ho rha isliye error aa skta h iski wajah se
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr></hr>
                                {foodItem!=[]
                                ?foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                                .map(filterItems=>{
                                    return(
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card foodItems={filterItems}
                                             options={filterItems.options[0]}
                                            ></Card>
                                        </div>
                                    )
                                })
                                :<div>"No such data found"</div>}
                                </div>
                            )
                        }) : <div>Sorry, Not Availabe Now</div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
