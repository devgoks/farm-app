import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Row,
    Button,
    Form,
    Col,
    Alert
} from 'react-bootstrap';
import ConsumerProducts from './../../components/ConsumerProducts/ConsumerProducts'
import { listConsumerProducts } from './../../actions/consumerProductAction.js'
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import './ConsumerStyles.css'
import Meta from '../../components/Helmet/Meta';
import axios from 'axios'
import {CONSUMER_PRODUCT_LIST_SUCCESS} from './../../constants/productConstants'

const ConsumerScreen = () => {

    const dispatch = useDispatch();

    const [prod_name, setProductName] = useState('')
    const [avalaible_location, setLocation] = useState('')

    const consumerProductList = useSelector(state => state.consumerProductList)
    let { loading, consumerProducts, error } = consumerProductList

    const [numberOfItems, setNumberOfItems] = useState(3);

    useEffect(() => {
        dispatch(listConsumerProducts())
    }, [dispatch])

    const showMore = () => {
        if (numberOfItems + 3 <= consumerProducts.length) {
            setNumberOfItems(numberOfItems + 3)
        } else {
            setNumberOfItems(consumerProducts.length)
        }
    }

    const resetProduct = async () => {
        dispatch(listConsumerProducts())
        setProductName('')
        setLocation('')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post(
            '/api/consumer/filter',
            {
                prod_name, avalaible_location
            },
            config
        )

        //consumerProducts = data

       // dispatch(listConsumerProducts())

        dispatch({
            type: CONSUMER_PRODUCT_LIST_SUCCESS,
            payload: data
        })

        setProductName('')
        setLocation('')
    }

    return (
        <div className="consumerProductScreen">
            <Meta
                title="FarmConnect | Consumer"
            />
            <Container className='consumerContainer'>
                <h1 className="title">CONSUMER</h1>
                <h4 className="consumer-title">
                   Order your products and get them delivered at your doorstep.</h4>
                <br />
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={5}>
                            <Form.Group controlId='prod_name'>
                                <Form.Label>Product Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="prod_name"
                                    placeholder="Enter Product name"
                                    value={prod_name}
                                    required
                                    onChange={(e) => setProductName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group controlId='avalaible_location'>
                                <Form.Label>Location<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="avalaible_location"
                                    placeholder="Enter Location"
                                    value={avalaible_location}
                                    required
                                    onChange={(e) => setLocation(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button type="submit" variant="primary">Search</Button>
                        </Col>
                        <Col md={1}>
                            <Button onClick={resetProduct} variant="warning">Reset</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : (
                                <Row>
                                    {
                                        consumerProducts
                                            .slice(0, numberOfItems)
                                            .map(consumer => (
                                                <ConsumerProducts
                                                    key={consumer._id}
                                                    _id={consumer._id}
                                                    prod_name={consumer.prod_name}
                                                    seller_name={consumer.seller_name}
                                                    image={consumer.image}
                                                    price={consumer.price}
                                                    prod_size={consumer.prod_size}
                                                    avalaible_location={consumer.avalaible_location}
                                                    quantity={consumer.quantity}
                                                    reviews={consumer.numReviews}
                                                    rating={consumer.rating}
                                                />
                                            ))
                                    }
                                    {
                                        numberOfItems >= consumerProducts.length
                                            ? <Alert style={{ backgroundColor: 'red' }} className="col-md-12 text-center">Finished</Alert>
                                            : ''
                                    }
                                    <Button className="col-md-12 text-center" variant="success outline-dark" onClick={showMore}>Show more</Button>
                                </Row>
                            )
                }
            </Container>
        </div>
    )
}

export default ConsumerScreen
