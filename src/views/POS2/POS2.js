import React, { useState } from 'react'
import { ChevronDown, Coffee, Edit, Eye, List, Settings, Printer, Sliders, Trash } from 'react-feather'
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import DataTable from 'react-data-table-component'
import NewPOSModal from './NewPOSModal'
import { useNavigate } from 'react-router-dom'
import UpdatePosModal from './UpdatePosModal'

const POS2 = () => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const navigate = useNavigate()

  const [updateOpen, setUpdateOpen] = useState(false)
  const handleUpdateOpen = () => setUpdateOpen(!updateOpen)

  const data = [
    {
      id: '1',
      name: 'Wowinfobiz',
      status: true,
      table: true
    }
  ]

  const posColumns = [
    {
      name: '#',
      width: '50px',
      selector: row => row.id
    },
    {
      name: 'POS Name',
      sortable: true,
      selector: row => row.name
    },
    {
      name: 'Products',
      sortable: true,
      selector: row => {
        return (
          <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/posProducts/${row.name}`)}>
            <Badge color='primary'>
              <Sliders size={12} className='me-25' />
              <span>Products</span>
            </Badge>
            {console.log(row.id)}
          </div>
        )
      }
    },
    {
      name: 'Orders',
      sortable: true,
      selector: row => {
        return (
          <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/posOrders/${row.name}`)}>
            <Badge color='primary'>
              <List size={12} className='me-25' />
              <span>Orders</span>
            </Badge>
            {console.log(row.id)}
          </div>
        )
      }
    },
    {
      name: 'Tables',
      sortable: true,
      selector: row => {
        return (
          <>
            {
              row.table ? (
                <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/tableManage/${row.name}`)}>
                  <Badge color='primary'>
                    <Coffee size={12} className='me-25' />
                    <span>Tables</span>
                  </Badge>
                </div>
              ) : (
                <Col>
                  No Tables
                </Col>
              )
            }
          </>
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
      
      center: true,
      selector: row => {
        return (
          <>
            <Col>
              <Edit className='me-1 cursor-pointer' size={15} onClick={() => handleUpdateOpen()} />
              <Trash className='ms-1 cursor-pointer' size={15} onClick={() => console.log(row.status)} />
            </Col>
          </>
        )
      }
    }

  ]

  return (
    <>
      <Card>
        <CardHeader className='d-flex flex-row flex-wrap justify-content-between align-items-center'>
          <CardTitle>POS</CardTitle>
          <Button color='primary' onClick={handleOpen}>Add New POS</Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <DataTable
                noHeader
                pagination
                data={data}
                columns={posColumns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50]}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <NewPOSModal open={open} handleOpen={handleOpen} />
      <UpdatePosModal updateOpen={updateOpen} handleUpdateOpen={handleUpdateOpen} />
    </>
  )
}

export default POS2