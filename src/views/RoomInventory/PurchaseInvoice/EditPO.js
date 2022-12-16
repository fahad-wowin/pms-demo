import { React, useState } from 'react'
import { Button, Input, Row, Col, Label, InputGroupText, InputGroup } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'
import { MdDateRange } from "react-icons/md"
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { RiBillLine } from "react-icons/ri"
import { AiFillPrinter } from "react-icons/ai"

const venderOptions = [
  { value: '-', label: '-' },
  { value: 'Vendor 1', label: 'Vendor 1' },
  { value: 'Vendor 2', label: 'Vendor 2' },
  { value: 'Vendor 3', label: 'Vendor 3' }
]

let data
axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
  data = response.data
})

function EditPO() {
  const [picker, setPicker] = useState(new Date())
  const editPOTable = [
    {
      name: 'Ref ID',
      selector: row => row.id
    },
    {
      name: "Product Category",
      selector: row => row.name,
      cell: row => (
        <>
          <Select
            theme={selectThemeColors}
            className='react-select w-100'
            classNamePrefix='select'
            defaultValue={venderOptions[0]}
            options={venderOptions}
            isClearable={false}
            name={row.age}
          />
        </>
      )
    },
    {
      name: "Product Name",
      selector: row => row.name,
      cell: row => (
        <>
          <Select
            theme={selectThemeColors}
            className='react-select w-100'
            classNamePrefix='select'
            defaultValue={venderOptions[0]}
            options={venderOptions}
            isClearable={false}
            name={row.age}
          />
        </>
      )
    },
    {
      name: "Rates",
      selector: row => row.name,
      cell: row => (
        <>
          <Input type='text' placeholder='0' name={row.age} />
        </>
      )
    },
    {
      name: "Qty",
      selector: row => row.name,
      cell: row => (
        <>
          <Input type='text' placeholder='0' name={row.age} />
        </>
      )
    },
    {
      name: "Disc(%)",
      selector: row => row.name,
      cell: row => (
        <>
          <Input type='text' placeholder='0' name={row.age} />
        </>
      )
    },
    {
      name: "Total Amount",
      selector: row => row.name,
      cell: row => (
        <>
          <Input type='text' placeholder='0' name={row.age} />
        </>
      )
    },
    {
      name: "Tax(%)",
      selector: row => row.name,
      cell: row => (
        <>
          <Input type='text' placeholder='0' name={row.age} />
        </>
      )
    },
    {
      name: "Final Amt",
      selector: row => row.name,
      cell: row => (
        <>
          <Input type='text' placeholder='0' name={row.age} />
        </>
      )
    }
  ]
  return (
    <>
      <Row>
        <Col md='12' className='mb-1'>
          <Row>
            <Col md='4' className='mb-1'>
              <Label className='form-label'>Vendor</Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={venderOptions[0]}
                options={venderOptions}
                isClearable={false}
              />
            </Col>
            <Col md='4' className='mb-1'>
              <Label className='form-label'>PO Number</Label>
              <Input type='text' placeholder='123' disabled />
            </Col>
            <Col md='4' className='mb-1'>
              <Label className='form-label'>PO Date</Label>
              <InputGroup className='input-group-merge'>
                <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='startDate' />
                <InputGroupText>
                  <MdDateRange size={15} />
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col md='4' className='mb-1'>
              <Label className='form-label'>Total Amount</Label>
              <Input type='text' placeholder='250' disabled />
            </Col>
            <Col md='4' className='mb-1'>
              <Label className='form-label'>Remark</Label>
              <Input type='text' placeholder='Enter Text' />
            </Col>
            <Col md='12'>
              <Button color='primary me-2'><RiBillLine size={17} /> Invoice</Button>
              <Button color='primary' className='me-2'><AiFillPrinter size={17} /> Print Bill</Button>
              <Button color='primary' outline className='me-2'>Back</Button>
            </Col>
          </Row>
          <Row className='my-1'>
            <Col>
              <DataTable
                noHeader
                data={data}
                columns={editPOTable}
                className='react-dataTable'
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>


  )
}

export default EditPO