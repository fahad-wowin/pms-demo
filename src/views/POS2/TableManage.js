import React, { useState } from 'react'
import { ChevronDown, ChevronLeft, Edit, Trash2 } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import DataTable from 'react-data-table-component'

const statusOptions = [
    { value: true, label: 'ACTIVE' },
    { value: false, label: 'INACTIVE' }
]

const TableManage = () => {
    const navigate = useNavigate()

    const { name } = useParams()

    const [submit, setSubmit] = useState(false)
    const [tname, setTname] = useState('')
    const [tdesc, setTdesc] = useState('')

    const [tdata, setTdata] = useState([])

    const [sel_id, setSel_id] = useState()

    const tobj = {
        id: Math.floor(Math.random() * 100),
        tname,
        tdesc,
        status: true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (tname !== '') {
            setTdata([...tdata, tobj])
            setTname('')
            setTdesc('')
            setSubmit(false)
        }
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)

    const [delOpen, setDelOpen] = useState(false)
    const handleDeleteModal = () => setDelOpen(!delOpen)

    const UpdateTable = ({ open, handleOpen, id }) => {

        const data = tdata.filter(table => table.id === id)

        const [newName, setNewName] = useState(data[0]?.tname)
        const [newDesc, setNewDesc] = useState(data[0]?.tdesc)
        const [newStatus, setNewStatus] = useState(data[0]?.status)
        const [editSubmit, setEditSubmit] = useState(false)

        const updateData = () => {
            setEditSubmit(!editSubmit)
            if (newName !== '') {
                tdata.map(obj => {
                    if (obj.id === id) {
                        obj.tname = newName
                        obj.tdesc = newDesc
                        if (newStatus === true) {
                            obj.status = true
                        } else {
                            obj.status = false
                        }
                    }
                })
                handleOpen()
                setEditSubmit(!editSubmit)
            }
        }

        return (
            <>
                <Modal isOpen={open} toggle={handleOpen} backdrop={false}>
                    <ModalHeader toggle={handleOpen}>
                        Update Table Info
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row className='mb-1'>
                                <Col>
                                    <Label className='fw-bold fs-5'>Table Name<span className='text-danger'>*</span></Label>
                                    <Input
                                        type='text'
                                        name='table name'
                                        placeholder='Table name'
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        invalid={editSubmit && tname === ''}
                                    />
                                    {editSubmit && tname === '' && <FormFeedback>Table Name is required</FormFeedback>}
                                </Col>
                                <Col>
                                    <Label className='fw-bold fs-5'>Description</Label>
                                    <Input
                                        type='text'
                                        name='description'
                                        placeholder='Enter Description'
                                        value={newDesc}
                                        onChange={e => setNewDesc(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Label className='fw-bold fs-5'>Select Status</Label>
                                    <Select
                                        placeholder=''
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={statusOptions}
                                        onChange={e => setNewStatus(e.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button color='primary' onClick={e => updateData(e)}>Update TABLE</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
                {
                    open ? (
                        <div class="modal-backdrop fade show" ></div>
                    ) : null
                }
            </>
        )
    }

    const DeleteModal = ({ id }) => {

        const data = tdata.filter(table => table.id === id)

        const handleDelete = () => {
            setTdata(tdata.filter(table => table.id !== id))
            handleDeleteModal()
        }

        return (
            <>
                <Modal isOpen={delOpen} toggle={handleDeleteModal} backdrop={false}>
                    <ModalHeader toggle={handleDeleteModal}></ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col className='text-center'>
                                <h5>Are you sure you want to Delete {data[0]?.tname}?</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center'>
                                <Button className='mx-1' color='danger' onClick={handleDelete}>Delete</Button>
                                <Button className='mx-1' color='success' outline onClick={handleDeleteModal}>Cancel</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
                {
                    delOpen ? (
                        <div class="modal-backdrop fade show" ></div>
                    ) : null
                }
            </>
        )
    }

    const tableColumns = [
        {
            name: '#',
            width: '50px',
            sortable: true,
            selector: row => row.id
        },
        {
            name: 'Table Name',
            sortable: true,
            selector: row => row.tname
        },
        {
            name: 'POS Point',
            sortable: true,
            selector: row => {
                return (
                    <Col>{name}, {row.tname}</Col>
                )
            }
        },
        {
            name: 'Status',
            sortable: true,
            selector: row => {
                return (
                    <>
                        {
                            row.status ? (
                                <Badge color='light-success'>
                                    ACTIVE
                                </Badge>
                            ) : (
                                <Badge color='light-danger'>
                                    INACTIVE
                                </Badge>
                            )
                        }
                    </>
                )
            }
        },
        {
            name: 'Actions',
            sortable: true,
            center: true,
            selector: row => {
                return (
                    <>
                        <Col>
                            <Trash2 className='me-1 cursor-pointer' size={20} onClick={() => {
                                handleDeleteModal()
                                setSel_id(row.id)
                            }} />
                            <Edit className='ms-1 cursor-pointer' size={20} onClick={() => {
                                handleOpen()
                                setSel_id(row.id)
                            }}
                            />
                        </Col>
                        <UpdateTable open={open} handleOpen={handleOpen} id={sel_id} />
                        <DeleteModal open={delOpen} handleOpen={handleDeleteModal} id={sel_id} />
                    </>
                )
            }
        }
    ]


    return (
        <>
            <div className='d-flex'>
                <Button className='mb-1 ' size='sm' color='primary' onClick={() => navigate(-1)}><ChevronLeft size={25} color='#FFF' /></Button>
                <span className='fs-3 mx-auto'>{name} - POS Manage Tables</span>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Add POS Table for {name}</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Table Name<span className='text-danger'>*</span></Label>
                                <Input
                                    type='text'
                                    name='table name'
                                    placeholder='Table name'
                                    value={tname}
                                    onChange={e => setTname(e.target.value)}
                                    invalid={submit && tname === ''}
                                />
                                {submit && tname === '' && <FormFeedback>Table Name is required</FormFeedback>}
                            </Col>
                            <Col>
                                <Label>Description</Label>
                                <Input
                                    type='text'
                                    name='description'
                                    placeholder='Enter Description'
                                    value={tdesc}
                                    onChange={e => setTdesc(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center'>
                                <Button color='primary' onClick={e => handleSubmit(e)}>CREATE TABLE</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>POS Table added for {name}</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col className='react-dataTable'>
                            <DataTable
                                noHeader
                                pagination
                                data={tdata}
                                columns={tableColumns}
                                className='react-dataTable'
                                sortIcon={<ChevronDown size={10} />}
                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default TableManage