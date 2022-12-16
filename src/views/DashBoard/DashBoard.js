import React, { useEffect, useState } from 'react'
import {
    Card, CardTitle, CardText, CardBody, CardSubtitle, CardHeader, Row, Col, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Modal, ModalHeader, ModalBody,
    Button
} from 'reactstrap'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import Flatpickr from 'react-flatpickr'
import { Calendar, Circle, Monitor, UserCheck, Mail } from 'react-feather'
import { Chart as ChartJS, registerables } from 'chart.js'
import Chart from 'react-apexcharts'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import CardDetail from './CardDetail'
import { TbChartPie } from 'react-icons/tb'
import { FcLineChart, FcPieChart } from 'react-icons/fc'
import axios from '../../API/axios'


ChartJS.register(...registerables)

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
}
const options7 = {
    labels: ['Finished', 'Pending', 'Rejected'],
    plotOptions: {
        radialBar: {
            size: 150,
            hollow: {
                size: '20%'
            },
            track: {
                strokeWidth: '100%',
                margin: 15
            },
            dataLabels: {
                value: {
                    fontSize: '1rem',
                    colors: '#5e5873',
                    fontWeight: '500',
                    offsetY: 5
                },
                total: {
                    show: true,
                    label: 'Total',
                    fontSize: '1.286rem',
                    colors: '#5e5873',
                    fontWeight: '500',

                    formatter() {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 42459
                    }
                }
            }
        }
    },
    colors: ['#827aee', '#fba859', '#e9686a'],
    stroke: {
        lineCap: 'round'
    },
    chart: {
        height: 355,
        dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1
        }
    }
},
    series4 = [70, 52, 26]

const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: { top: -20 }
    },
    scales: {
        x: {
            grid: {
                color: 'transparent',
                borderColor: '#f2f2f2'
            },
            ticks: { color: '#6b657e' }
        },
        y: {
            min: 0,
            max: 400,
            grid: {
                color: 'transparent',
                borderColor: '#f2f2f2'
            },
            ticks: {
                stepSize: 100,
                color: '#6b657e'
            }
        }
    },
    plugins: {
        legend: {
            align: 'start',
            position: 'top',
            labels: {
                padding: 30,
                boxWidth: 9,
                color: '#6b657e',
                usePointStyle: true
            }
        }
    }
}

// ** Chart data
const data2 = {
    labels: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12',
        '20/12',
        ''
    ],
    datasets: [
        {
            fill: true,
            tension: 0,
            label: 'Africa',
            pointRadius: 0.5,
            pointHoverRadius: 5,
            pointStyle: 'circle',
            backgroundColor: '#2c9aff',
            pointHoverBorderWidth: 5,
            borderColor: 'transparent',
            pointHoverBorderColor: '#fff',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#2c9aff',
            data: [40, 55, 45, 75, 65, 55, 70, 60, 100, 98, 90, 120, 125, 140, 155]
        },
        {
            fill: true,
            tension: 0,
            label: 'Asia',
            pointRadius: 0.5,
            pointHoverRadius: 5,
            pointStyle: 'circle',
            pointHoverBorderWidth: 5,
            borderColor: 'transparent',
            pointHoverBorderColor: '#fff',
            pointBorderColor: 'transparent',
            backgroundColor: '#84d0ff',
            pointHoverBackgroundColor: '#84d0ff',
            data: [70, 85, 75, 150, 100, 140, 110, 105, 160, 150, 125, 190, 200, 240, 275]
        },
        {
            fill: true,
            tension: 0,
            label: 'Europe',
            pointRadius: 0.5,
            pointHoverRadius: 5,
            pointStyle: 'circle',
            pointHoverBorderWidth: 5,
            borderColor: 'transparent',
            pointHoverBorderColor: '#fff',
            pointBorderColor: 'transparent',
            backgroundColor: '#edf1f4',
            pointHoverBackgroundColor: '#edf1f4',
            data: [240, 195, 160, 215, 185, 215, 185, 200, 250, 210, 195, 250, 235, 300, 315]
        }
    ]
}
const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: { color: '#777289' },
            grid: {
                borderColor: '#f4f4f4',
                color: '#f4f4f4'
            }
        },
        y: {
            min: 0,
            max: 400,
            scaleLabel: { display: true },
            ticks: {
                stepSize: 100,
                color: '#777289'
            },
            grid: {
                borderColor: '#f4f4f4',
                color: '#f4f4f4'
            }
        }
    },
    plugins: {
        legend: {
            align: 'start',
            position: 'top',
            labels: {
                boxWidth: 10,
                marginBottom: 25,
                color: '#777289',
                usePointStyle: true
            }
        }
    }
}

