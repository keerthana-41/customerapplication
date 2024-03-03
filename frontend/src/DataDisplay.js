import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const DataDisplay = () => {
    // Your existing component code...
    
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('created_at'); 
    const [sortByTime, setSortByTime] = useState('created_time'); 

    
    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm,sortBy,sortByTime]); // Fetch data when currentPage, searchTerm, or sortBy changes
    
    const handleSearch = async () => {
        try {
            const baseURL = 'http://localhost:5000';
            const endpoint = '/api/search';
            const url = `${baseURL}${endpoint}?q=${searchTerm}}`;

            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error searching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            console.log("inside fetch");
            const baseURL = 'http://localhost:5000';
            const endpoint = searchTerm ? '/api/search' : '/api/customer';
            const url = `${baseURL}${endpoint}?page=${currentPage}&limit=${itemsPerPage}&q=${searchTerm}`;

            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sortData = async () => {
        try {
            console.log("inside fetch");
            const baseURL = 'http://localhost:5000';
            const endpoint = searchTerm ? '/api/search' : '/api/data';
            const url = `${baseURL}${endpoint}?page=${currentPage}&limit=${itemsPerPage}&q=${searchTerm}&sortBy=${sortBy}`;

            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sortTime = async () => {
        try {
            console.log("inside fetch time");
            const baseURL = 'http://localhost:5000';
            const endpoint = searchTerm ? '/api/search' : '/api/time';
            const url = `${baseURL}${endpoint}?page=${currentPage}&limit=${itemsPerPage}&q=${searchTerm}&sortByTime=${sortByTime}`;

            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


   

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };


    return (
        <div className="container">
            <h1>Customer Details</h1>
            <div className="search-bar">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="buttons">
                <button onClick={sortData}>Sort by Date</button>
                <button onClick={sortTime}>Sort by Time</button>
            </div>
            <div className="buttons">
                
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Customer Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Created Date</th>
                        <th>Created Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.sno}>
                            <td>{item.sno}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.age}</td>
                            <td>{item.phone}</td>
                            <td>{item.location}</td>
                            {/* <td>{new Date(item.created_at).toLocaleDateString()}</td> */}
                            {/* <td>{new Date(item.created_at).toLocaleTimeString()}</td> */}
                            <td>{item.created_at}</td>
                            <td>{item.created_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default DataDisplay;