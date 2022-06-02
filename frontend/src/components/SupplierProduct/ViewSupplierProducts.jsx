import React, { useState, useEffect, useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import Loader from './../../components/Loader/Loader'
import Message from './../../components/Message/Message'
import { LinkContainer } from 'react-router-bootstrap'
import {
    Button,
    Row,
    Table,
    Image,
    Overlay,
    Popover
} from 'react-bootstrap'
import { listMyProducts } from './../../actions/supplierProduct'


const ViewSupplierProducts = ({history}) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const supplierProdictListMy = useSelector(state => state.supplierProdictListMy)
    const { loading: loadingProducts, error: errorProducts, products } = supplierProdictListMy
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails
    const dispatch = useDispatch()
    const ref = useRef(null);

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(listMyProducts())
            }
        }
    }, [userInfo, history, user, dispatch])

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);

    };

    return (
        <Row>
            <h2 style={{ marginTop: '110px' }}>My Products</h2>
            {loadingProducts ? <Loader />
                : errorProducts ? <Message variant="danger">{errorProducts}</Message>
                    : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL/NIC</th>
                                <th>ADDRESS</th>
                                <th>IMAGE</th>
                                <th>CROP</th>
                                <th>REVIEWED</th>
                                <th>EDIT</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.email}</td>
                                    <td>{product.address}</td>
                                    <td>
                                        <Image width={70} rounded src={product.image} />
                                    </td>
                                    <td>{product.cropSelection}</td>
                                    <td style={{ textAlign: "center" }}>
                                        {
                                            product.isReviwed ? (
                                                <Button
                                                    className="mt-2"
                                                    ref={target}
                                                    onClick={handleClick}
                                                > Check
                                                </Button>
                                            ) : <i className="fas fa-times" style={{ color: 'red', fontSize: '24px' }}></i>
                                        }
                                        <Overlay
                                            show={show}
                                            target={target}
                                            placement="bottom"
                                            container={ref.current}
                                            containerPadding={10}
                                        >
                                            <Popover id="popover-contained">
                                                <Popover.Title as="h3">Rating: {product.rating}</Popover.Title>
                                                {
                                                    product.reviews.map(review => (
                                                        <Popover.Content key={review._id}>
                                                            <strong>Feedback: {review.comment}</strong>
                                                        </Popover.Content>
                                                    ))
                                                }
                                            </Popover>
                                        </Overlay>
                                    </td>
                                    <td>
                                        <LinkContainer to={`/supplierproducts/${product._id}/edit`}>
                                            <Button variant="light" className="btn btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )
            }
        </Row>
    )

}

export default ViewSupplierProducts