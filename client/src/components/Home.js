import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'




const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {

        const res = await fetch("http://localhost:8003/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");
            
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Register Appointment</NavLink>
                    </div>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <div class="card"  style={{marginBottom: "10px"}}>
                                            <div class="card-header d-flex justify-content-between">
                                                <div class="d-flex justify-content-between">
                                                    <p><strong>{id+1 }. Patient Name: </strong></p>
                                                    <p>&nbsp; {element.name}</p>
                                                </div>
                                                <div class="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    &nbsp;
                                                    {/* <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    &nbsp; */}
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteOutlineIcon /></button>
                                                </div>
                                                
                                            </div>
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between">
                                                    <p><strong>Patient Email: </strong>{element.email}</p>
                                                    <p><strong>Preferred Doctor Name: </strong>{element.work}</p>
                                                    <p><strong>Patient Mobile: </strong>{element.mobile}</p>
                                                </div>

                                                <div class="d-flex justify-content-between">
                                                <strong>
                                                        <p style={{background: "#FFFFAD"}}>Submit Time: {element.submitClickTime}ms</p>
                                                    </strong>
                                                    <strong>
                                                        <p style={{background: "#FFFFAD"}}>Reach Time: {element.serverReachingTime}ms</p>
                                                    </strong>
                                                    <strong>
                                                        <p style={{background: "#FFFFAD"}}>Delay: {element.serverReachingTime - element.submitClickTime}ms</p>
                                                    </strong>
                                                </div>

                                                {/* <div class="d-flex justify-content-between">
                                                    <p>Submit Click Time: {element.submitClickTime}</p>
                                                    <p>Server Reach Time: {element.serverReachingTime}</p>
                                                    
                                                </div> */}
                                                
                                                
                                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                                
                                            </div>
                                        </div>
                                    )
                                })
                            }
                </div>
            </div>
        </>
    )
}

export default Home

















