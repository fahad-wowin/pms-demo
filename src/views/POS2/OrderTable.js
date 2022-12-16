import InputNumber from 'rc-input-number'
//import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Check, ChevronDown, Edit, Minus, Plus, Printer, Trash2 } from 'react-feather'
import { Button, Col, Input, Row } from 'reactstrap'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'
//import { containerCSS } from 'react-select/dist/declarations/src/components/containers'

const OrderTable = ({orderData, setOrderData, calculateTotal}) => { // () => {

    //const [orderData, setOrderData] = useState(data)

    const updatePrice = (e, id) => {
        const orderElement = orderData.filter(obj => obj.id === id)[0]
        orderElement.quantity = e 

        //console.log(id, '< e > ', orderElement)
        setOrderData(orderData)
        calculateTotal()
    }

    const removeOrderItem = (indx, itemId) => {
        //console.log(indx)
        
        let index = -1
        orderData.forEach((x, i) => {
            if (x.id === itemId) {
                index = i
        //console.log('index > ', i)

            }
        })
        //console.log(orderData[index])

        orderData.splice(index, 1)
        
        //console.log(orderData)
        setOrderData(orderData)
        calculateTotal()
    }

    const columns = [
        {
            name: 'Item Name',
            selector: row => row.name
        },
        {
            name: 'Quantity',
            center: true,
            width: 'max-content',
            selector: row => {
                return (
                    <>
                        <InputNumber
                            key={`quant_${row.id}`}
                            min={1}
                            upHandler={<Plus />}
                            downHandler={<Minus />}
                            value={row.quantity}
                            //placeholder={+row.quantity}
                            onChange={(e) => updatePrice(e, row.id)}
                        />
                    </>
                )
            }
        },
        {
            name: 'Action',
            right: true,
            selector: (row, i) => {
                return (
                    <>
                        <Button key={`del_pos_action_${row.id}`} color='outline-danger' size='sm' onClick={() => removeOrderItem(i, row.id)}><Trash2 size={15} /></Button>

                        {/* <Printer className='ms-1 cursor-pointer' size={15} /> */}
                    </>
                )
            }
        },
        {
            name: 'Price',
            right: true,
            selector: row => { return (`₹${+row.price * +row.quantity}`) }
        }

    ]

    return (
        <Row>
            <Col id='pos_table' className='react-dataTable'>
                <DataTable
                    
                    noHeader
                    data={orderData}
                    columns={columns}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                />
            </Col>
        </Row>
    )
}

export default OrderTable