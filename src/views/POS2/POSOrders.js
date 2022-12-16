import React, { useEffect, useState } from 'react'
import { ArrowRight, ArrowRightCircle, ChevronLeft, Plus } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import OrderTable from './OrderTable'
import GuestDetailForm from './GuestDetailForm'
import { toast } from 'react-hot-toast'

const tableOptions = [
    { value: '1', label: 'Table 1' },
    { value: '2', label: 'Table 2' },
    { value: '3', label: 'Table 3' }
]

const restoOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card/POS' },
    { value: 'online', label: 'Online' },
    { value: 'complimentary', label: 'Complimentary (70% off)' }
]

const roomOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card/POS' },
    { value: 'online', label: 'Online' },
    { value: 'checkout', label: 'Pay at Checkout' }
]

const guestOptions = [
    { value: 'g1', label: 'Guest 1' },
    { value: 'g2', label: 'Guest 2' }
]

const posProductMaster = [
    {
        id: '1',
        product_name: 'Eggs',
        category_name: 'Breakfast',
        price: 20.00,
        status: true,
        available: 10
    },
    {
        id: '2',
        product_name: 'Coffee',
        category_name: 'Breakfast',
        price: 100.00,
        status: true,
        available: 2
    },
    {
        id: '3',
        product_name: 'Toast',
        category_name: 'Breakfast',
        price: 50.00,
        status: true,
        available: 2
    },
    {
        id: '4',
        product_name: 'Rice',
        category_name: 'Lunch',
        price: 50.00,
        status: true,
        available: 10
    },
    {
        id: '5',
        product_name: 'Chicken',
        category_name: 'Lunch',
        price: 200.00,
        status: true,
        available: 2
    },
    {
        id: '6',
        product_name: 'Veg Curry',
        category_name: 'Lunch',
        price: 150.00,
        status: true,
        available: 2
    },
    {
        id: '7',
        product_name: 'Bread',
        category_name: 'Dinner',
        price: 20.00,
        status: true,
        available: 10
    },
    {
        id: '8',
        product_name: 'Fish',
        category_name: 'Dinner',
        price: 100.00,
        status: true,
        available: 2
    },
    {
        id: '9',
        product_name: 'BBQ',
        category_name: 'Dinner',
        price: 260.00,
        status: true,
        available: 2
    }
]

