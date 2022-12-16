import { React, useState } from 'react'
import { Row, Col, Button, Card, CardHeader, CardTitle, CardBody, Label, Input, Modal, ModalBody, ModalHeader, Form, FormFeedback, Badge } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Trash, Trash2 } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
// ** Styles
import '@styles/react/libs/editor/editor.scss'

const AddLaundry = () => {

  const [userData, setUserData] = useState([
    {
      id: 1,
      gender: 'Male',
      washing_rate: 500,
      pressing_rate: 200,
      drycleaning_rate: 300,
      user_name: 'alam',
      cloth_name: 'jacket'
    },
    {
      id: 2,
      gender: 'Female',
      washing_rate: 500,
      pressing_rate: 200,
      drycleaning_rate: 300,
      user_name: 'taha',
      cloth_name: 'shirt'
    }
  ])
  const [sel_id, setSel_id] = useState()
  const [laundryModal, setLaundryModal] = useState(false)
  const handleUserModal = () => setLaundryModal(!laundryModal)
  const [updateLaundry, setupdateLaundry] = useState(false)
  const handleUpdateLaundry = () => setupdateLaundry(!updateLaundry)

  const [delUser, setDelUser] = useState(false)
  const handleDeleteUser = () => setDelUser(!delUser)

  const NewLaundryModal = ({ open, handleUserModal }) => {
    const genderOptions = [
      { value: '', label: 'Select Gender' },
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ]

    const [newGender, setNewGender] = useState('Male')
    const [submit, setSubmit] = useState(false)
    const [clothesName, setClothesName] = useState("")
    const [washingRate, setWashingRate] = useState('')
    const [dryCleaningRate, setDryCleaningRate] = useState('')
    const [pressingRate, setPressingRate] = useState('')

    const userObj = {
      id: Math.floor(Math.random() * 100),
      gender: newGender,
      washing_rate: washingRate,
      drycleaning_rate: dryCleaningRate,
      pressing_rate: pressingRate,
      cloth_name: clothesName,
      status: true
    }

    const handleNewUser = (e) => {
      e.preventDefault()
      setSubmit(true)
      if (newGender !== '' && clothesName !== '' && washingRate !== '' && dryCleaningRate !== '' && pressingRate !== '') {
        setUserData([...userData, userObj])
        handleUserModal()
        setSubmit(false)
      }
    }

    return (
      <>
        <Modal isOpen={open} toggle={handleUserModal} className='modal-dialog-centered modal-lg' backdrop={false}>
          <ModalHeader toggle={handleUserModal}>
            Add new Laundry
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={e => handleNewUser(e)}>
              <Row className='mb-1'>
                <Col sm='6' className='mb-1'>
                  <Label className='form-label' for='nameVertical'>
                    Select Gender :
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select w-100'
                    classNamePrefix='select'
                    defaultValue={genderOptions[0]}
                    options={genderOptions}
                    isClearable={false}
                    onChange={(e) => setNewGender(e.value)}
                  />
                </Col>
                <Col sm={6} className='mb-1'>
                  <Label className='form-label'>Cloth Name :</Label>
                  <Input
                    type='text'
                    name='Cloth Name'
                    placeholder='Enter Cloth Name'
                    value={clothesName}
                    onChange={e => setClothesName(e.target.value)}
                    invalid={submit && clothesName === ''}
                  />
                  {submit && clothesName === '' && <FormFeedback>Cloth Name is required</FormFeedback>}
                </Col>
                <Col sm={4} className='mb-1'>
                  <Label className='form-label'>Washing Rate :</Label>
                  <Input
                    type='number'
                    name='WashingRate'
                    placeholder='Enter Washing Rate'
                    value={washingRate}
                    onChange={e => setWashingRate(e.target.value)}
                    invalid={submit && washingRate === ''}
                  />
                  {submit && washingRate === '' && <FormFeedback>Washing Rate is require</FormFeedback>}
                </Col>
                <Col sm={4} className='mb-1'>
                  <Label className='form-label'>Dry Cleaning Rate :</Label>
                  <Input
                    type='number'
                    name='DryCleaningRate'
                    placeholder='Enter Cleaning Rate'
                    value={dryCleaningRate}
                    onChange={e => setDryCleaningRate(e.target.value)}
                    invalid={submit && dryCleaningRate === ''}
                  />
                  {submit && dryCleaningRate === '' && <FormFeedback>Dry Cleaning Rate is required</FormFeedback>}
                </Col>
                <Col sm={4} className='mb-1'>
                  <Label className='form-label'>Pressing Rate :</Label>
                  <Input
                    type='number'
                    name='PressingRate'
                    placeholder='Enter Pressing Rate'
                    value={pressingRate}
                    onChange={e => setPressingRate(e.target.value)}
                    invalid={submit && pressingRate === ''}
                  />
                  {submit && pressingRate === '' && <FormFeedback>Pressing Rate is required</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Col className='text-center'>
                  <Button color='primary' type='submit'>Create Laundry</Button>
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
  // edit laundry
  const UpdateLaundry = ({ open, handleUpdateLaundry, id }) => {

    const updgenderOptions = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ]
    const data = userData.filter(user => user.id === id)

    const [updateGender, setUpdateGender] = useState(data[0]?.gender)
    const [updateCloth, setUpdateCloth] = useState(data[0]?.cloth_name)
    const [updWashRate, setUpdWashRate] = useState(data[0]?.washing_rate)
    const [updPressingRate, setUpdPrissingRate] = useState(data[0]?.pressing_rate)
    const [updDryClean, setUpdDryClean] = useState(data[0]?.drycleaning_rate)
    const [editSubmit, setEditSubmit] = useState(false)

    const updateLaundry = (e) => {
      e.preventDefault()
      setEditSubmit(true)
      if (updateGender !== '' || updateCloth.trim() !== '') {
        userData.map(obj => {
          if (obj.id === id) {
            obj.gender = updateGender
            obj.washing_rate = updWashRate
            obj.pressing_rate = updPressingRate
            obj.drycleaning_rate = updDryClean
            obj.cloth_name = updateCloth
          }
        })
        setEditSubmit(false)
        handleUpdateLaundry()
      }
    }

    return (
      <>
        <Modal isOpen={open} toggle={handleUpdateLaundry} className='modal-dialog-centered modal-lg' backdrop={false}>
          <ModalHeader toggle={handleUpdateLaundry}>
            Edit Laundry
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row className='mb-1'>
                <Col sm='6' className='mb-1'>
                  <Label className='form-label' for='nameVertical'>
                    Select Gender :
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select w-100'
                    classNamePrefix='select'
                    defaultValue={updgenderOptions.filter(opt => opt.value === updateGender)}
                    options={updgenderOptions}
                    isClearable={false}
                    onChange={(e) => setUpdateGender(e.value)}
                  />
                  {editSubmit && updateGender === '' && <FormFeedback>Gender is required</FormFeedback>}
                </Col>
                <Col sm={6} className='mb-1'>
                  <Label className='form-label'>Cloth Name :</Label>
                  <Input
                    type='text'
                    name='ClothName'
                    placeholder='Enter Cloth Name'
                    value={updateCloth}
                    onChange={e => setUpdateCloth(e.target.value)}
                    invalid={editSubmit && updateCloth === ''}
                  />
                  {editSubmit && updateCloth === '' && <FormFeedback>Cloth Name Required</FormFeedback>}
                </Col>
                <Col sm={4} className='mb-1'>
                  <Label className='form-label'>Washing Rate :</Label>
                  <Input
                    type='text'
                    name='WashingRate'
                    placeholder='Enter Washing Rate'
                    value={updWashRate}
                    onChange={e => setUpdWashRate(e.target.value)}
                    invalid={editSubmit && updWashRate === ''}
                  />
                  {editSubmit && updWashRate === '' && <FormFeedback>update washing rate</FormFeedback>}
                </Col>
                <Col sm={4} className='mb-1'>
                  <Label className='form-label'>Dry Cleaning Rate :</Label>
                  <Input
                    type='text'
                    name='DryCleaningRate'
                    placeholder='Enter Dry Cleaning Rate'
                    value={updDryClean}
                    onChange={e => setUpdDryClean(e.target.value)}
                    invalid={editSubmit && updDryClean === ''}
                  />
                  {editSubmit && updDryClean === '' && <FormFeedback>update Dry Cleaning rate</FormFeedback>}
                </Col>
                <Col sm={4} className='mb-1'>
                  <Label className='form-label'>Pressing Rate :</Label>
                  <Input
                    type='text'
                    name='PressingRate'
                    placeholder='Enter Pressing Rate'
                    value={updPressingRate}
                    onChange={e => setUpdPrissingRate(e.target.value)}
                    invalid={editSubmit && updPressingRate === ''}
                  />
                  {editSubmit && updPressingRate === '' && <FormFeedback>update Pressing rate</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Col className='text-center'>
                  <Button color='primary' onClick={e => updateLaundry(e)}>Update</Button>
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

  const DeleteUser = ({ open, handleDeleteUser, id }) => {
    const data = userData.filter(user => user.id === id)

    const handleDelete = () => {
      setUserData(userData.filter(user => user.id !== id))
      handleDeleteUser()
    }

    return (
      <>
        <Modal isOpen={open} toggle={handleDeleteUser} className='modal-dialog-centered' backdrop={false}>
          <ModalHeader toggle={handleDeleteUser}></ModalHeader>
          <ModalBody>
            <Row>
              <Col className='text-center'>
                <h5>Are you sure you want to Delete {data[0]?.tname}?</h5>
              </Col>
            </Row>
            <Row>
              <Col className='text-center'>
                <Button className='mx-1' color='danger' onClick={handleDelete}>Delete</Button>
                <Button className='mx-1' color='secondary' outline onClick={handleDeleteUser}>Cancel</Button>
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

  const UsersColumns = [
    {
      name: 'ID',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Gender',
      sortable: true,
      selector: row => row.gender
    },
    {
      name: 'Cloth Name',
      minWidth: '150px',
      sortable: true,
      selector: row => row.cloth_name
    },
    {
      name: 'Washing Rate',
      minWidth: '150px',
      sortable: true,
      selector: row => row.washing_rate
    },
    {
      name: 'Dry Cleaning Rate',
      minWidth: '170px',
      sortable: true,
      selector: row => row.drycleaning_rate
    },
    {
      name: 'Pressing Rate',
      minWidth: '150px',
      sortable: true,
      selector: row => row.pressing_rate
    },
    {
      name: 'Actions',
      sortable: true,
      minWidth: '150px',
      center: true,
      selector: row => {
        return (
          <>
            <Col>
              <Trash2 className='mx-1' size={20} onClick={() => {
                handleDeleteUser()
                setSel_id(row.id)
              }} />
              <Edit className='mx-1' size={20} onClick={() => {
                handleUpdateLaundry()
                setSel_id(row.id)
              }}
              />
            </Col>

          </>
        )
      }
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Laundry</CardTitle>
          <Button color='primary' onClick={handleUserModal}>Add Laundry Master</Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <DataTable
                noHeader
                pagination
                data={userData}
                columns={UsersColumns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {laundryModal ? <NewLaundryModal open={laundryModal} handleUserModal={handleUserModal} /> : <></>}
      {updateLaundry ? <UpdateLaundry open={updateLaundry} handleUpdateLaundry={handleUpdateLaundry} id={sel_id} /> : <></>}
      {delUser ? <DeleteUser open={delUser} handleDeleteUser={handleDeleteUser} id={sel_id} /> : <></>}

    </>
  )
}

export default AddLaundry