// ** Chart Data
const data1 = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
        {
            data: [80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360, 375],
            fill: false,
            tension: 0.5,
            pointRadius: 1,
            label: 'Europe',
            pointHoverRadius: 5,
            pointStyle: 'circle',
            pointHoverBorderWidth: 5,
            borderColor: '#ff4961',
            pointBorderColor: 'transparent',
            backgroundColor: '#ff4961',
            pointHoverBackgroundColor: '#ff4961'
        },
        {
            data: [80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280],
            fill: false,
            tension: 0.5,
            label: 'Asia',
            pointRadius: 1,
            pointHoverRadius: 5,
            pointStyle: 'circle',
            pointHoverBorderWidth: 5,
            borderColor: '#666ee8',
            pointBorderColor: 'transparent',
            backgroundColor: '#666ee8',
            pointHoverBackgroundColor: '#666ee8'
        },
        {
            data: [80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180],
            fill: false,
            tension: 0.5,
            pointRadius: 1,
            label: 'Africa',
            pointHoverRadius: 5,
            pointStyle: 'circle',
            pointHoverBorderWidth: 5,
            borderColor: '#ffbd1f',
            backgroundColor: '#ffbd1f',
            pointBorderColor: '#ffbd1f',
            pointHoverBackgroundColor: '#ffbd1f'
        }
    ]
}

//** To add spacing between legends and chart
const plugins = [
    {
        beforeInit(chart) {
            chart.legend.afterFit = function () {
                this.height += 20
            }
        }
    }
]
const options4 = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
        x: {
            grid: {
                color: '#f2f2f2',
                borderColor: '#f2f2f2'
            },
            ticks: { color: '#777289' }
        },
        y: {
            min: 0,
            max: 400,
            grid: {
                color: '#f2f2f2',
                borderColor: '#f2f2f2'
            },
            ticks: {
                stepSize: 100,
                color: '#777289'
            }
        }
    },
    plugins: {
        legend: { display: false }
    }
}

// ** Chart data
const data4 = {
    labels: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12'
    ],
    datasets: [
        {
            maxBarThickness: 15,
            backgroundColor: '#28dac6',
            borderColor: 'transparent',
            borderRadius: { topRight: 15, topLeft: 15 },
            data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190]
        }
    ]
}
const options5 = {
    chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
        offsetX: -10
    },
    stroke: {
        curve: 'smooth',
        dashArray: [0, 12],
        width: [4, 3]
    },
    legend: {
        show: false
    },
    colors: ['#d0ccff', '#ebe9f1'],
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            inverseColors: false,
            gradientToColors: ['#887ff2', '#ebe9f1'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
        }
    },
    markers: {
        size: 0,
        hover: {
            size: 5
        }
    },
    xaxis: {
        labels: {
            style: {
                colors: '#b9b9c3',
                fontSize: '1rem'
            }
        },
        axisTicks: {
            show: false
        },
        categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
        axisBorder: {
            show: false
        },
        tickPlacement: 'on'
    },
    yaxis: {
        tickAmount: 5,
        labels: {
            style: {
                colors: '#b9b9c3',
                fontSize: '1rem'
            },
            formatter(val) {
                return val > 999 ? `${(val / 1000).toFixed(0)}k` : val
            }
        }
    },
    grid: {
        borderColor: '#e7eef7',
        padding: {
            top: -20,
            bottom: -10,
            left: 20
        }
    },
    tooltip: {
        x: { show: false }
    }
},
    series = [
        {
            name: 'This Month',
            data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600]
        },
        {
            name: 'Last Month',
            data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000]
        }
    ]
