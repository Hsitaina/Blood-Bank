import React,{useState,useEffect} from 'react'
import Header from '../../components/shared/Layout/Header';
import API from './../../services/API';
import moment from 'moment';

const Analytics = () => {
    const [data,setData] = useState([]);
    const [inventoryData,setInventoryData] = useState([]);
    const colors = ['#2a9d8f','#e76f51','#e63946','#00b4d8','#ffb4a2','#0096c7','#f07167','#ff006e'];
    // Get Blood Group data
    const getBloodGroupData = async() => {
        try {
            const {data} = await API.get('/analytics/bloodGroup-details');
            if(data?.success){
                setData(data?.bloodGroupData)
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getBloodGroupData()
    },[]);
    const getRecentRecords = async() => {
        try {
          const {data} = await API.get('/inventory/get-recent-inventory');
          if(data?.success){
            setInventoryData(data?.inventory);
            console.log(data);
          }
          
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(()=>{
        getRecentRecords();
      }
      ,[])
  return (
    <>
      <Header/>
        <div className="d-flex flex-row flex-wrap">
            {data?.map((record,i)=>(
                <div className="card m-2 p-1" style={{width: "18rem",backgroundColor:`${colors[i]}`}}>
                <div className="card-body">
                  <h1 className="card-title bg-light text-dark text-center">{record.bloodGroup}</h1>
                  <p className="card-text">Total In : {record.totalIn}</p>
                  <p className="card-text">Total Out : {record.totalOut}</p>
                </div>
                <div className="card-footer text-light bg-dark text-center">Total available : {record.availableBlood}</div>
              </div>
            ))}
        </div>
        <div className="container my-3">
            <h1 className='my-3 text-center'>Recent Blood Transactions</h1>
        <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donor Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    </>
  )
}

export default Analytics
