import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating/Rating';
import {
    Col,
    Container,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    Form
} from 'react-bootstrap';
import './consumerStyles.css';

import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { listConsumerProductsDetails, createConsumerReview } from '../../actions/consumerProductAction.js'
import Meta from '../../components/Helmet/Meta';
import {CONSUMER_CREATE_REVIEW_RESET} from "../../constants/productConstants";

const ConsumerProductDetailScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const consumerProductDetails = useSelector(state => state.consumerProductDetails)
    const { loading, error, consumerProduct } = consumerProductDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const consumerReviewCreate = useSelector((state) => state.consumerReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = consumerReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!consumerProduct._id || consumerProduct._id !== match.params.id) {
            dispatch(listConsumerProductsDetails(match.params.id))
            dispatch({ type: CONSUMER_CREATE_REVIEW_RESET })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, match, successProductReview])

    const addtoCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createConsumerReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <div className="productScreen">
            <Meta
                title="FarmConnect | Consumer Product"
            />
            <Container>
                <Link className="btn btn-go-back btn-dark" to="/consumer">GO BACK</Link>
                {
                    loading ?
                        <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Row className="p-3 seed-product" >
                                    <Col md={6}>
                                        <Image className="mx-auto image-seed"
                                            src={consumerProduct.image}
                                            alt={consumerProduct.prod_name}
                                            width={300}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <ListGroup className="borderless" variant='flush'>
                                            <ListGroup.Item>
                                                <h2>{consumerProduct.prod_name}</h2>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h4>Seller: {consumerProduct.seller_name}</h4>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h4>Price: {consumerProduct.price}</h4>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <p>Avalaible Location: {consumerProduct.avalaible_location}</p>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col md={3}>
                                        <Card>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price:</Col>
                                                        <Col><strong>₦{consumerProduct.price}</strong></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Status:</Col>
                                                        <Col>
                                                            {consumerProduct.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                {
                                                    consumerProduct.quantity > 0 && (
                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>Qty</Col>
                                                                <Col>
                                                                    <Form.Control as='select' value={qty} onChange={(e => setQty(e.target.value))}>
                                                                        {
                                                                            [...Array(consumerProduct.quantity).keys()]
                                                                                .map(x =>
                                                                                    <option
                                                                                        key={x + 1}
                                                                                        value={x + 1}
                                                                                    >{x + 1}</option>)
                                                                        }
                                                                    </Form.Control>
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    )
                                                }
                                                <ListGroup.Item>
                                                    <Button type="button" className="btn btn-block" onClick={addtoCartHandler}>Add To Cart</Button>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                </Row>
                            )
                }
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {consumerProduct.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {consumerProduct.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={6}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {successProductReview && (
                                    <Message variant='success'>
                                        Review submitted successfully
                                    </Message>
                                )}
                                {loadingProductReview && <Loader />}
                                {errorProductReview && (
                                    <Message variant='danger'>{errorProductReview}</Message>
                                )}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            variant='primary'
                                        >Submit</Button>
                                    </Form>
                                ) : (
                                    <p>
                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                    </p>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default ConsumerProductDetailScreen