const DashBoard = () => {
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [toggle3, setToggle3] = useState(false)
    const [cardData, setCardData] = useState([])
    // const [show, setShow] = useState(false)
    // const [cardType, setCardType] = useState('')
    // console.log(localStorage.getItem("user-token"))
    const userId = localStorage.getItem('user-id')

    // const cardData = [
    //     { title: "Today's Bookings", amount: '50222', icon: <UserCheck size={25} />, id: 1 },
    //     { title: 'Monthly Bookings', amount: '50222', icon: <UserCheck size={25} />, id: 2 },
    //     { title: 'Stayovers', amount: '50222', icon: <UserCheck size={25} />, id: 3 },
    //     { title: "Today's Earnings", amount: '50222', icon: <UserCheck size={25} />, id: 4 },
    //     { title: 'Monthly Earnings', amount: '50222', icon: <UserCheck size={25} />, id: 5 },
    //     { title: "Today's Departures", amount: '50222', icon: <UserCheck size={25} />, id: 6 }
    // ]
    useEffect(() => {
        try {
            const dashboardCardBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Month: "2022-10-25T15:39:56.72"
            }
            axios.post(`/getdata/bookingdata/dashboardchart`, dashboardCardBody)
            .then((response) => {
                setCardData(response?.data[0])
            })
        } catch (error) {
            console.log("Dashboard Card Error", error.message)
        }
    }, [])
    return (
        <div className="dash_main">
            <Row>
                {/* {cardData.map((curElm) => {
                    return (
                        <Col xs='12' sm='4' md='4' xl='4'>
                            <div className='earnings-card' key={curElm.id}>
                                <CardDetail id={curElm.id} title={curElm.title} icon={curElm.icon} amount={curElm.amount}/>
                            </div>
                        </Col>

                    )
                })} */}
                <Col xs='12' sm='4' md='4' xl='4'>
                    <div className='earnings-card'>
                        <CardDetail id='1' title="Today's Booking" icon={<UserCheck size={25} />} amount={cardData[0]?.TodaysBookings} />
                    </div>
                </Col>
                <Col xs='12' sm='4' md='4' xl='4'>
                    <div className='earnings-card'>
                        <CardDetail id='2' title="Monthly Bookings" icon={<UserCheck size={25} />} amount={cardData[0]?.MonthlyBookings} />
                    </div>
                </Col>
                <Col xs='12' sm='4' md='4' xl='4'>
                    <div className='earnings-card'>
                        <CardDetail id='3' title="Stayovers" icon={<UserCheck size={25} />} amount={cardData[0]?.Stayovers} />
                    </div>
                </Col>
                <Col xs='12' sm='4' md='4' xl='4'>
                    <div className='earnings-card'>
                        <CardDetail id='4' title="Today's Earnings" icon={<UserCheck size={25} />} amount={cardData[0]?.TodaysEarnings} />
                    </div>
                </Col>
                <Col xs='12' sm='4' md='4' xl='4'>
                    <div className='earnings-card'>
                        <CardDetail id='5' title="Monthly Earnings" icon={<UserCheck size={25} />} amount={cardData[0]?.MonthlyEarninngs} />
                    </div>
                </Col>
                <Col xs='12' sm='4' md='4' xl='4'>
                    <div className='earnings-card'>
                        <CardDetail id='6' title="Today's Departures" icon={<UserCheck size={25} />} amount={cardData[0]?.TodaysDepartures} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs='12' sm='6' md='6' xl='6'>
                    <Card className='earnings-card'>
                        <CardHeader className='text-center align-right'>
                            <div className='d-flex flex-row'>
                                <Label for='switch-primary' className='form-check-label'>
                                    <FcLineChart size={25} />
                                </Label>
                                <div className='form-switch form-check-primary'>
                                    <Input type='switch' id='switch-primary' name='primary' defaultChecked={toggle} onChange={() => setToggle(!toggle)} />
                                </div>
                                <Label for='switch-primary' className='form-check-label'>
                                    <FcPieChart size={25} color='primary' />
                                </Label>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {toggle ? <Doughnut data={data} /> : <Chart options={options5} series={series} type='line' height={400} />}

                        </CardBody>
                    </Card>
                </Col>
                <Col xs='12' sm='6' md='6' xl='6'>
                    <Card className='earnings-card'>
                        <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                            {toggle3 ? <><CardTitle tag='h4'>Product Orders</CardTitle>
                                <UncontrolledDropdown className='chart-dropdown'>
                                    <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                                        Last 7 days
                                    </DropdownToggle>
                                    <DropdownMenu end>

                                        <DropdownItem className='w-100'>
                                            abc
                                        </DropdownItem>

                                    </DropdownMenu>
                                </UncontrolledDropdown></> : <>
                                <CardTitle tag='h4'>Latest Statistics</CardTitle>
                                <div className='d-flex align-items-center'>
                                    <Calendar size={14} />
                                    <Flatpickr
                                        className='form-control flat-picker bg-transparent border-0 shadow-none'
                                        options={{
                                            mode: 'range',
                                            // eslint-disable-next-line no-mixed-operators
                                            defaultDate: [new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)]
                                        }}
                                    />
                                </div>
                            </>
                            }

                            <div className='form-switch form-check-primary'>
                                <Input type='switch' id='switch-primary' name='primary' defaultChecked={toggle3} onChange={() => setToggle3(!toggle3)} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            {toggle3 ? <>
                                <Chart options={options7} series={series4} type='radialBar' height={340} />
                                <div className='d-flex justify-content-between mb-1'>
                                    <div className='d-flex align-items-center'>
                                        <Circle size={15} className='text-primary' />
                                        <span className='fw-bold ms-75'>Finished</span>
                                    </div>
                                    <span>finished</span>
                                </div>
                                <div className='d-flex justify-content-between mb-1'>
                                    <div className='d-flex align-items-center'>
                                        <Circle size={15} className='text-warning' />
                                        <span className='fw-bold ms-75'>Pending</span>
                                    </div>
                                    <span>pending</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center'>
                                        <Circle size={15} className='text-danger' />
                                        <span className='fw-bold ms-75'>Rejected</span>
                                    </div>
                                    <span>rejected</span>
                                </div>
                            </> : <div style={{ height: '400px' }}>
                                <Bar data={data4} options={options4} height={400} />
                            </div>
                            }
                        </CardBody>
                    </Card>
                </Col>
                <Col xs='12' sm='12' md='12' xl='12'>
                    <Card className='earnings-card'>
                        <CardHeader className='text-center align-right'>
                            <div className='d-flex flex-row'>
                                <Label for='switch-primary' className='form-check-label'>
                                    Primary
                                </Label>
                                <div className='form-switch form-check-primary'>
                                    <Input type='switch' id='switch-primary' name='primary' defaultChecked={toggle2} onChange={() => setToggle2(!toggle2)} />
                                </div>
                                <Label for='switch-primary' className='form-check-label'>
                                    Primary
                                </Label>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {toggle2 ? <Line data={data2} options={options2} height={450} /> : <Line data={data1} options={options} height={450} plugins={plugins} />}

                        </CardBody>
                    </Card>
                </Col>
            </Row>


        </div >
    )
}

export default DashBoard