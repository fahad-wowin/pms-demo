import { React } from 'react'
import { Button, Card, CardTitle, CardBody, CardText, Row, Col, CardHeader } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import DataTable from 'react-data-table-component'
import axios from 'axios'

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

function StockCount() {
  const stockCountTable = [
    {
        name: 'Ref ID',
        selector: row => row.id,
        style: {
            color: 'black'
        }
    },
    {
        name: "Product Name",
        selector: row => row.name
    },
    {
        name: "Stock Count",
        cell: row => (
          <p name={row.name}>50</p>
        )
    },
    {
        name: "Used Stock",
        cell: row => (
          <p name={row.name}>30</p>
        )
    },
    {
        name: "Balance Stock",
        cell: row => (
          <p name={row.name}>20</p>
        )
    }
  ]
  return (
    <>
      <Row>
        <Col md='12' className='mb-1'>
          <Card>
            <CardHeader>
              <CardTitle className='mb-1'>Product Stock Count</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='3' className='mb-1 text-end'>
                  <h5>Product Name</h5>
                </Col>
                <Col md='5' className='mb-1'>
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
                  <Button color='primary me-1' >Search</Button>
                </Col>
              </Row>
              <CardText>
                
                <DataTable
                  noHeader
                  data={data}
                  columns={stockCountTable}
                  className='react-dataTable'
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </>


  )
}

export default StockCount