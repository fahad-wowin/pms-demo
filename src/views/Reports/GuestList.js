import { React, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, InputGroup, InputGroupText, Label, Row, Input, CardTitle } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { MdDateRange } from "react-icons/md"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Search } from 'react-feather'

export let data
axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
    data = response.data
})

const dateType = [
    { value: 'Booking Date', label: 'Booking Date' },
    { value: '...', label: '...' },
    { value: '...', label: '...' },
    { value: '...', label: '...' }
]

const bookingthrough = [
    { value: '...', label: '...' },
    { value: '...', label: '...' },
    { value: '...', label: '...' }
]

const statusType = [
    { value: '...', label: '...' },
    { value: '...', label: '...' },
    { value: '...', label: '...' }
]

// const guestListStyles = {
//     headCells: {
//         style: {
//             fontSize: '15px',
//             fontWeight: '500',
//             backgroundColor: '#D8BFD8',
//             wordBreak: 'break-all',
//             whiteSpace: 'pre-wrap'
//         }
//     }
// }

const GuestList = () => {
    const [picker, setPicker] = useState(new Date())

    const guestListTable = [
        {
            name: 'BookingCode',
            selector: row => row.id
        },
        {
            name: "CheckInDate",
            cell: row => (
                <p name={row.name}>2022-08-15</p>
            )
        },
        {
            name: 'CheckOutDate',
            cell: row => (
                <p name={row.name}>2022-08-15</p>
            )
        },
        {
            name: 'Status Type',
            cell: row => (
                <p name={row.name}>Inhouse</p>
            )
        },
        {
            name: 'A/Y/C',
            cell: row => (
                <p name={row.name}>2/0/0</p>
            )
        },
        {
            name: 'BookedOn',
            cell: row => (
                <p name={row.name}>2022-08-15 <br />10:33:55</p>
            )
        },
        {
            name: 'PAH'
        },
        {
            name: 'GuestName',
            selector: row => row.name
        },
        {
            name: 'EmailId',
            selector: row => row.email
        },
        {
            name: 'Mobile',
            cell: row => (
                <p name={row.name}>9876543210</p>
            )
        },
        {
            name: 'IDType'
        },
        {
            name: 'IDNo.',
            cell: row => (
                <p name={row.name}>0</p>
            )
        },
        {
            name: 'BookingVendor',
            cell: row => (
                <p name={row.name}>Goibibo / MMT</p>
            )
        },
        {
            name: 'VendorBookingId',
            cell: row => (
                <p name={row.name}>NH75073219441794</p>
            )
        },
        {
            name: 'RoomCount',
            cell: row => (
                <p name={row.name}>2</p>
            )
        },
        {
            name: 'Nights',
            cell: row => (
                <p name={row.name}>2</p>
            )
        },
        {
            name: 'AgreedRate',
            cell: row => (
                <p name={row.name}>3499.00</p>
            )
        },
        {
            name: 'GST',
            cell: row => (
                <p name={row.name}>419.88</p>
            )
        },
        {
            name: 'CommisionAmount',
            cell: row => (
                <p name={row.name}>3539</p>
            )
        },
        {
            name: 'NettPayableToHotel',
            cell: row => (
                <p name={row.name}>4858.76</p>
            )
        },
        {
            name: 'FoodAmt',
            cell: row => (
                <p name={row.name}>0.00</p>
            )
        },
        {
            name: 'FoodGST',
            cell: row => (
                <p name={row.name}>0.00</p>
            )
        },
        {
            name: 'TotalAmount',
            cell: row => (
                <p name={row.name}>8397.76</p>
            )
        },
        {
            name: 'PayStatus',
            cell: row => (
                <p name={row.name}>Pending</p>
            )
        },
        {
            name: 'PaidAmt',
            cell: row => (
                <p name={row.name}>0.00</p>
            )
        },
        {
            name: 'PayDate'
        },
        {
            name: 'PayMode'
        }
    ]
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Guest With Rate</CardTitle>
                </CardHeader>
                <CardBody className='text-center'>
                    <Row>
                        <Col className='text-start'>
                            <Label className='form-label' for='startDate'>
                                From Date
                            </Label>
                            <div className='datePicker'>
                                <InputGroup className='input-group-merge'>
                                    <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='startDate' />
                                    <InputGroupText>
                                        <MdDateRange size={15} />
                                    </InputGroupText>
                                </InputGroup>
                            </div>
                        </Col>
                        <Col className='text-start'>
                            <Label className='form-label' for='startDate'>
                                To Date
                            </Label>
                            <div className='datePicker'>
                                <InputGroup className='input-group-merge'>
                                    <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='startDate' />
                                    <InputGroupText>
                                        <MdDateRange size={15} />
                                    </InputGroupText>
                                </InputGroup>
                            </div>
                        </Col>
                        <Col className='text-start'>
                            <Label className='form-label' for='dateType'>
                                Date Type
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={dateType[0]}
                                options={dateType}
                                isClearable={false}
                            />
                        </Col>
                        <Col className='text-start'>
                            <Label className='form-label' for='bookingThrough'>
                                Booking Through
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={bookingthrough[0]}
                                options={bookingthrough}
                                isClearable={false}
                            />
                        </Col>
                        <Col className='text-start'>
                            <Label className='form-label' for='statusType'>
                                Status Type
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={statusType[0]}
                                options={statusType}
                                isClearable={false}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6 mt-3 mb-2'>
                            <Form className='faq-search-input w-50'>
                                <InputGroup className='input-group-merge'>
                                    <InputGroupText>
                                        <Search size={14} />
                                    </InputGroupText>
                                    <Input placeholder='search' />
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col md='6 mt-3 mb-2 text-end'>
                            <Button color='primary' outline>Export to Excel</Button>
                        </Col>
                    </Row>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={data}
                                columns={guestListTable}
                                className='react-dataTable'
                            // customStyles={guestListStyles}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default GuestList