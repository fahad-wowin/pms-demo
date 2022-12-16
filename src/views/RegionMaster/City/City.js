import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Form, Spinner, CardHeader } from 'reactstrap'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const City = () => {
  const [show, setShow] = useState(false)
  const handleModal = () => setShow(!show)

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [selected_city, setSelected_city] = useState()

  const [del, setDel] = useState(false)

  const [districtList, setDistrictList] = useState([])
  // const [status, setStatus] = useState(false)
  const [loader, setLoader] = useState(false)

  const [dropdownLoader, setDropdownLoader] = useState(false)

  const userId = localStorage.getItem('user-id')

  const districtDropdownList = () => {
    setDropdownLoader(true)
    try {
      const districtDropdownBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "selectall"
      }
      axios.post(`/getdata/regiondata/districtdetails`, districtDropdownBody)
        .then(districtResponse => {
          setDistrictList(districtResponse?.data[0])
          setDropdownLoader(false)
        })
    } catch (error) {
      setDropdownLoader(false)
      console.log("District Dropdown Error", error.message)
    }
  }
  const districtOptions = districtList?.length > 0 && districtList[0]?.DistrictName ? districtList?.map(function (district) {
    return { value: district.DistrictID, label: district.DistrictName }
  }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

  useEffect(() => {
    districtDropdownList()
  }, [])

  const [cities, setCities] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getCityAll = () => {
    setLoader(true)
    try {
      const citiesBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "selectall"
      }
      axios.post(`/getdata/regiondata/citydetails`, citiesBody)
        .then(response => {
          setCities(response.data[0])
          if (cities !== []) { setRefresh(true) }
          setLoader(false)
        })
    } catch (error) {
      setLoader(false)
      console.log("Cities Error", error.message)
    }
  }

  useEffect(() => {
    getCityAll()
  }, [refresh])

  const NewCityModal = () => {
    const [CityName, setCityName] = useState('')
    const [Pincode, setPinCode] = useState('')
    const [CityDesc, setCityDesc] = useState('')
    const [DistrictID, setDistrictID] = useState('')
    const [display, setDisplay] = useState(false)

    const handleDistrictList = (value) => {
      if (value === 'reload') {
        districtDropdownList()
      }
      setDistrictID(value)
    }

    const cityPost = () => {

      const cityPostBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "insert",
        DistrictID,
        CityName,
        CityDesc,
        Pincode
      }
      try {
        axios.post(`/getdata/regiondata/citydetails`, cityPostBody)
          .then(() => {
            getCityAll()
            // console.log("city Post Response", response)
          })
      } catch (error) {
        console.log("city Post error", error.message)
      }
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (CityName.trim() && Pincode.trim() && DistrictID !== '') {
        cityPost()
        handleModal()
        toast.success('City Added!', { position: "top-center" })
      }
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
            Add City
          </ModalHeader>
          {
            !dropdownLoader ? (
              <>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                  <Form>
                    <Row>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='CityName'>
                          <span className='text-danger'>*</span>City Name
                        </Label>
                        <Input type='text' name='CityName' id='CityName' value={CityName} onChange={e => setCityName(e.target.value)} invalid={display && CityName.trim() === ''} />
                        {display && !CityName.trim() ? <span className='error_msg_lbl'>Enter City </span> : null}
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='Pincode'>
                          <span className='text-danger'>*</span>Pin Code
                        </Label>
                        <Input type='text' name='Pincode' id='Pincode' maxLength={6} value={Pincode} onChange={e => setPinCode(e.target.value)} invalid={display && Pincode.trim() === ''} />
                        {display && !Pincode.trim() ? <span className='error_msg_lbl'>Enter Pin Code </span> : null}
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='CityDesc'>
                          City Description</Label>
                        <Input type='textarea' name='CityDesc' id='CityDesc' value={CityDesc} onChange={e => setCityDesc(e.target.value)} />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>District
                        </Label>
                        <Select
                          theme={selectThemeColors}
                          className='react-select w-100'
                          classNamePrefix='select'
                          options={districtOptions}
                          isClearable={false}
                          value={districtOptions?.filter(c => c.value === DistrictID)}
                          onChange={e => {
                            handleDistrictList(e.value)
                          }}
                          invalid={display && DistrictID === ''}
                        />
                        {display && !DistrictID ? <span className='error_msg_lbl'>Select District</span> : null}
                      </Col>
                    </Row>
                    <Row className='gy-1 gx-2 mt-75' >
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
                  </Form>
                </ModalBody>
              </>
            ) : (
              <div style={{ height: '150px' }}>
                <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
              </div>
            )
          }

        </Modal>
        {
          show ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const EditCityModal = ({ id }) => {
    const cityData = cities?.filter(city => city.CityID === id)

    if (cities.length === 0) return

    const [editCityName, setEditCityName] = useState(cityData[0]?.CityName)
    const [editPinCode, setEditPinCode] = useState(cityData[0]?.Pincode)
    const [editCityDesc, setEditCityDesc] = useState(cityData[0]?.CityDesc)
    const [editDistrictID, setEditDistrictID] = useState(cityData[0]?.DistrictID)
    const [editStatusId] = useState(cityData[0]?.StatusID)
    const [editDisplay, setEditDisplay] = useState(false)

    const handleDistrictList = (value) => {
      if (value === 'reload') {
        districtDropdownList()
      }
      setEditDistrictID(value)
    }

    const updateCities = () => {
      const cityPostBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "update",
        CityID: id,
        DistrictID: editDistrictID,
        CityName: editCityName,
        CityDesc: editCityDesc,
        Pincode: editPinCode,
        StatusID: editStatusId
      }
      try {
        axios.post(`/getdata/regiondata/citydetails`, cityPostBody)
          .then(response => {
            getCityAll()
            console.log("city Post Response", response)
          })
      } catch (error) {
        console.log("city Post error", error.message)
      }
    }

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editCityName.trim() && editPinCode.trim() && editDistrictID !== '') {
        updateCities()
        handleEditModal()
        toast.success('City Edited Successfully!', { position: "top-center" })
      } else {
        toast.error('Fill All Fields!', {
          position: "top-center",
          style: {
            minWidth: '250px'
          },
          duration: 3000
        })
      }
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
            Edit City
          </ModalHeader>
          {
            !dropdownLoader ? (
              <>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                  <Form>
                    <Row>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='CityName'>
                          <span className='text-danger'>*</span>City Name
                        </Label>
                        <Input type='text' name='CityName' id='CityName' value={editCityName} onChange={e => setEditCityName(e.target.value)} invalid={editDisplay && editCityName.trim() === ''} />
                        {editDisplay && !editCityName.trim() ? <span className='error_msg_lbl'>Enter City </span> : null}
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='Pincode'>
                          <span className='text-danger'>*</span>Pin Code
                        </Label>
                        <Input type='text' name='Pincode' id='Pincode' maxLength={6} value={editPinCode} onChange={e => setEditPinCode(e.target.value)} invalid={editDisplay && editPinCode.trim() === ''} />
                        {editDisplay && !editPinCode.trim() ? <span className='error_msg_lbl'>Enter Pin Code </span> : null}
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='CityDesc'>
                          City Description</Label>
                        <Input type='textarea' name='CityDesc' id='CityDesc' value={editCityDesc} onChange={e => setEditCityDesc(e.target.value)} />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>District
                        </Label>
                        <Select
                          theme={selectThemeColors}
                          className='react-select w-100'
                          classNamePrefix='select'
                          options={districtOptions}
                          isClearable={false}
                          value={districtOptions?.filter(c => c.value === editDistrictID)}
                          onChange={e => {
                            handleDistrictList(e.value)
                          }}
                          invalid={editDisplay && editDistrictID === ''}
                        />
                        {editDisplay && !editDistrictID ? <span className='error_msg_lbl'>Select District</span> : null}
                      </Col>
                    </Row>
                    <Row className='gy-1 gx-2 mt-75' >
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
                  </Form>
                </ModalBody>
              </>
            ) : (
              <div style={{ height: '150px' }}>
                <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
              </div>
            )
          }

        </Modal>
        {
          showEdit ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const DeleteCityModal = ({ id }) => {

    const districtDel = () => {
      const cityDelBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "delete",
        CityID: id
      }
      try {
        axios.post(`/getdata/regiondata/citydetails`, cityDelBody)
          .then(response => {
            console.log("District Del Response", response)
          })
      } catch (error) {
        console.log("District Del error", error.message)
      }
    }
    const handleDeleteCity = () => {
      setCities(cities.filter(cities => cities.CityID !== id))
      districtDel()
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
            Are you sure to delete this permanently?
          </ModalHeader>
          <ModalBody>
            <Row className='text-center'>
              <Col xs={12}>
                <Button color='danger' className='m-1' onClick={handleDeleteCity}>
                  Delete
                </Button>
                <Button className='m-1' color='secondary' outline onClick={() => setDel(!del)}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {
          del ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const cityTable = [
    {
      name: 'ID',
      selector: row => row.CityID
    },
    {
      name: 'City Name',
      selector: row => row.CityName
    },
    {
      name: "City Description",
      selector: row => row.CityDesc
    },
    {
      name: "Pin Code",
      sortable: true,
      selector: row => row.Pincode
    },
    {
      name: "District",
      sortable: true,
      selector: row => row.DistrictName
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
              setSelected_city(row.CityID)
            }} size={15} />
            <Trash className='me-50' size={15} onClick={() => {
              setDel(true)
              setSelected_city(row.CityID)
            }} />
          </Col>

        </>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            City
          </CardTitle>
          <Button color='primary' onClick={() => {
            setShow(true)
            // setStatus(!status)
            districtDropdownList()
          }}>Add City</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
              <DataTable
                noHeader
                data={cities}
                columns={cityTable}
                className='react-dataTable'
                pagination
                progressPending={loader}
              />
            </Col>
          </Row>
          <div>
            <Button className='me-2' color='primary' onClick={getCityAll}>Reload</Button>
          </div>
        </CardBody>
      </Card>
      {/* <Row>
        <Col md='12' className='mb-1'>
          <Card>
            <CardBody>
              <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                City
                <Button color='primary' onClick={() => {
                  setShow(true)
                  // setStatus(!status)
                  districtDropdownList()
                }}>Add City</Button>
              </CardTitle>
              <CardText>
                <DataTable
                  noHeader
                  data={cities}
                  columns={cityTable}
                  className='react-dataTable'
                  pagination
                  progressPending={loader}
                />
              </CardText>
              <div>
                <Button className='me-2' color='primary' onClick={getCityAll}>Reload</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row> */}

      {show ? <NewCityModal /> : <></>}
      {showEdit ? <EditCityModal id={selected_city} /> : <></>}
      {del ? <DeleteCityModal id={selected_city} /> : <></>}
    </>
  )
}

export default City