const POSOrders = () => {

    const navigate = useNavigate()

    const { name } = useParams()

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const [selectedTable, setSelectedTable] = useState('')

    const [selectedGuest, setSelectedGuest] = useState('')

    const [inResto, setInResto] = useState(true)

    const [paymentOption, setPaymnetOption] = useState('')

    const [orderData, setOrderData] = useState([])

    const getItemTotal = (data) => {
        let calData = data
        if (!data) {
            calData = orderData
        }
        if (calData.length < 1) {
            return 0
        }

        return calData.reduce(function(prev, current) { return prev + (+current.price * current.quantity) }, 0)
    }

    const [itemTotal, setItemTotal] = useState(getItemTotal())

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

    const [tax, setTax] = useState(getTheTax(itemTotal))   // get tax from API
    
    const [orderTotal, setOrderTotal] = useState()

    const addProduct2order = (prouctId) => {

        const productItem = posProductMaster.filter(product => product.id === prouctId)[0]

        const orderItems = orderData.filter(product => product.product_id === prouctId)
        console.log('orderItems > ', orderItems)
        if (orderItems.length > 0) {
            toast.error(`'${productItem.product_name}' is already added in the order`)
        } else {
            orderData.push({id: orderData.length + 1, name: productItem.product_name, quantity: '1', price: productItem.price, product_id: productItem.id})
            toast.success(`'${productItem.product_name}' is added in the order`)
        
        }
        const lt = getItemTotal()
        setItemTotal(lt)
    }


    const calculateTotal = (data) => {
        console.log(data)
             let thisData = []
             if (data) {
                 thisData = data
                 setOrderData(data)
             } else {
                 thisData = orderData
             }
             const lt = getItemTotal(thisData)
             setItemTotal(lt)
        //     console.log('calc data > ', thisData)
        //     const total = thisData.reduce(function(prev, current) { return prev + (+current.price * current.quantity) }, 0)
        //     setOrderTotal(total)
        //     setCGST(+GetCGST(total))
        //     setSGST(+GetSGST(total))
        //     setTotalIncTaxes(+GetTotalIncTaxes(+total))
        //     setDiscountTotal(+GetDiscountTotal(+GetTotalIncTaxes(+total)))
        //     setDueTotal(+GetDueTotal(+GetTotalIncTaxes(+total)))
        //     return total
         }
    
    const selectTable = (e) => {
        if (e) {
            setSelectedTable(e.value)
        } else {
            setSelectedTable('')
        }
        calculateTotal([])
    }

    const resetOrder = () => {
        setTax('')
        setDiscount('')
        setDiscountPercent('')
        setItemTotal('')
        setOrderTotal('')
    }

    const selectGuest = (e) => {
        resetOrder()
        let thisData = []
        if (e) {
            setSelectedGuest(e.value)
            // TODO - get data from API and set the data
            thisData = [
                {
                    id: 1,
                    name: 'Eggs',
                    quantity: 1,
                    price: '20',
                    product_id: '1'
                },
                {
                    id: 2,
                    name: 'Coffee',
                    quantity: 2,
                    price: '100',
                    product_id: '2'
                },
                {
                    id: 3,
                    name: 'Fish',
                    quantity: 3,
                    price: '100',
                    product_id: '8'
                }
            ]
        } else {
            setSelectedGuest('')
        }

        setOrderData(thisData)
        const t = getItemTotal(thisData)
        console.log("thisData - ", t)
        setItemTotal(t)

    }

    const calcDiscount = () => {

        let discnt = discount
        const tx = getTheTax(itemTotal)
        if (discountType === '%') {
            discnt = (+discountPercent / 100) * (itemTotal + tx)
            setDiscount(Number(discnt).toFixed(2))
        }
        if (discnt === 0 || discnt === discount) {
            setTax(tx)
            setOrderTotal(+itemTotal + +tx - +discount)
        }
    }

    useEffect(() => {

        setOrderTotal(+itemTotal + +tax - +discount)

    }, [discount])

    useEffect(() => {
        
        console.log('lt--tx > ', tax)

        const tx = getTheTax(+itemTotal)

        setTax(tx)
        console.log('lt++tx > ', tx)

        calcDiscount()

    }, [itemTotal])

    return (
        <>
            <div className='d-flex'>
                <Button className='mb-1 ' size='sm' color='primary' onClick={() => navigate(-1)}><ChevronLeft size={25} color='#FFF' /></Button>
                <span className='fs-3 mx-auto'>{name} - POS Orders</span>
            </div>
            <Row>
                <Col xl='12'>
                    <Card>
                        <CardBody>
                            <Row className='mb-1'>
                                <Col md='6'>
                                    <Row>
                                <Col xl='12 mt-25 d-flex justify-content-between'>
                                    <Label className='fw-bold fs-5 me-1 cursor-pointer'>
                                        <Input
                                            type='radio'
                                            name='pos'
                                            className='me-1'
                                            checked={inResto}
                                            onChange={() => setInResto(!inResto)}
                                        />
                                        {name} - Restaurant</Label>
                                    
                                    <Label className='fw-bold fs-5 ms-1 cursor-pointer'>
                                    <Input
                                        type='radio'
                                        name='pos'
                                        className='me-1'
                                        checked={!inResto}
                                        onChange={() => setInResto(!inResto)}
                                    />
                                    Room Transfer</Label>
                                </Col>
                            
                                    {
                                        inResto ? (
                                            <>
                                                    <Col xl='12 mt-2'>
                                                        <Label>Select Table</Label>
                                                        <Select
                                                            name='TableName'
                                                            id='TableName'
                                                            key='TableName'
                                                            isClearable
                                                            placeholder=''
                                                            menuPlacement='auto'
                                                            theme={selectThemeColors}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            options={tableOptions}
                                                            onChange={selectTable}
                                                        />
                                                    </Col>
                                                    <Col xl='12 mt-2'>
                                                        <Label>Other</Label>
                                                        <Input
                                                            type='text'
                                                            placeholder='Walkin or Parcel'
                                                            name='other'
                                                        />
                                                    </Col>
                                               
                                            </>
                                        ) : (
                                            <>
                                                    <Col xl='12 mt-2'>
                                                        <Label>Guest Name</Label>
                                                        <Select
                                                            name='GuestName'
                                                            id='GuestName'
                                                            key='GuestName'
                                                            isClearable
                                                            placeholder=''
                                                            menuPlacement='auto'
                                                            theme={selectThemeColors}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            options={guestOptions}
                                                            onChange={selectGuest}
                                                        />
                                                    </Col>
                                                
                                            </>
                                        )
                                    }</Row>
                                    </Col>
                                <Col md='6'>
                                    <Row>

                                        <Col xl='12 mt-2 mt-md-4'>
                                            <Label>Server name</Label>
                                            <Input
                                                type='text'
                                                name='other'
                                            />
                                        </Col>
                                        <Col  xl='12' className=' mt-2 mt-md-4 btn-group-sm d-flex justify-content-around'>
                                            <Button color='info'>Print KOT</Button>
                                            <Button color='warning'>Hold Bill</Button>
                                            <Button color='success'>Preview Bill</Button>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className='mb-1'>
                                <Col>
                                    <Input
                                        type='text'
                                        name='search menu'
                                        placeholder='Search an Item'
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink active={active === '1'} onClick={() => toggle('1')}>
                                                Breakfast
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink active={active === '2'} onClick={() => toggle('2')}>
                                                Lunch
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink active={active === '3'} onClick={() => toggle('3')}>
                                                Dinner
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={active}>
                                        <TabPane tabId='1'>
                                            <ListGroup flush>
                                                {
                                                    posProductMaster.filter(prdct => prdct.category_name === 'Breakfast').map((product, i) => {
                                                      return (
                                                            <ListGroupItem key={`bfast_${i}`} className='d-flex flex-row'>
                                                                <Col>{product.product_name}</Col>
                                                                <Col>₹ {product.price}</Col>
                                                                <Button color='primary' size='sm' onClick={() => addProduct2order(product.id)}><Plus size={12}/></Button>
                                                            </ListGroupItem>
                                                     )
                                                    })
                                                }
                                                
                                            </ListGroup>
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <ListGroup flush>
                                            {
                                                    posProductMaster.filter(prdct => prdct.category_name === 'Lunch').map((product, i) => {
                                                      return (
                                                            <ListGroupItem key={`bfast_${i}`} className='d-flex flex-row'>
                                                                <Col>{product.product_name}</Col>
                                                                <Col>₹ {product.price}</Col>
                                                                <Button color='primary' size='sm' onClick={() => addProduct2order(product.id)}><Plus size={12}/></Button>
                                                            </ListGroupItem>
                                                     )
                                                    })
                                                }
                                            </ListGroup>
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <ListGroup flush>
                                            {
                                                    posProductMaster.filter(prdct => prdct.category_name === 'Dinner').map((product, i) => {
                                                      return (
                                                            <ListGroupItem key={`bfast_${i}`} className='d-flex flex-row'>
                                                                <Col>{product.product_name}</Col>
                                                                <Col>₹ {product.price}</Col>
                                                                <Button color='primary' size='sm' onClick={() => addProduct2order(product.id)}><Plus size={12}/></Button>
                                                            </ListGroupItem>
                                                     )
                                                    })
                                                }
                                            </ListGroup>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md='7'>
                    <Card>
                        <CardHeader>
                            <CardTitle>{name} billing Id - {Math.floor(Math.random() * 100)}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className='mb-1'>
                                <Col xl='12'>
                                    <OrderTable orderData={orderData} setOrderData={setOrderData} calculateTotal={calculateTotal}/>
                                </Col>
                                <Col xl='12'>
                                    <ListGroup>
                                        
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Total ( {orderData.reduce(function(prev, current) { return prev + +current.quantity }, 0)} item/s )</Col>
                                                <Col className='text-end'>{Number(itemTotal).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>SGST @{sgst}%</Col>
                                                <Col className='text-end'>+ {Number(itemTotal * sgst / 100).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>CGST @{cgst}%</Col>
                                                <Col className='text-end'>+ {Number(itemTotal * cgst / 100).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Total (Incl All Taxes)</Col>
                                                <Col className='text-end'>₹ {Number(+itemTotal + +tax).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        {/* <ListGroupItem>
                                            <Row>
                                                <Col>Rounding Off</Col>
                                                <Col className='text-end'>{Math.round(orderTotal + (orderTotal * .05))}</Col>
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
                                                            name='posDiscount'
                                                            id='posDiscount'
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
                                                        onChange={(e) => (setDiscountPercent(e.target.value), setDiscount(Number((+itemTotal + +tax) * (+e.target.value / 100)).toFixed(2)))}
                                                    />
                                                    </Col>
                                                <Col className='text-end'>
                                                    
                                                    <h4 className='d-inline me-1' style={{verticalAlign:'-webkit-baseline-middle'}}> - </h4>
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
                                                <Col>Total Due (Rounded off)</Col>
                                                <Col className='text-end'>₹ {Number(+orderTotal).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
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
                                        options={inResto ? restoOptions : roomOptions}
                                        onChange={e => setPaymnetOption(e.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                {
                                    paymentOption && <GuestDetailForm inResto={inResto} option={paymentOption} table={selectedTable} guest={selectedGuest} />
                                }
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
        </>
        
    )

}

export default POSOrders