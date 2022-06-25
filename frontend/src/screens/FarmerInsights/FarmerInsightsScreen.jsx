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
import Loader from './../../components/Loader/Loader';
import './FarmerInsightsStyles.css'
import Meta from '../../components/Helmet/Meta';
import { Line } from 'react-chartjs-2';
import {CONSUMER_PRODUCT_LIST_SUCCESS} from "../../constants/productConstants";


const FarmerInsightsScreen = () => {

    const [load, setLoad] = useState(false)

    useEffect(() => {
        setTimeout(function () {
            setLoad(true);
        }, 4000);
    }, []);

    const data = {
        labels: ['January','February','March','April', 'May','June'],
        datasets: [
            {
                label: 'Goat Meat Demand For This Last 6 Months In This Area',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [2300, 4000, 6000,6500,7200,8300]
            }
        ]
    }

    return (
        <div className="farmerInsightsScreen">
            <Meta
                title="FarmConnect | Farmer Insights"
            />
            <Container className='farmerInsightsContainer'>
                <h1 className="title">Farmer Insights</h1>
                {load===true ?
                    <div>
                        <h4>
                            The system advises you to start goat business since there are fewer goat farmers/sellers of goat meat around this area
                            based on our data, Also there have been higher search for goat meat from customers in this area. See chart showing the amount of demand for goat meat below.
                        </h4>

                        <Line data={data} />
                    </div>
                    :
                    <div>
                        <h4 className="farmerInsights-title">
                            Loading best farm business to start based on your Location, demand and supply.</h4>
                        <br />
                        <Loader />
                    </div>
                }
            </Container>
        </div>
    )
}

export default FarmerInsightsScreen
