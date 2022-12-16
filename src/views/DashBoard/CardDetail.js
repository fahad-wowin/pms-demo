import React, { useState } from 'react'
import { MoreVertical, Edit, Trash, ChevronDown } from 'react-feather'
import {
    Table, Badge, Card, CardTitle, CardText, CardBody, CardSubtitle, CardHeader, Row, Col, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Modal, ModalHeader, ModalBody,
    Button
} from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import DataTable from 'react-data-table-component'
import { PaymentData, PaymentColumn } from './Data'

const CardDetail = (props) => {
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')
    return (
        <>
            <div className='earnings-card' key={props.id} onClick={() => {
                setShow(!show)
                console.log('click')
            }}>
                <StatsHorizontal
                    color='primary'
                    statTitle={props.title}
                    icon={props.icon}
                    renderStats={<h3 className='fw-bolder mb-75'>{props.amount}</h3>}
                />
            </div>
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered'
                onClosed={() => setCardType('')}
                size='lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent border-bottom' toggle={() => setShow(!show)}>
                    <p>{props.title}</p>
                </ModalHeader>
                <ModalBody>
                    {cardType !== '' && cardType !== 'unknown' ? (
                        <InputGroupText className='p-25'>
                            <span className='add-card-type'>
                                <img height='24' alt='card-type' src={cardsObj[cardType]} />
                            </span>
                        </InputGroupText>
                    ) : null}
                    <div className='react-dataTable'>
                        <DataTable
                            noHeader
                            columns={PaymentColumn}
                            className='react-dataTable'
                            sortIcon={<ChevronDown size={10} />}
                            data={PaymentData}
                        />
                    </div>
                    <div className='my-50 d-flex justify-content-end'>
                        <Button color='primary' onClick={e => {
                            e.preventDefault()
                            setShow(!show)
                        }}>Close</Button>

                    </div>
                </ModalBody>
            </Modal>
            {
                show ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default CardDetail