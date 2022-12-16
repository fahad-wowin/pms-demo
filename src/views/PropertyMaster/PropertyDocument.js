import { React, useState } from 'react'
import { Card, CardHeader, CardTitle, Row, Col, Button, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, CardText, Label, Input } from 'reactstrap'
import DataTable from 'react-data-table-component'
// import axios from 'axios'
import { Edit, Trash, ExternalLink, Eye } from 'react-feather'
import { GrFormView } from "react-icons/gr"
import defaultFileSrc from "@src/assets/images/pages/20210422-EB-Mastering_Kafka_Streams_and_ksqlDB-ebook.pdf"
//import defaultFileSrc from "@src/assets/images/portrait/small/pool.jpg"
import Avatar from "@components/avatar"
import toast from 'react-hot-toast'

// let data
// axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//   data = response.data
// })

const labelStyle = {
  fontSize: '16px'
}

const PropertyDocument = () => {
  const [open, setOpen] = useState(false)
  const handleModal = () => setOpen(!open)
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const editHandleModal = () => setShowEdit(!showEdit)
  const [selected_propertyDoc, setSelected_propertyDoc] = useState('')
  const [del, setDel] = useState(false)
  const [addDocuments, setAddDocuments] = useState([
    {
      id: '1',
      documentName: 'abc',
      documentDesc: 'xyz',
      uploadDocument: 'C:/fakePath/xyz'
    }
  ])
  const AddPropertyDocumentModal = () => {

    const [documentName, setDocumentName] = useState('')
    const [documentDesc, setDocumentDesc] = useState('')
    const [uploadDocument, setUploadDocument] = useState('')

    const [display, setDisplay] = useState(false)


    const addDocumentObj = {
      id: Math.floor(Math.random() * 100),
      documentName,
      documentDesc,
      uploadDocument
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (documentName.trim() && documentDesc.trim() && uploadDocument !== '') {
        setAddDocuments([...addDocuments, addDocumentObj])
        handleModal()
        toast.success('Property Document Added!', { position: "top-center" })
      }
    }

    return (
      <Modal
        isOpen={open}
        // toggle={handleModal}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={handleModal}>
         Add Documents
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <>
            <Row className='mb-2'>
              <Col md='12' className='mb-2'>
                <Label className='form-label' for='documentName'>
                  <span className='text-danger'>*</span>Document Name
                </Label>
                <Input type='text' name='documentName' id='documentName' value={documentName} onChange={e => setDocumentName(e.target.value)} invalid={display && documentName.trim() === ''} />
                {display && !documentName.trim() ? <span className='error_msg_lbl'>Document Name Required</span> : null}
              </Col>
              <Col md='12' className='mb-2'>
                <Label  className='form-label' for='documentDesc'>
                  <span className='text-danger'>*</span>Document Description
                </Label>
                <Input type='textarea' name='documentDesc' id='documentDesc' value={documentDesc} onChange={e => setDocumentDesc(e.target.value)} invalid={display && documentDesc.trim() === ''} />
                {display && !documentDesc.trim() ? <span className='error_msg_lbl'>Document Description Required</span> : null}
              </Col>
              <Col md='6' className='mb-2'>
                <Label className='form-label' for='uploadDocument'>
                  <span className='text-danger'>*</span>upload Document
                </Label>
                <Input type='file'
                  name='uploadDocument'
                  accept='image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation'

                  id='uploadDocument'
                  value={uploadDocument}
                  onChange={e => setUploadDocument(e.target.value)}
                  invalid={display && uploadDocument === ''}
                />
                {display && !uploadDocument ? <span className='error_msg_lbl'>Document Required</span> : null}
              </Col>
            </Row>
            <Row tag='form' className='gy-1 gx-2 mt-75' >
              <Col className='text-end mt-1' xs={12}>
                <Button className='me-1' color='primary' onClick={handleSubmit}>
                  Submit
                </Button>
                <Button
                  color='secondary'
                  outline
                  onClick={() => {
                    setOpen(!open)
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </>
        </ModalBody>

      </Modal>
    )
  }

  const EditPropertyDocumentModal = ({ id }) => {
    const propertyData = addDocuments.filter(propertyDoc => propertyDoc.id === id)
    const [editDocumentName, setEditDocumentName] = useState(propertyData[0]?.documentName)
    const [editDocumentDesc, setEditDocumentDesc] = useState(propertyData[0]?.documentDesc)

    const [editDisplay, setEditDisplay] = useState(false)


    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editDocumentName.trim() && editDocumentDesc.trim() !== '') {
        addDocuments.map(propertyDoc => {
          if (propertyDoc.id === id) {
            propertyDoc.documentName = editDocumentName
            propertyDoc.documentDesc = editDocumentDesc
          }
        })
        editHandleModal()
        toast.success('Property Document Edited Successfully!', { position: "top-center" })
      }
    }

    return (
      <Modal
        isOpen={showEdit}
        // toggle={editHandleModal}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={editHandleModal}>
         Edit Documents
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <>
            <Row className='mb-2'>
              <Col md='12' className='mb-2'>
                <Label className='form-label' for='documentName'>
                  <span className='text-danger'>*</span>Document Name
                </Label>
                <Input type='text' name='documentName' id='documentName' value={editDocumentName} onChange={e => setEditDocumentName(e.target.value)} invalid={editDisplay && editDocumentName.trim() === ''} />
                {editDisplay && !editDocumentName.trim() ? <span className='error_msg_lbl'>Document Name Required</span> : null}
              </Col>
              <Col md='12' className='mb-2'>
                <Label className='form-label' for='documentDesc'>
                  <span className='text-danger'>*</span>Document Description
                </Label>
                <Input type='textarea' name='documentDesc' id='documentDesc' value={editDocumentDesc} onChange={e => setEditDocumentDesc(e.target.value)} invalid={editDisplay && editDocumentDesc.trim() === ''} />
                {editDisplay && !editDocumentDesc.trim() ? <span className='error_msg_lbl'>Document Description Required</span> : null}
              </Col>
            </Row>
            <Row tag='form' className='gy-1 gx-2 mt-75' >
              <Col className='text-end mt-1' xs={12}>
                <Button className='me-1' color='primary' onClick={editHandleSubmit}>
                  Submit
                </Button>
                <Button
                  color='secondary'
                  outline
                  onClick={() => {
                    setShowEdit(!showEdit)
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </>
        </ModalBody>

      </Modal>
    )
  }

  const DeletePropertyDocumentModal = ({ id }) => {

    const data = addDocuments?.filter(propertyDoc => propertyDoc.id === id)

    const handleDeletePropertyDocument = () => {
      setAddDocuments(addDocuments?.filter(propertyDoc => propertyDoc.id !== id))
      setDel(!del)
    }

    return (
      <Modal
        isOpen={del}
        // toggle={() => setDel(!del)}
        className='modal-dialog-centered'
      >
        <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
          Are you sure to delete  {data[0]?.documentName} permanently?
        </ModalHeader>
        <ModalBody>
          <Row className='text-center'>
            <Col xs={12}>
              <Button color='danger' className='m-1' onClick={handleDeletePropertyDocument}>
                Delete
              </Button>
              <Button className='m-1' color='secondary' outline onClick={() => setDel(!del)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
  }

  const PreviewPropertyDocumentModal = ({ id }) => {
    console.log('defaultFileSrc> ', defaultFileSrc)
    const data = addDocuments?.filter(propertyDoc => propertyDoc.id === id)
    return (
      <Modal
        isOpen={show}
        // toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent justify-content-center' toggle={() => setShow(!show)}>
          Document Details
        </ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <Row>
            <Col md='6'>


              <Label>Document Name :</Label>

              <h4 style={labelStyle}>{data[0]?.documentName}</h4>
            </Col>
            <Col md='6'>

              <Label>Document Description :</Label>


              <h4 style={labelStyle}>{data[0]?.documentDesc}</h4>

            </Col>
          </Row>
          <Row>
            <Col className='mb-2'>
              <embed src={defaultFileSrc} width="100%" height={`${defaultFileSrc.endsWith('.pdf') | defaultFileSrc.endsWith('.doc') | defaultFileSrc.endsWith('.docx' | defaultFileSrc.endsWith('.ppt') | defaultFileSrc.endsWith('.pptx')) ? '500' : '100%'}`} />
              {/* <img src={defaultAvatar} height='200px'></img> */}
            </Col>
          </Row>

          <Row>
            <Col md='3 lg-text-end md-text-end mb-2'>
              <Label>Document URL:</Label>
            </Col>
            <Col md='9'>
              <Label style={labelStyle}><a href={defaultFileSrc} target='_new'>{defaultFileSrc}</a></Label>
            </Col>
          </Row>
          <Row>
            <Col md='12 text-center'>
              <Button color='danger' onClick={() => setShow(!show)}>Close</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
  }

  const propertyDocTable = [
    {
      name: 'ID',
      selector: row => row.id,
      width: '150px'
    },
    {
      name: 'Document Type',
      selector: row => (

        <span name={row.id}>{defaultFileSrc.split('.').pop().toUpperCase()}</span>

        //<Avatar img={defaultFileSrc} size='lg' name={row.id} />

      )
    },
    {
      name: "Document Name",
      selector: row => row.documentName
    },
    {
      name: 'Document Description',
      selector: row => row.documentDesc
    },
    {
      name: 'Document URL',
      selector: row => <a href={defaultFileSrc} alt={row.uploadDocument} target='_new'><ExternalLink className='me-50' size={15} /></a> // row.uploadDocument
    },
    {
      name: 'Action',
      selector: row => (
        <>
          <Edit className='me-50 pe-auto' size={15} onClick={() => {
            setShowEdit(true)
            setSelected_propertyDoc(row.id)
          }} />
          <Trash className='me-50' size={15} onClick={() => {
            setDel(true)
            setSelected_propertyDoc(row.id)
          }} />
          <Eye className='me-50' size={15} onClick={() => {
            setShow(true)
            setSelected_propertyDoc(row.id)
          }} />
        </>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Documents
          </CardTitle>
          <Button color='primary' onClick={() => setOpen(true)}>Add Documents</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
              <DataTable
                noHeader
                data={addDocuments}
                columns={propertyDocTable}
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
              <CardTitle tag='h2' className='fw-bold fs-2 d-flex justify-content-between'>
                <span>Documents</span>
                <Button color='primary' onClick={() => setOpen(true)}>Add Documents</Button>
              </CardTitle>
              <CardText>
                <DataTable
                  noHeader
                  data={addDocuments}
                  columns={propertyDocTable}
                  className='react-dataTable'
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row> */}

      {open ? <AddPropertyDocumentModal /> : <></>}
      {showEdit ? <EditPropertyDocumentModal id={selected_propertyDoc} /> : <></>}
      {del ? <DeletePropertyDocumentModal id={selected_propertyDoc} /> : <></>}
      {show ? <PreviewPropertyDocumentModal id={selected_propertyDoc} /> : <></>}
    </>
  )
}

export default PropertyDocument