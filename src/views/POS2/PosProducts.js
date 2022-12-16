import React, { useState } from 'react'
import { ChevronDown, ChevronLeft, Edit, Plus, PlusCircle, Trash2 } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import CreatableSelect from 'react-select/creatable'
import DataTable from 'react-data-table-component'

const productOptions = [
    { value: 'eggs', label: 'Eggs', category: 'breakfast' },
    { value: 'coffee', label: 'Coffee', category: 'breakfast' },
    { value: 'rice', label: 'Rice', category: 'lunch' },
    { value: 'chicken', label: 'Chicken', category: 'lunch' },
    { value: 'fish', label: 'Fish', category: 'dinner' }
]

const unitOptions = [
    { value: 'bottle', label: 'Bottle' },
    { value: 'bowl', label: 'Bowl' },
    { value: 'cup', label: 'Cup' }
]

const categoryOptions = [
    { value: 'b/f', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
]

const statusOptions = [
    { value: true, label: 'Available' },
    { value: false, label: 'Out-of-Stock' }
]

const PosProducts = () => {

    const navigate = useNavigate()

    const { name } = useParams()

    const [updatePr, setUpdatePr] = useState(false)
    const handleUpdatePr = () => setUpdatePr(!updatePr)

    const UpdateProductTable = ({ open, handleUpdatePr, data }) => {

        const [up_pr_name, setUp_Pr_name] = useState(data.name)
        const [up_pr_price, setUp_Pr_price] = useState('')
        const [up_pr_per, setUp_Pr_per] = useState('')
        const [up_pr_qty, setUp_Pr_qty] = useState('')
        const [up_pr_descp, setUp_Pr_descp] = useState('')
        const [up_pr_cat, setUp_Pr_cat] = useState('')
        const [up_pr_status, setUp_Pr_Status] = useState('')
        console.log(up_pr_per, up_pr_cat, up_pr_status)

        return (
            <>
                <Modal isOpen={open} toggle={handleUpdatePr} className='modal-dialog-centerd modal-lg' backdrop={false}>
                    <ModalHeader toggle={handleUpdatePr}>Update Product</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <Row className='mb-1'>
                                <Col>
                                    <Label className='fw-bold fs-5'>Name<span className='text-danger'>*</span></Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter category name'
                                        value={up_pr_name}
                                        onChange={e => setUp_Pr_name(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Label className='fw-bold fs-5'>Price<span className='text-danger'>*</span></Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter category name'
                                        value={up_pr_price}
                                        onChange={e => setUp_Pr_price(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Label className='fw-bold fs-5'>Per</Label>
                                    <Select
                                        placeholder='Select unit'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={unitOptions}
                                        onChange={e => setUp_Pr_per(e.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Label className='fw-bold fs-5'>Quantity</Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter category name'
                                        value={up_pr_qty}
                                        onChange={e => setUp_Pr_qty(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Label className='fw-bold fs-5'>Description</Label>
                                    <Input
                                        type='text'
                                        name='descp'
                                        placeholder='Enter description'
                                        value={up_pr_descp}
                                        onChange={e => setUp_Pr_descp(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Label className='fw-bold fs-5'>Category</Label>
                                    <Select
                                        placeholder='Select unit'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={categoryOptions}
                                        onChange={e => setUp_Pr_cat(e.value)}
                                    />
                                </Col>
                                <Col>
                                    <Label className='fw-bold fs-5'>Status</Label>
                                    <Select
                                        placeholder=''
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={statusOptions}
                                        onChange={e => setUp_Pr_Status(e.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button color='primary'>Update Product</Button>
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

    const product_data = [
        {
            id: '1',
            product_name: 'Eggs',
            category_name: 'breakfast',
            status: true
            //available: 10
        }
    ]
    const productColumns = [
        {
            name: '#',
            sortable: true,
            selector: row => row.id
        },
        {
            name: 'Product',
            sortable: true,
            selector: row => row.product_name
        },
        {
            name: 'Category',
            sortable: true,
            selector: row => row.category_name
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
                                    Available
                                </Badge>
                            ) : (
                                <Badge color='light-danger'>
                                    Out-of-Stock
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
                            <Trash2 className='me-1 cursor-pointer' size={20} onClick={() => console.log(row.status)} />
                            <Edit className='ms-1 cursor-pointer' size={20} onClick={handleUpdatePr} />
                        </Col>
                        <UpdateProductTable open={updatePr} handleUpdatePr={handleUpdatePr} data={row} />
                    </>
                )
            }
        }
    ]

    const [catOpen, setCatOpen] = useState(false)
    const handleCatOpen = () => setCatOpen(!catOpen)

    const CatModal = ({ open, handleCatOpen }) => {

        const catData = [
            {
                id: '1',
                category_name: 'breakfast',
                category_description: '5 to 10 am only'
            }
        ]

        const catColumns = [
            {
                name: '#',
                selector: row => row.id
            },
            {
                name: 'Category Name',
                selector: row => row.category_name
            },
            {
                name: 'Description',
                selector: row => row.category_description
            },
            {
                name: 'Action',
                right: true,
                selector: row => {
                    return (
                        <>
                            <Row>
                                <Col>
                                    <Trash2 size={20} onClick={() => console.log(row.name)} />
                                </Col>
                            </Row>
                        </>
                    )
                }
            }
        ]

        const [cat_data, setCatData] = useState(catData)
        const [cat_name, setCat_name] = useState('')
        const [cat_descp, setCat_descp] = useState('')

        const handleAddCat = (e) => {
            e.preventDefault()
            if (cat_name !== '') {
                const obj = {
                    id: Math.floor(Math.random() * 10),
                    category_name: cat_name,
                    category_description: cat_descp
                }
                setCatData([...cat_data, obj])
            }
        }

        return (
            <>
                <Modal isOpen={open} toggle={handleCatOpen} className='modal-dialog-centerd modal-lg' backdrop={false}>
                    <ModalHeader toggle={handleCatOpen}>Categories</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row className='mb-1'>
                                <Col>
                                    <Label>Name<span className='text-danger'>*</span></Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter category name'
                                        value={cat_name}
                                        onChange={e => setCat_name(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Label>Description</Label>
                                    <Input
                                        type='text'
                                        name='descp'
                                        placeholder='Enter description'
                                        value={cat_descp}
                                        onChange={e => setCat_descp(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button color='primary' onClick={e => handleAddCat(e)}>Add Category</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Col className='react-dataTable'>
                                <DataTable
                                    noHeader
                                    pagination
                                    data={cat_data}
                                    columns={catColumns}
                                    className='react-dataTable'
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                />
                            </Col>
                        </Row>
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

    const [prOpen, setPrOpen] = useState(false)
    const handlePrOpen = () => setPrOpen(!prOpen)

    const PrModal = ({ open, handlePrOpen }) => {

        const [createNew, setCreateNew] = useState(false)
        const [pr_name, setPr_name] = useState('')
        const [pr_price, setPr_price] = useState('')
        const [pr_per, setPr_per] = useState('')
        const [pr_qty, setPr_qty] = useState('')
        const [pr_descp, setPr_descp] = useState('')
        const [pr_cat, setPr_cat] = useState('')
        console.log(pr_per, pr_cat, pr_name)

        return (
            <>
                <Modal isOpen={open} toggle={handlePrOpen} className='modal-dialog-centerd modal-lg' backdrop={false}>
                    <ModalHeader toggle={handlePrOpen}>Products</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row className='mb-1'>
                                <Col>
                                    <Label>Select Product<span className='text-danger'>*</span></Label>
                                    <CreatableSelect
                                        placeholder=''
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={productOptions}
                                        formatCreateLabel={userInput => {
                                            setPr_name(userInput)
                                            return `Create new Product '${userInput}'`
                                        }}
                                        onCreateOption={() => setCreateNew(true)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label>Name<span className='text-danger'>*</span></Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter new product name here'
                                        value={pr_name}
                                        onChange={e => setPr_name(e.target.value)}
                                        disabled={!createNew}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Label>Price<span className='text-danger'>*</span></Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter category name'
                                        value={pr_price}
                                        onChange={e => setPr_price(e.target.value)}
                                        disabled={createNew === false}
                                    />
                                </Col>
                                <Col>
                                    <Label>Per</Label>
                                    <Select
                                        placeholder='Select unit'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={unitOptions}
                                        onChange={e => setPr_per(e.value)}
                                        isDisabled={createNew === false}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col>
                                    <Label>Quantity</Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='Enter category name'
                                        value={pr_qty}
                                        onChange={e => setPr_qty(e.target.value)}
                                        disabled={createNew === false}
                                    />
                                </Col>
                                <Col>
                                    <Label>Description</Label>
                                    <Input
                                        type='text'
                                        name='descp'
                                        placeholder='Enter description'
                                        value={pr_descp}
                                        onChange={e => setPr_descp(e.target.value)}
                                        disabled={createNew === false}
                                    />
                                </Col>
                                <Col>
                                    <Label>Category</Label>
                                    <Select
                                        placeholder='Select unit'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={categoryOptions}
                                        onChange={e => setPr_cat(e.value)}
                                        isDisabled={createNew === false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button color='primary' onClick={() => {
                                        productOptions.push({ value: `${pr_name}`, label: `${pr_name}` })
                                        handlePrOpen()
                                    }}>Add Product</Button>
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

    const [listOpen, setListOpen] = useState(false)
    const handleListOpen = () => setListOpen(!listOpen)

    const ProductList = ({ open, handleListOpen }) => {

        const globalPrColumns = [
            {
                name: '#',
                sortable: true,
                selector: row => row.id
            },
            {
                name: 'Product',
                sortable: true,
                selector: row => row.product_name
            },
            {
                name: 'Category',
                sortable: true,
                selector: row => row.category_name
            }
        ]

        return (
            <>
                <Modal isOpen={open} toggle={handleListOpen} className='modal-dialog-centerd modal-lg' backdrop={false}>
                    <ModalHeader toggle={handleListOpen}>Available Products</ModalHeader>
                    <ModalBody>
                        <Row className='mb-1'>
                            <Col>
                                {/* <Select
                                    isClearable
                                    isMulti
                                    placeholder='Select products you want to add..'
                                    menuPlacement='auto'
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={productOptions}
                                /> */}
                                <DataTable
                                    noHeader
                                    pagination
                                    data={product_data}
                                    columns={globalPrColumns}
                                    className='react-dataTable'
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col className='text-center'>
                                <Button color='success' onClick={handleListOpen}>Add Products</Button>
                            </Col>
                        </Row> */}
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

    return (
        <>
            <div className='d-flex'>
                <Button className='mb-1 ' size='sm' color='primary' onClick={() => navigate(-1)}><ChevronLeft size={25} color='#FFF' /></Button>
                <span className='fs-3 mx-auto'>{name} - POS Products</span>
            </div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader className='d-flex flex-row flex-wrap justify-content-around align-items-center'>
                            <Button color='primary' onClick={handleCatOpen}><PlusCircle className='mx-1' size={15} />Add/View Category</Button>
                            <Button color='primary' onClick={handlePrOpen}><PlusCircle className='mx-1' size={15} />Add New Product</Button>
                            <Button color='primary' onClick={handleListOpen}><PlusCircle className='mx-1' size={15} />Product List</Button>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <CardTitle>POS Products added for {name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className='react-dataTable'>
                                    <DataTable
                                        noHeader
                                        pagination
                                        data={product_data}
                                        columns={productColumns}
                                        className='react-dataTable'
                                        sortIcon={<ChevronDown size={10} />}
                                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <CatModal open={catOpen} handleCatOpen={handleCatOpen} />
            <PrModal open={prOpen} handlePrOpen={handlePrOpen} />
            <ProductList open={listOpen} handleListOpen={handleListOpen} />
        </>
    )
}

export default PosProducts