import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { AiOutlinePlusSquare } from "react-icons/ai"
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Form, CardHeader } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import toast from 'react-hot-toast'
import AccountSetupModal from '../AccountSetup/AccountSetupModal'
const userRoles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Super Admin', label: 'Super Admin' }
]

const usersType = [
    { value: 'Employee1', label: 'Employee1' },
    { value: 'Employee2', label: 'Employee2' },
    { value: 'Employee3', label: 'Employee3' },
    { value: 'Employee4', label: 'Employee4' }
]

// let data
// axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//     data = response.data
// })

const User = () => {

    const [open, setOpen] = useState(false)

    const [show, setShow] = useState(false)
    const handleModal = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)

    const [selected_user, setSelected_user] = useState()

    const [del, setDel] = useState(false)

    const [users, setUsers] = useState([
        {
            id: '1',
            user: 'Employee1',
            userRole: 'abcdef',
            userId: 'abcdef',
            setPassword: 'abc123'
        }
    ])

    const NewUserModal = () => {

        const [user, setUser] = useState('')
        const [userRole, setUserRole] = useState('')
        const [userId, setUserId] = useState('')
        const [password, setPassword] = useState('')

        const [display, setDisplay] = useState(false)

        const userObj = {
            id: Math.floor(Math.random() * 100),
            user,
            userRole,
            userId,
            password
        }

        const handleSubmit = () => {
            setDisplay(true)
            if (user && userRole && userId && password !== '') {
                setUsers([...users, userObj])
                handleModal()
                toast.success('User Added!', { position: "top-center" })
            }
            // else {
            //     toast.error('Fill All Fields!', {
            //         position: "top-center",
            //         style: {
            //             minWidth: '250px'
            //         },
            //         duration: 3000
            //     })
            // }
        }

        return (
            <>
                <Modal
                    isOpen={show}
                    toggle={handleModal}
                    className='modal-dialog-centered modal-lg'
                    backdrop={false}
                >
                    <ModalHeader className='bg-transparent' toggle={handleModal}>
                        <span className=' mb-1'>Add User</span>
                    </ModalHeader>
                    <ModalBody className='px-sm-2 mx-50 pb-5'>
                        <>
                            <Form>
                                <Row>
                                    <Col md='6'>
                                        <Label className='form-label' for='user'>
                                            <span className='text-danger'>*</span>Users</Label>
                                        <AiOutlinePlusSquare className='ms-1' size={15} onClick={() => {
                                            setOpen(true)
                                        }}
                                        />
                                        <AccountSetupModal open={open} setOpen={setOpen} accounts={[]} setAccounts={[]} flag={1} />
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100 me-1'
                                            classNamePrefix='select'
                                            // defaultValue={users[0]}
                                            options={usersType}
                                            isClearable={false}
                                            onChange={e => setUser(e.value)}
                                            invalid={display ? user === '' : false}
                                        />
                                        {display === true && !user ? <span className='error_msg_lbl'>Please Select User </span> : <></>}
                                    </Col>
                                    <Col md='6' className='mb-1'>
                                        <Label className='form-label' for='userRole'>
                                            <span className='text-danger'>*</span>User Roles
                                        </Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100 me-1'
                                            classNamePrefix='select'
                                            // defaultValue={userRoles[0]}
                                            options={userRoles}
                                            isClearable={false}
                                            onChange={e => setUserRole(e.value)}
                                            invalid={display ? userRole === '' : false}
                                        />
                                        {display === true && !userRole ? <span className='error_msg_lbl'>Please Select User Role </span> : <></>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6' className='mb-1'>
                                        <Label className='form-label' for='userId'>
                                            <span className='text-danger'>*</span>UserId
                                        </Label>
                                        <Input type='text' name='userId' id='userId' value={userId} onChange={e => setUserId(e.target.value)} invalid={display ? userId === '' : false} />
                                        {display === true && !userId ? <span className='error_msg_lbl'>Enter User Id </span> : <></>}
                                    </Col>
                                    <Col md='6' className='mb-1'>
                                        <Label className='form-label' for='password'>
                                            <span className='text-danger'>*</span>Password
                                        </Label>
                                        <Input type='text' name='password' id='password' value={password} onChange={e => setPassword(e.target.value)} invalid={display ? password === '' : false} />
                                        {display === true && !password ? <span className='error_msg_lbl'>Enter Password </span> : <></>}
                                    </Col>
                                </Row>
                            </Form>
                            <Row tag='form' className='gy-1 gx-2 mt-75' >
                                <Col className='text-end mt-1' xs={12}>
                                    <Button className='me-1' color='primary' onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <Button
                                        color='secondary'
                                        outline
                                        onClick={() => {
                                            setShow(!show)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    </ModalBody>
                </Modal >
                {
                    show ? (
                        <div class="modal-backdrop fade show" ></div>
                    ) : null
                }
            </>
        )
    }

    const EditUserModal = ({ id }) => {

        const userData = users.filter(user => user.id === id)

        const [editUser, setEditUser] = useState(userData[0]?.user)
        const [editUserRole, setEditUserRole] = useState(userData[0]?.userRole)
        const [editUserId, setEditUserId] = useState(userData[0]?.userId)
        const [editPassword, setEditPassword] = useState(userData[0]?.password)
        console.log(editUserRole)

        const [editDisplay, setEditDisplay] = useState(false)

        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editUser && editUserRole && editUserId && editPassword !== '') {
                users.map(user => {
                    if (user.id === id) {
                        user.user = editUser
                        user.userRole = editUserRole
                        user.userId = editUserId
                        user.password = editPassword
                    }
                })
                handleEditModal()
                toast.success('User Edited Succesfully!', { position: "top-center" })
            }
            // else {
            //     toast.error('Fill All Fields!', {
            //         position: "top-center",
            //         style: {
            //             minWidth: '250px'
            //         },
            //         duration: 3000
            //     })
            // }
        }

        return (
            <>
                <Modal
                    isOpen={showEdit}
                    toggle={handleEditModal}
                    className='modal-dialog-centered modal-lg'
                    backdrop={false}
                >
                    <ModalHeader className='bg-transparent' toggle={handleEditModal}>
                        <span className=' mb-1'>Edit User</span>
                    </ModalHeader>
                    <ModalBody className='px-sm-2 mx-50 pb-5'>
                        <>
                            <Form>
                                <Row>
                                    <Col md='6'>
                                        <Label className='form-label' for='user'>
                                            <span className='text-danger'>*</span>Users</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100 me-1'
                                            classNamePrefix='select'
                                            // defaultValue={users[0]}
                                            options={usersType}
                                            isClearable={false}
                                            onChange={e => setEditUser(e.value)}
                                            invalid={editDisplay ? editUser === '' : false}
                                        />
                                        {editDisplay === true && !editUser ? <span className='error_msg_lbl'>Please Select User </span> : <></>}
                                    </Col>
                                    <Col md='6' className='mb-1'>
                                        <Label className='form-label' for='userRole'>
                                            <span className='text-danger'>*</span>User Roles
                                        </Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100 me-1'
                                            classNamePrefix='select'
                                            // defaultValue={userRoles[0]}
                                            options={userRoles}
                                            isClearable={false}
                                            onChange={e => setEditUserRole(e.value)}
                                            invalid={editDisplay ? editUserRole === '' : false}
                                        />
                                        {editDisplay === true && !editUserRole ? <span className='error_msg_lbl'>Please Select User Role </span> : <></>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6' className='mb-1'>
                                        <Label className='form-label' for='userId'>
                                            <span className='text-danger'>*</span>UserId
                                        </Label>
                                        <Input type='text' name='userId' id='userId' value={editUserId} onChange={e => setEditUserId(e.target.value)} invalid={editDisplay ? editUserId === '' : false} />
                                        {editDisplay === true && !editUserId ? <span className='error_msg_lbl'>Enter User Id </span> : <></>}
                                    </Col>
                                    <Col md='6' className='mb-1'>
                                        <Label className='form-label' for='password'>
                                            <span className='text-danger'>*</span>Password
                                        </Label>
                                        <Input type='text' name='password' id='password' value={editPassword} onChange={e => setEditPassword(e.target.value)} invalid={editDisplay ? editPassword === '' : false} />
                                        {editDisplay === true && !editPassword ? <span className='error_msg_lbl'>Enter Password </span> : <></>}
                                    </Col>
                                </Row>
                            </Form>
                            <Row tag='form' className='gy-1 gx-2 mt-75' >
                                <Col className='text-end mt-1' xs={12}>
                                    <Button className='me-1' color='primary' onClick={editHandleSubmit}>
                                        Submit
                                    </Button>
                                    <Button
                                        color='secondary'
                                        outline
                                        onClick={handleEditModal}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    </ModalBody>
                </Modal>{
                    showEdit ? (
                        <div class="modal-backdrop fade show" ></div>
                    ) : null
                }
            </>
        )
    }

    const DeleteUserModal = ({ id }) => {

        const data = users.filter(user => user.id === id)

        const handleDeleteUser = () => {
            setUsers(users.filter(user => user.id !== id))
            setDel(!del)
        }

        return (
            <>
                <Modal
                    isOpen={del}
                    toggle={() => setDel(!del)}
                    className='modal-dialog-centered'
                    backdrop={false}
                >
                    <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
                        Are you sure to delete  {data[0]?.employee} permanently?
                    </ModalHeader>
                    <ModalBody>
                        <Row className='text-center'>
                            <Col xs={12}>
                                <Button color='danger' className='m-1' onClick={handleDeleteUser}>
                                    Delete
                                </Button>
                                <Button className='m-1' color='secondary' outline onClick={() => setDel(!del)}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>{
                    del ? (
                        <div class="modal-backdrop fade show" ></div>
                    ) : null
                }
            </>
        )
    }

    const userTable = [
        {
            name: '#',
            width: '60px',
            sortable: true,
            selector: row => row.id
        },
        {
            name: "Users",
            sortable: true,
            selector: row => row.user
        },
        {
            name: "User Roles",
            sortable: true,
            selector: row => row.userRole
        },
        {
            name: "UserId",
            selector: row => row.userId
        },
        {
            name: 'Action',
            sortable: true,
            center: true,
            selector: row => (
                <>
                    <Col>
                        <Edit className='me-50 pe-auto' onClick={() => {
                            setShowEdit(true)
                            setSelected_user(row.id)
                        }} size={15} />
                        <Trash className='me-50' size={15} onClick={() => {
                            setDel(true)
                            setSelected_user(row.id)
                        }} />
                    </Col>
                    <EditUserModal id={selected_user} />
                    <DeleteUserModal id={selected_user} />

                </>
            )
        }
    ]
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        User
                    </CardTitle>
                    <Button color='primary' onClick={() => setShow(true)}>Add User</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={users}
                                columns={userTable}
                                className='react-dataTable'
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            {/* <Row>
                <Col md='12' className='mb-1'>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                User
                            </CardTitle>
                            <Button color='primary' onClick={() => setShow(true)}>Add User</Button>
                            <CardText>
                                <DataTable
                                    noHeader
                                    data={users}
                                    columns={userTable}
                                    className='react-dataTable'
                                />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            <NewUserModal />
            <EditUserModal />
            <DeleteUserModal />

        </>
    )
}

export default User