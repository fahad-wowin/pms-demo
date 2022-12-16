import React, { useEffect, useState } from 'react'
import { ChevronLeft, Plus, ChevronDown, Trash2, User, UserX } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane, Badge } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import DataTable from 'react-data-table-component'
import GuestDetailForm from './GuestDetailForm'
import { toast } from 'react-hot-toast'

const paymentOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card/POS' },
    { value: 'online', label: 'Online' },
    { value: 'checkout', label: 'Pay at Checkout' }
]

const roomNoOptions = [
    { value: '101', label: '101' },
    { value: '102', label: '102' },
    { value: '103', label: '103' },
    { value: '302', label: '302' }
]

const LaundryTransaction = () => {
    const [paymentOption, setPaymnetOption] = useState('')
    const [selectedRoom, setSelectedRoom] = useState('')


    const laundryMaster = [
        { id: 1, gender: 'm', cloth_name: 'shirt', washing_amount: 500, pressing_amount: 100, dclean_amount: 700, service: '' },
        { id: 2, gender: 'm', cloth_name: 'trouser', washing_amount: 500, pressing_amount: 100, dclean_amount: 400, service: '' },
        { id: 3, gender: 'm', cloth_name: 'tshirt', washing_amount: 500, pressing_amount: 100, dclean_amount: 300, service: '' },
        { id: 4, gender: 'f', cloth_name: 'sari', washing_amount: 500, pressing_amount: 100, dclean_amount: 500, service: '' },
        { id: 5, gender: 'f', cloth_name: 'suit', washing_amount: 500, pressing_amount: 100, dclean_amount: 400, service: '' },
        { id: 6, gender: 'f', cloth_name: 'shirt', washing_amount: 500, pressing_amount: 100, dclean_amount: 300, service: '' },
        { id: 7, gender: 'c', cloth_name: 'frock', washing_amount: 500, pressing_amount: 100, dclean_amount: 500, service: '' },
        { id: 8, gender: 'c', cloth_name: 'trouser', washing_amount: 500, pressing_amount: 100, dclean_amount: 400, service: '' },
        { id: 9, gender: 'c', cloth_name: 'jeans', washing_amount: 500, pressing_amount: 100, dclean_amount: 300, service: '' }
    ]

    const [laundryData, setLaundryData] = useState([])

    const getLaundryTotal = (data) => {
        let calData = data
        if (!data) {
            calData = laundryData
        }
        if (calData.length < 1) {
            return 0
        }
        return calData.reduce(function(prev, current) { return prev + +current.amount }, 0)
    }

    const [laundryTotal, setLaundryTotal] = useState(getLaundryTotal())

    const [discount, setDiscount] = useState('0')
    const [discountType, setDiscountType] = useState('%')
    const [discountPercent, setDiscountPercent] = useState('0')

    const [cgst] = useState(2.5) // get tax from API
    const [sgst] = useState(2.5) // get tax from API
    const [igst] = useState(5)   // get tax from API
    const [outsisedState] = useState(false) // get tax from API

    const getTheTax = (total) => {
        let tx = 0
        if (outsisedState) {
            tx = +total * +igst / 100
        } else {
            tx = (+total * +cgst / 100) + (total * +sgst / 100)
        }
        return tx
    }
    const [tax, setTax] = useState(getTheTax(laundryTotal))   // get tax from API

    console.log('tax init > ', tax)
    
    const [orderTotal, setOrderTotal] = useState()
    
    console.log('ord ttl init > ', orderTotal)

    const navigate = useNavigate()

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const removeLaundry = (i, id) => {
        console.log(i)
        console.log(id)

        let index = -1
        laundryData.forEach((x, i) => {
            if (x.id === id) {
                index = i
        console.log('index > ', i)

            }
        })
        console.log(laundryData[index])

        laundryData.splice(index, 1)
        
        console.log(laundryData)
        const lt = getLaundryTotal()
        setLaundryTotal(lt)
    }

    const addLaundry = (id) => {

        const data = laundryMaster.filter(x => x.id ===  id)[0]

        const serviceAmount = data.service === 'Washing' ? data.washing_amount : data.service === 'Pressing' ? data.pressing_amount : data.dclean_amount
            if (data.service !== '') {
                laundryData.push({ laundry_id: data.id, id: laundryData.length + 1, gender: data.gender, cloth_name: data.cloth_name, amount: serviceAmount, service: data.service })
            }
            const lt = getLaundryTotal()
            setLaundryTotal(lt)

    }
    const resetOrder = () => {
        setTax('')
        setDiscount('')
        setDiscountPercent('')
        setLaundryTotal('')
        setOrderTotal('')
    }
    const setSelectedGuest = (e) => {
        resetOrder()
        let localLaundryData = []
        // Get the date from current guset in the selected room - TODO API
        if (e) {
            console.log(e.value)
            setSelectedRoom(e.value)
            localLaundryData = [
                { laundry_id: 7, id: 1, gender: 'c', cloth_name: 'frock', amount: 500, service: 'Washing' },
                { laundry_id: 5, id: 2, gender: 'f', cloth_name: 'suit', amount: 400, service: 'Pressing' },
                { laundry_id: 1, id: 3, gender: 'm', cloth_name: 'shirt', amount: 300, service: 'Dry Cleaning' }
            ]

        } else {
            setSelectedRoom('')
        }
        setLaundryData(localLaundryData)
        const t = getLaundryTotal(localLaundryData)
        console.log("total - ", t)
        setLaundryTotal(t)
    }

    const calcDiscount = () => {

        let discnt = discount
        const tx = getTheTax(laundryTotal)
        if (discountType === '%') {
            discnt = (+discountPercent / 100) * (laundryTotal + tx)
            setDiscount(discnt)
        }
        if (discnt === 0 || discnt === discount) {
            setTax(tx)
            setOrderTotal(+laundryTotal + +tx - +discount)
        }
    }

    useEffect(() => {

        setOrderTotal(+laundryTotal + +tax - +discount)

    }, [discount])

    useEffect(() => {
        
        console.log('lt--tx > ', tax)

        const tx = getTheTax(+laundryTotal)

        setTax(tx)
        console.log('lt++tx > ', tx)

        calcDiscount()

    }, [laundryTotal])

    const laundryColumns = [

        {
            name: 'Cloth',
            sortable: true,
            selector: row => row.cloth_name
        },
        {
            name: (<><div className='me-2'>Services</div><div className='ms-2'>Amount</div></>),
            minWidth: 400,
            // sortable: true,
            selector: (row) => {
                return (
                    <>
                        <ServicesChange id={row.id} />
                    </>
                )
            }
        },
        // {
        //     name: 'Amount',
        //     minWidth: 200,
        //     sortable: true,
        //     selector: row => row.amount
        // },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => {
                return (
                    <Button id={row.id} key={`add_laundry_action_${row.id}`} color='primary' size='sm' onClick={() => addLaundry(row.id)}>+</Button>
                )
            }
        }
    ]
    const laundryAddColumns = [
        {
            name: 'mfc',
            sortable: true,
            style: {flexGrow: 0},
            selector: row => <Badge className={row.gender === 'm' ? 'p-25 bg-light-primary' : row.gender === 'f' ? 'bg-light-danger' : 'bg-light-info'} pill>{row.gender}</Badge>
        },
        {
            name: 'Cloth',
            sortable: true,

            selector: row => row.cloth_name
        },
        {
            name: 'Services',
            minWidth: 300,
            sortable: true,
            selector: (row) => {
                return (
                    <>
                        <ServiceSelected id={row.id} />
                    </>
                )
            }
        },
        {
            name: 'Amount',
            minWidth: 150,
            sortable: true,
            selector: row => row.amount
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row, i) => {
                return (
                    <Button key={`del_laundry_action_${row.id}`} color='outline-danger' size='sm' onClick={() => removeLaundry(i, row.id)}><Trash2 size={15} /></Button>
                )
            }
        }
    ]

    const ServicesChange = ({ id }) => {

        const data = laundryMaster.filter(laundry => laundry.id === id)[0]

        const [service, setService] = useState('')
        const [serviceCharge, setServiceCharge] = useState()
        const updateLaundry = (e) => {
            setService(e.target.value)
            const ser = e.target.value
            setServiceCharge(ser === 'Washing' ? data.washing_amount : ser === 'Pressing' ? data.pressing_amount : data.dclean_amount)

            if (e.target.value !== '') {
                laundryMaster.map(obj => {
                    if (obj.id === id) {
                        obj.service = e.target.value
                    }
                })
            }
        }

        return (
            <>
            <div className='d-flex' key={id} >
                <div className='d-flex'>
                    <div className='form-check form-check-success'>
                        <Input type='radio' className='border-success' id='success-checkbox' value='Washing' checked={service === 'Washing'} onChange={updateLaundry} />
                    </div>
                    <div className='form-check form-check-warning'>
                        <Input type='radio' className='border-warning' id='warning-checkbox' value='Pressing' checked={service === 'Pressing'} onChange={updateLaundry} />
                    </div>
                    <div className='form-check form-check-info'>
                        <Input type='radio' className='border-info' id='info-checkbox' value='Dry Cleaning' checked={service === 'Dry Cleaning'} onChange={updateLaundry} />
                    </div>
                </div>
                <div className='ms-2'>{serviceCharge ?? '000'}</div>
            </div>  
            </>
        )
    }

    const ServiceSelected = ({ id }) => {
        const data = laundryData.filter(user => user.id === id)
        const [service] = useState(data[0]?.service)
        const [cssClass] = useState(service === 'Washing' ? 'success' : service === 'Pressing' ? 'warning' : 'info')

        return (
            <>
                <div className='d-flex'>
                    <div className={'form-check form-check-'.concat(cssClass)}>
                        <Label>
                        <Input key={id} type='radio' id={ cssClass.concat('-checkbox')} value={service} defaultChecked/>{service}</Label>
                    </div>
                    {/*   <>
                        <div className='form-check form-check-warning'>
                        <Input type='radio' id='warning-checkbox' value='Pressing' checked={service === 'Pressing'} onChange={updateLaundry} />
                        </div>
                        <div className='form-check form-check-info'>
                        <Input type='radio' id='info-checkbox' value='Dry Cleaning' checked={service === 'Dry Cleaning'} onChange={updateLaundry} />
                        </div>
                        </>
                        */
                     }
                </div>
                { //<span>{service}</span>  
                }
            </>
        )
    }
    const saveOrder = () => {
        console.log('Order > ', laundryData)
        if (laundryData && laundryData.length > 0) {
            // TODO - Save data to db - API call
            toast.success(`Laundry Order of room number '${selectedRoom}' saved`)
        }

    }


    return (
        <>
            <Button className='mb-1' size='sm' color='primary' onClick={() => navigate(-1)}><ChevronLeft size={25} color='#FFF' /></Button>
            <Row>
                <Col md={5}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Laundry List</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className='mb-1 text-center'>
                                    <Col className='p-0'><Badge color='success'>Washing</Badge></Col>
                                <Col className='p-0'><Badge color='warning'>Pressing</Badge></Col>
                                <Col className='p-0'><Badge color='info'>Dry Cleaning</Badge></Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink active={active === '1'} onClick={() => toggle('1')}>
                                                All
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink active={active === '2'} onClick={() => toggle('2')}>
                                                Male
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink active={active === '3'} onClick={() => toggle('3')}>
                                                Female
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink active={active === '4'} onClick={() => toggle('4')}>
                                                Child
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={active}>
                                        <TabPane tabId='1'>
                                            <DataTable
                                                noHeader
                                                data={laundryMaster}
                                                columns={laundryColumns}
                                                className='react-dataTable'
                                                sortIcon={<ChevronDown size={10} />}
                                            />
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <DataTable
                                                noHeader
                                                data={laundryMaster.filter(data => data.gender === 'm')}
                                                columns={laundryColumns}
                                                className='react-dataTable'
                                                sortIcon={<ChevronDown size={10} />}
                                            />
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <DataTable
                                                noHeader
                                                data={laundryMaster.filter(data => data.gender === 'f')}
                                                columns={laundryColumns}
                                                className='react-dataTable'
                                                sortIcon={<ChevronDown size={10} />}
                                            />
                                        </TabPane>
                                        <TabPane tabId='4'>
                                            <DataTable
                                                noHeader
                                                data={laundryMaster.filter(data => data.gender === 'c')}
                                                columns={laundryColumns}
                                                className='react-dataTable'
                                                sortIcon={<ChevronDown size={10} />}
                                            />
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className='mb-1'>
                                <Col md='3'  sm='col-4'>
                                    <Label className='fw-bold fs-5'>Room No.</Label>
                                </Col>

                                <Col md='9' sm='col-8'>

                                    <Select
                                        isClearable
                                        placeholder=''
                                        menuPlacement='auto'
                                        //theme={selectThemeColors}
                                        className='react-select w-50'
                                        classNamePrefix='select'
                                        options={roomNoOptions}
                                        onChange={setSelectedGuest}
                                    />
                                </Col>
                                <Col md='3'  sm='col-4'>
                                <Label className='fw-bold fs-5 mt-2 '>Guest Name</Label>

                                    </Col>
                                <Col md='9' sm='col-8'>

                                    <Input type='text' className='form-control mt-2' readOnly id='guestName' name='guestName' placeholder='Guest Name' />
                                </Col>
                            </Row>
                           { 
                            (laundryData && laundryData.length > 0) ? (
                                <>
                                <Row className='mb-1 d-flex flex-column'>
                                    <Col className='mb-1' id="LaundryTransaction">

                                            <DataTable
                                                
                                                noHeader
                                                data={laundryData}
                                                columns={laundryAddColumns}
                                                className='react-dataTable'
                                                sortIcon={<ChevronDown size={10} />}
                                            />

                                    </Col>
                                    <Col>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Total</Col>
                                                    <Col className='text-end'>{laundryTotal}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            {
                                                outsisedState ? (
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>IGST @{igst}%</Col>
                                                            <Col className='text-end'>{Number(laundryTotal * +igst / 100).toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                ) : ( 
                                                <>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>SGST @{sgst}%</Col>
                                                            <Col className='text-end'>{Number(laundryTotal * +sgst / 100).toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>CGST @{cgst}%</Col>
                                                            <Col className='text-end'>{Number(laundryTotal * +cgst / 100).toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                 </>
                                                )
                                            }
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Total (Incl All Taxes)</Col>
                                                    <Col className='text-end'>{Number(laundryTotal + tax).toFixed(2)}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            {/* <ListGroupItem>
                                                <Row>
                                                    <Col>Rounding Off</Col>
                                                    <Col className='text-end'>0</Col>
                                                </Row>
                                            </ListGroupItem> */}
                                            <ListGroupItem>
                                                <Row>
                                                    <Col><span>Discount</span>
                                                    
                                                        </Col>
                                                        <Col className='p-0 d-flex'>
                                                        <div className='form-switch w-50 ps-0'>

                                                     Flat <Input type='switch' className='ms-25 mb-25 '  
                                                                 style={{width: '28px', height: '16px'}}
                                                                name='LaundryDiscount'
                                                                id='LaundryDiscount'
                                                                checked={discountType === '%'}
                                                                onChange={(e) => (setDiscountType(e.target.checked ? '%' : 'flat'), setDiscountPercent(0), setDiscount(0))}
                                                        /> %
                                                        </div>
                                                        <Input
                                                            className='p-25 float-end w-25 text-end w-50'
                                                            type='text'
                                                            name='DiscountPercent'
                                                            value={discountPercent}
                                                            disabled={discountType !== '%'}
                                                            onChange={(e) => (setDiscountPercent(e.target.value), setDiscount(Number((+laundryTotal + +tax) * (+e.target.value / 100)).toFixed(2)))}
                                                        />
                                                        </Col>
                                                    <Col className='text-end'>
                                                        
                                                        
                                                    <Input
                                                            className='p-25 w-50 float-end text-end'
                                                            type='text'
                                                            name='Discount'
                                                            value={discount}
                                                            disabled={discountType === '%'}
                                                            onChange={(e) => setDiscount(e.target.value)}
                                                            />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem color='primary'>
                                                <Row>
                                                    <Col>Total Due</Col>
                                                    <Col className='text-end'>₹ {Number(orderTotal).toFixed(2)}</Col> {/*Number(laundryTotal + tax - discount).toFixed(2)} / */}
                                                </Row>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col className='text-center'>
                                        <Button color='success' onClick={saveOrder}>Save Order</Button>
                                    </Col>
                                </Row>
                                <Row className='mb-1'>
                                    <Col>
                                        <Label className='fw-bold fs-5'>Payment Type</Label>
                                        <Select
                                            placeholder=''
                                            menuPlacement='auto'
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            options={paymentOptions}
                                            onChange={e => setPaymnetOption(e.value)}
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className='mb-1'>
                                    {
                                        paymentOption && <GuestDetailForm inResto={true} option={paymentOption} guest={'selectedGuest'} />
                                    }
                                </Row>
                                </>
                            ) : null
                        }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default LaundryTransaction