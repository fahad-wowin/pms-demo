import React, { useState } from 'react'
import {
  Badge, Card, CardTitle, CardBody, CardHeader, Row, Col, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Modal, ModalHeader, ModalBody,
  Button
} from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, MoreVertical, Edit, FileText, Archive, Trash, Eye, EyeOff } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const roomCategory = [
  { value: '', label: 'All Rooms' },
  { value: 'executive', label: 'Executive Suite Room' },
  { value: 'swiss', label: 'Swiss Tent' },
  { value: 'mixed', label: 'Mixed Dorm' },
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'superior', label: 'Superior Room' }
]
const cleanStatus = [
  { value: '', label: 'All' },
  { value: 'dirty', label: 'Dirty' },
  { value: 'clean', label: 'Clean' }
]
const repairStatus = [
  { value: '', label: 'All' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
]
const roomStatus = [
  { value: '', label: 'All' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'vacant', label: 'Vacant / Empty' }
]
const Status = () => {
  const [data, setData] = useState([
    {
      id: 1,
      room_no: '504',
      room_category: 'Executive Suite Room',
      repair_require: 'yes',
      cleaning_status: 'dirty',
      close_dueto_maintains: 'no',
      salary: 10000,
      room_status: 'vacant/empty',
      start_date: '08/25/2022',
      status: 'confirm'
    },
    {
      id: 2,
      room_no: '504',
      room_category: 'Executive Suite Room',
      repair_require: 'no',
      cleaning_status: 'dirty',
      close_dueto_maintains: 'no',
      salary: 10000,
      room_status: 'vacant/empty',
      start_date: '08/25/2022',
      status: 'confirm'
    },
    {
      id: 3,
      room_no: '504',
      room_category: 'Executive Suite Room',
      repair_require: 'no',
      cleaning_status: 'dirty',
      close_dueto_maintains: 'yes',
      salary: 10000,
      room_status: 'occupied',
      start_date: '08/25/2022',
      status: 'confirm'
    }
  ])
  // model open 
  const [show, setShow] = useState(false)
  const [cardType, setCardType] = useState('')
  // ** States
  const [searchRoom, setSearchName] = useState('')
  const [searchCleanStatus, setSearchPost] = useState('')
  const [searchRepair, setSearchRepairRequire] = useState('')
  const [searchRoomNumber, setSearchRoomNo] = useState('')
  const [searchRoomStatus, setSearchSRoom] = useState('')
  const [Maintains, setMaintains] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [sel_id, setSel_id] = useState()
  const [delUser, setDelUser] = useState(false)
  const handleCleanRoom = () => setDelUser(!delUser)
  const [repair, setRepair] = useState(false)
  const repairRequired = () => setRepair(!repair)
  // ** Table data to render
  const dataToRender = () => {
    if (
      searchRoom.length ||
      searchCleanStatus.length ||
      searchRoomNumber.length ||
      searchRepair.length ||
      searchRoomStatus.length ||
      Maintains.length
    ) {
      return filteredData
    } else {
      return data
    }
  }

  // ** Function to handle name filter

  const handleNameFilter = e => {
    setData('')
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length || searchRoomNumber.length || searchCleanStatus.length || searchRepair.length || Maintains.length || searchRoomStatus.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchName(value)
    console.log(value.length)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.room_category.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.room_category.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchName(value)

    }
  }
  const handleMaitains = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length || searchRoomNumber.length || searchCleanStatus.length || searchRepair.length || Maintains.length || searchRoomStatus.length) {
        console.log('filteredData', filteredData)
        return filteredData
      } else {
        console.log('data', data)
        return data
      }
    }

    setMaintains(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.close_dueto_maintains.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.close_dueto_maintains.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })

      setFilteredData(updatedData)
      setMaintains(value)
    }
  }
  // ** Function to handle repair_require filter
  const handleRepairRequired = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length || searchRoomNumber.length || searchCleanStatus.length || searchRepair.length || Maintains.length || searchRoomStatus.length) {
        console.log('filteredData', filteredData)
        return filteredData
      } else {
        console.log('data', data)
        return data
      }
    }

    setSearchRepairRequire(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.repair_require.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.repair_require.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchRepairRequire(value)
    }
  }
  // ** Function to handle email filter
  const handleCleanStatus = e => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length || searchRoomNumber.length || searchCleanStatus.length || searchRepair.length || Maintains.length || searchRoomStatus.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchRoomNo(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.room_no.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.room_no.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchRoomNo(value)
    }
  }

  // ** Function to handle cleaning_status filter
  const handleCleaningStatus = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length || searchRoomNumber.length || searchCleanStatus.length || searchRepair.length || Maintains.length || searchRoomStatus.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchPost(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.cleaning_status.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.cleaning_status.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchPost(value)
    }
  }

  // ** Function to handle room_status filter
  const handleRoomStatus = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length || searchRoomNumber.length || searchCleanStatus.length || searchRepair.length || Maintains.length || searchRoomStatus.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchSRoom(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.room_status.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.room_status.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })

      console.log([updatedData])

      setFilteredData(updatedData)
      setSearchSRoom(value)
    }
  }

  const columns = [

    {
      name: 'Room Catogry',
      sortable: true,
      minWidth: '140px',
      sortable: row => row.room_category,
      selector: row => row.room_category
    },
    {
      name: 'Room Number',
      sortable: true,
      minWidth: '150px',
      sortable: row => row.room_no,
      selector: row => row.room_no
    },
    {
      name: 'Cleaning Status',
      sortable: true,
      minWidth: '160px',
      sortable: row => row.cleaning_status,
      selector: row => {
        return (
          <Badge color={row.cleaning_status === 'clean' ? 'light-success' : 'light-danger'} pill>
            {row.cleaning_status}
          </Badge>
        )
      }
    },
    {
      name: 'Repair Required',
      sortable: true,
      minWidth: '160px',
      sortable: row => row.repair_require,
      selector: row => {
        return (
          <Badge color={row.repair_require === 'no' ? 'light-success' : 'light-danger'} pill>
            {row.repair_require}
          </Badge>
        )
      }
    },
    {
      name: 'Closed Due to Maintains',
      sortable: true,
      minWidth: '210px',
      sortable: row => row.close_dueto_maintains,
      selector: row => {
        return (
          <Badge color={row.close_dueto_maintains === 'no' ? 'light-success' : 'light-danger'} pill>
            {row.close_dueto_maintains}
          </Badge>
        )
      }
    },
    {
      name: 'Room Status',
      sortable: true,
      minWidth: '140px',
      sortable: row => row.room_status,
      selector: row => {
        return (
          <Badge color={row.room_status === 'occupied' ? 'light-danger' : 'light-success'} pill>
            {row.room_status}
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pe-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem className='w-100' onClick={() => {
                  handleCleanRoom()
                  setSel_id(row.id)
                }}>
                  <CleaningConfirm open={delUser} handleCleanRoom={handleCleanRoom} id={sel_id} status={row.cleaning_status} />
                  <FileText size={15} />
                  <span className='align-middle ms-50'> Mark As {row.cleaning_status === 'dirty' ? 'Clean' : 'Dirty'} </span>
                </DropdownItem>

                <DropdownItem className='w-100' onClick={() => {
                  repairRequired()
                  setSel_id(row.id)
                }}>
                  <RepairRequider open={repair} repairRequired={repairRequired} id={sel_id} />
                  <Archive size={15} />
                  <span className='align-middle ms-50'>Repair Work Required</span>
                </DropdownItem>

                {row.close_dueto_maintains === 'yes' ? <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>View Maintains Work</span>
                </DropdownItem> : <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Close Room From Maintains Work</span>
                </DropdownItem>}

              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }
    }
  ]

  const cleanAllStatus = (e) => {
    e.preventDefault()
    data.map(obj => {
      if (obj.cleaning_status === 'dirty') {
        obj.cleaning_status = 'clean'
      }
    })
    setShow(!show)
  }

  const dirtyAllStatus = (e) => {
    e.preventDefault()
    data.map(obj => {
      if (obj.cleaning_status === 'clean') {
        obj.cleaning_status = 'dirty'
      }
    })
    setShow(!show)
  }

  const roomStatusChange = (e) => {
    e.preventDefault()
    data.map(obj => {
      if (obj.room_status === 'occupied') {
        obj.room_status = 'vacant/empty'
      }
    })
    setShow(!show)
  }

  const CleaningConfirm = ({ open, handleCleanRoom, id, status }) => {

    const handleCleaningStatus = (e) => {
      e.preventDefault()
      if (id) {
        data.map(obj => {
          if (obj.id === id && obj.cleaning_status === 'dirty') {
            obj.cleaning_status = 'clean'
          } else {
            obj.cleaning_status = 'dirty'
          }
        })
      }
      handleCleanRoom()
    }

    return (
      <>
        <Modal
          isOpen={open}
          toggle={handleCleanRoom}
          className='modal-dialog-centered'
          backdrop={false}
        >
          <ModalHeader toggle={handleCleanRoom}></ModalHeader>
          <ModalBody>
            <Row>
              <Col className='text-center'>
                <h5>Please confirm again if your want to make this room as {status === 'dirty' ? 'Clean' : 'Dirty'} ?</h5>
              </Col>
            </Row>
            <Row>
              <Col className='text-center'>
                <Button className='mx-1' color='success' onClick={handleCleaningStatus}>confirm</Button>
                <Button className='mx-1' color='danger' onClick={handleCleanRoom}>Cancel</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        
      </>
    )
  }
  const RepairRequider = ({ open, repairRequired, id }) => {

    const handleRepairStatus = (e) => {
      e.preventDefault()
      if (id) {
        data.map(obj => {
          if (obj.id === id && obj.repair_require === 'no') {
            obj.repair_require = 'yes'
          } else {
            obj.repair_require = 'no'
          }
        })
      }
      repairRequired()
    }

    return (
      <>
        <Modal
          isOpen={open}
          toggle={repairRequired}
          className='modal-dialog-centered'
          backdrop={false}
        >
          <ModalHeader toggle={repairRequired}></ModalHeader>
          <ModalBody>
            <Row>
              <Col className='text-center'>
                <h5>Please confirm again if your want to make this room as repair ?{id}</h5>
              </Col>
            </Row>
            <Row>
              <Col className='text-center'>
                <Button className='mx-1' color='success' onClick={handleRepairStatus}>confirm</Button>
                <Button className='mx-1' color='danger' onClick={repairRequired}>Cancel</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        
      </>
    )
  }
  return (
    <>
      <Card>
        <CardHeader className='d-flex justify-content-between'>
          <CardTitle>Housekeeping Status</CardTitle>
          <Button color='primary' onClick={(e) => {
            e.preventDefault()
            setShow(!show)
          }}>Bundle Operation</Button>
        </CardHeader>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='room'>
                Room Category:
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={roomCategory[0]}
                options={roomCategory}
                isClearable={false}
                onChange={handleNameFilter}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='number'>
                Room Number:
              </Label>
              <Input
                type='number'
                id='number'
                placeholder='enter room number'
                value={searchRoomNumber}
                onChange={handleCleanStatus}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='cleaning_status'>
                Cleaning Status:
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={cleanStatus[0]}
                options={cleanStatus}
                isClearable={false}
                onChange={handleCleaningStatus}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='repair_require'>
                Repair Required:
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={repairStatus[0]}
                options={repairStatus}
                isClearable={false}
                onChange={handleRepairRequired}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='room_status'>
                Closed Due to Maintains:
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={repairStatus[0]}
                options={repairStatus}
                isClearable={false}
                onChange={handleMaitains}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='room_status'>
                Room Status:
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={roomStatus[0]}
                options={roomStatus}
                isClearable={false}
                onChange={handleRoomStatus}
              />
            </Col>

          </Row>
          <div>
            <DataTable
              noHeader
              pagination
              columns={columns}
              paginationPerPage={7}
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              data={dataToRender()}
            />
          </div>
        </CardBody>
      </Card>

      {/* model here */}

      <Modal
        isOpen={show}
        toggle={() => {
          setShow(!show)
        }}
        className='modal-dialog-centered'
        onClosed={() => setCardType('')}
        size='sm'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent border-bottom' toggle={() => {
          setShow(!show)
        }}>
          <p>Bundle Operation</p>
        </ModalHeader>
        <ModalBody className='rate_inventry'>
          {cardType !== '' && cardType !== 'unknown' ? (
            <InputGroupText className='p-25'>
              <span className='add-card-type'>
                <img height='24' alt='card-type' src={cardsObj[cardType]} />
              </span>
            </InputGroupText>
          ) : null}
          <Row>
            <Col className='pt-1' lg='12' md='12' xl='12'>
              <Button color='success' className='w-100' disabled={data.cleaning_status === 'clean'} onClick={cleanAllStatus} >Mark All Room As Clean</Button>
            </Col>
            <Col className='pt-1' lg='12' md='12' xl='12'>
              <Button color='danger' className='w-100' onClick={dirtyAllStatus}>Mark All Room As Dirty</Button>
            </Col>
            <Col className='pt-1' lg='12' md='12' xl='12'>
              <Button color='info' className='w-100' onClick={roomStatusChange}>Mark All Room As Vacant</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {
        show || repair || delUser ? (
          <div class="modal-backdrop fade show" ></div>
        ) : null
      }
    </>
  )
}

export default Status