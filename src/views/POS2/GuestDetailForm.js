import React from 'react'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const agentOptions = [
    { value: 'bank transfer', label: 'Bank Transfer' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' }
]

const GuestDetailForm = ({ inResto, option, table, guest }) => {

    return (
        <>
            <Row>
                <Col>
                    <Form>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Guest Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Guest Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Mobile Number</Label>
                                <Input
                                    type='text'
                                    name='mobile'
                                />
                            </Col>
                        </Row>
                        {
                            inResto ? (
                                <>
                                    {
                                        option === 'cash' ? (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Payment Collectors Name</Label>
                                                        <Input
                                                            type='text'
                                                            name='payment collector'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Table</Label>
                                                        <Input
                                                            type='text'
                                                            name='table'
                                                            value={table}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : option === 'card' ? (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Payment Collectors Name</Label>
                                                        <Input
                                                            type='text'
                                                            name='payment collector'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Reference Number</Label>
                                                        <Input
                                                            type='text'
                                                            name='ref number'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Table</Label>
                                                        <Input
                                                            type='text'
                                                            name='table'
                                                            value={table}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : option === 'online' ? (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Payment Agent</Label>
                                                        <Select
                                                            menuPlacement='auto'
                                                            theme={selectThemeColors}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            options={agentOptions}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Table</Label>
                                                        <Input
                                                            type='text'
                                                            name='table'
                                                            value={table}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Attending Staff</Label>
                                                        <Input
                                                            type='text'
                                                            name='staff name'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Table</Label>
                                                        <Input
                                                            type='text'
                                                            name='table'
                                                            value={table}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        option === 'cash' ? (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Payment Collectors Name</Label>
                                                        <Input
                                                            type='text'
                                                            name='payment collector'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Guest</Label>
                                                        <Input
                                                            type='text'
                                                            name='guest'
                                                            value={guest}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : option === 'card' ? (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Payment Collectors Name</Label>
                                                        <Input
                                                            type='text'
                                                            name='payment collector'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Reference Number</Label>
                                                        <Input
                                                            type='text'
                                                            name='ref number'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Guest</Label>
                                                        <Input
                                                            type='text'
                                                            name='guest'
                                                            value={guest}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : option === 'online' ? (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Payment Agent</Label>
                                                        <Select
                                                            menuPlacement='auto'
                                                            theme={selectThemeColors}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            options={agentOptions}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Guest</Label>
                                                        <Input
                                                            type='text'
                                                            name='guest'
                                                            value={guest}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Attending Staff</Label>
                                                        <Input
                                                            type='text'
                                                            name='staff name'
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Bill GST No.</Label>
                                                        <Input
                                                            type='text'
                                                            name='bill gst no.'
                                                        />
                                                    </Col>
                                                </Row>
                                                {/* <Row className='mb-1'>
                                                    <Col>
                                                        <Label>Guest</Label>
                                                        <Input
                                                            type='text'
                                                            name='guest'
                                                            value={guest}
                                                        />
                                                    </Col>
                                                </Row> */}
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                        <Row className='mt-1'>
                            <Col className='text-center'>
                                <Button color='success'>View Invoice</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default GuestDetailForm