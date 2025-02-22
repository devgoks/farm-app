import React from 'react'
import {
    Container,
} from 'react-bootstrap';
import Meta from '../../components/Helmet/Meta';
import AddSupplierProduct from '../../components/SupplierProduct/AddSupplierProduct';
import ViewSupplierProducts from  '../../components/SupplierProduct/ViewSupplierProducts';
import './supplierStyles.css'

const SupplierScreen = () => {
    return (
        <Container className='supplierContainer'>
            <Meta
                title="FarmConnect | Supplier"
            />
            <h1 className='title'>SUPPLIER</h1>
            <h4 className="supplier-title">
                Sell your wide variety of products related to farming, through our platform. We have lots of customers connected from all parts of the country.</h4>
            <br />
            <AddSupplierProduct />
            <ViewSupplierProducts/>
        </Container>
    )
}

export default SupplierScreen