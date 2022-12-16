// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs'
import '../HouseKeeping.scss'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, ListGroupItem, Input } from 'reactstrap'
import { Trash } from "react-feather"

const lst = [
  { id: '1', content: 'Cras justo odio' },
  { id: '2', content: 'Dapibus ac facilisis in' },
  { id: '3', content: 'Morbi leo risus' },
  { id: '4', content: 'Porta ac consectetur ac' },
  { id: '5', content: 'Vestibulum at eros' }
]
const CheckList = () => {
  // ** States
  const [listArr1, setListArr1] = useState(lst)
  const [listArr2, setListArr2] = useState([
    { id: '1', content: 'Cras justo odio' },
    { id: '2', content: 'Dapibus ac facilisis in' },
    { id: '3', content: 'Morbi leo risus' }
  ])
  const [listArr3, setListArr3] = useState([
    { id: '1', content: 'Cras justo odio' },
    { id: '2', content: 'Dapibus ac facilisis in' },
    { id: '3', content: 'Morbi leo risus' }
  ])
  const [name, setName] = useState('')
  const filter = (e) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = lst.filter((user) => {
        const startsWith = user.content.toLowerCase().startsWith(keyword.toLowerCase())
        const includes = user.content.toLowerCase().includes(keyword.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setListArr1(results)
    } else {
      setListArr1(lst)
      // If the text field is empty, show all users
    }

    setName(keyword)
  }


  const DeleteList2 = (id) => {
    setListArr2(listArr3.filter(user => user.id !== id))
  }
  const DeleteList3 = (id) => {
    setListArr3(listArr3.filter(user => user.id !== id))
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Services For Rooms</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>
          Add handle to your items using <code>handle</code> prop.
        </CardText>
        <Row id='dd-with-handle'>
          <Col md='6' sm='12'>
            <h4 className='my-1'>CHECK LIST ITEMS</h4>
            <Col className='my-1 text-center' md='12' sm='12'>
              <Input type='search' placeholder='Search / Add New List' value={name} onChange={filter} />
            </Col>
            <ReactSortable
              tag='ul'
              className='list-group sortable'
              group='shared-handle-group'
              handle='.handle'
              list={listArr1}
              setList={setListArr1}
            >
              {listArr1 && listArr1.length > 0 ? (
                listArr1.map(item => {
                  return (
                    <ListGroupItem key={item.id}>
                      <span className='handle'>+</span>
                      {item.content}
                    </ListGroupItem>
                  )
                }
                )) : (
                <h1>No results found!</h1>
              )
              }
            </ReactSortable>
          </Col>
          <Col md='6' sm='12'>
            <Row>
              <Col md='12' sm='12'>
                <h4 className='my-1'>EXECUTIVE SUITE ROOM</h4>

                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr2}
                  setList={setListArr2}
                >
                  {listArr2 ? (listArr2.map(item => {
                    return (
                      <ListGroupItem className='draggable d-flex align-item-center justify-content-between' key={item.id}>
                        <div className=''>
                          <span className='handle'>+</span>
                          {item.content}
                        </div>
                        <div>
                          <Trash className='cursor-pointer' onClick={() => DeleteList2(item.id)} />
                        </div>
                      </ListGroupItem>
                    )
                  })) : <Col className='drop_here' md='12' sm='12'>
                    <span>Drop Services Here</span>
                  </Col>
                  }
                </ReactSortable>
              </Col>
              <Col md='12' sm='12'>
                <h4 className='my-1'>DELUXE ROOM</h4>
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr3}
                  setList={setListArr3}
                >
                  {listArr3 ? (listArr3.map(item => {
                    return (
                      <ListGroupItem className='draggable d-flex align-item-center justify-content-between' key={item.id}>
                        <div className=''>
                          <span className='handle'>+</span>
                          {item.content}
                        </div>
                        <div>
                          <Trash className='cursor-pointer' onClick={() => DeleteList3(item.id)} />
                        </div>
                      </ListGroupItem>
                    )
                  })) : <Col className='drop_here' md='12' sm='12'>
                    <span>Drop Services Here</span>
                  </Col>
                  }
                </ReactSortable>
              </Col>
            </Row>

          </Col>
        </Row>
      </CardBody >
    </Card >
  )
}

export default CheckList
