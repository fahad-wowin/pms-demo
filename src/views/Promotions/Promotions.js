import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, CardText, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Button, Accordion, AccordionItem, AccordionHeader, AccordionBody, Input, Label } from 'reactstrap'
import PromoTable from './PromoTable'
import { FaHandshake, FaClock, FaMobileAlt } from 'react-icons/fa'
import { IoIosHourglass, IoIosLaptop } from 'react-icons/io'
import { IoCaretBackSharp } from 'react-icons/io5'
import { BsFillMoonStarsFill, BsBriefcase } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import './promotion.scss'

const Promotions = () => {

  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const tabArray = [
    {
      id: '1',
      tabName: 'Promotions'
    },
    {
      id: '2',
      tabName: 'Inactive Promotions'
    },
    {
      id: '3',
      tabName: 'Expired Promotions'
    },
    {
      id: '4',
      tabName: 'Create New Promotions'
    }
  ]

  const promoArray = [
    {
      id: '1',
      logo: <FaHandshake size={35} />,
      heading: 'Basic Deals',
      content: 'Maximize sales by giving regular discount to the bookers'
    },
    {
      id: '2',
      logo: <IoIosHourglass size={35} />,
      heading: 'Last Minutes Deals',
      content: 'Maximize sales by giving regular discount to the bookers'
    },
    {
      id: '3',
      logo: <FaClock size={35} />,
      heading: 'Early Bird Deals',
      content: 'Maximize sales by giving regular discount to the bookers'
    },
    {
      id: '4',
      logo: <BsBriefcase size={35} />,
      heading: 'Free Night Deals',
      content: 'Maximize sales by giving regular discount to the bookers'
    },
    {
      id: '5',
      logo: <BsFillMoonStarsFill size={35} />,
      heading: 'Corporate Deals',
      content: 'Maximize sales by giving regular discount to the bookers'
    }
  ]

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const [accopen, setAccopen] = useState('')
  const toggleAcc = id => {
    accopen === id ? setAccopen() : setAccopen(id)
  }

  const [promoHead, setPromoHead] = useState('')

  const [all, setAll] = useState(false)
  const [mobileUser, setMobileUser] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [percent, setPercent] = useState(false)
  const [fixed, setFixed] = useState(false)

  const PromoAcc = () => {
    return (
      <Col>
        <Accordion className='accordion-margin' open={accopen} toggle={toggleAcc}>
          <AccordionItem>
            <AccordionHeader targetId='1'>
              <div>Step 1: Select Promotion | {promoHead}</div>
            </AccordionHeader>
            <AccordionBody accordionId='1'>
              What to put here?
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId='2'>
              <div>Step 2: Select Segment |</div>
            </AccordionHeader>
            <AccordionBody accordionId='2'>
              <h5>Multiple Customer segments can be selected here: </h5>
              <Col className='d-flex flex-md-row flex-column justify-content-between align-items-center'>
                <Button.Ripple
                  className='m-1'
                  color='primary'
                  outline={!all}
                  primary={all}
                  onClick={() => {
                    setAll(!all)
                    setMobileUser(!mobileUser)
                    setLoggedIn(!loggedIn)
                  }}
                >
                  <HiUserGroup className='m-1' size={25} />
                  All Customers
                </Button.Ripple>
                <Button.Ripple
                  className='m-1'
                  color='primary'
                  outline={!all && !mobileUser}
                  primary={all || mobileUser}
                  onClick={() => {
                    if (all === false) {
                      setMobileUser(!mobileUser)
                    }
                  }}
                >
                  <FaMobileAlt className='m-1' size={25} />
                  Mobile Customers
                </Button.Ripple>
                <Button.Ripple
                  className='m-1'
                  color='primary'
                  outline={!all && !loggedIn}
                  primary={all || loggedIn}
                  onClick={() => {
                    if (all === false) {
                      setLoggedIn(!loggedIn)
                    }
                  }}
                >
                  <IoIosLaptop className='m-1' size={25} />
                  Logged-In Members
                </Button.Ripple>
              </Col>
              <Col>
                <h5>Select Discount type:</h5>
                <Col>
                  <Col className='m-2'>
                    <Input
                      type='checkbox'
                      id='percentage'
                      checked={percent}
                      disabled={fixed}
                      onChange={() => setPercent(!percent)}
                    />
                    <Label for='percentage' className=' ms-1 form-check-label'>
                      Percentage
                    </Label>
                  </Col>
                  <Col className='m-2'>
                    <Input
                      type='checkbox'
                      id='Fixed'
                      checked={fixed}
                      disabled={percent}
                      onChange={() => setFixed(!fixed)}
                    />
                    <Label for='Fixed' className=' ms-1 form-check-label'>
                      Fixed
                    </Label>
                  </Col>
                </Col>
              </Col>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Col>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row className='d-flex flex-column'>
            <CardTitle>Promotions</CardTitle>
            <Col className='my-1'>
              <Nav pills>
                {
                  tabArray.map(tab => {
                    return (
                      <NavItem>
                        <NavLink active={active === tab.id} onClick={() => { toggle(tab.id) }}>
                          {tab.tabName}
                        </NavLink>
                      </NavItem>
                    )
                  })
                }
              </Nav>
            </Col>
          </Row>
        </CardHeader>
      </Card>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <PromoTable />
        </TabPane>
        <TabPane tabId='2'>
          <PromoTable />
        </TabPane>
        <TabPane tabId='3'>
          <PromoTable />
        </TabPane>
        <TabPane tabId='4'>
          {
            open ? (
              <Col>
                <Button.Ripple color='primary' onClick={handleOpen}><IoCaretBackSharp color='#FFF' /></Button.Ripple>
                <PromoAcc />
              </Col>
            ) : (
              <Col className='d-flex flex-row flex-wrap justify-content-center align-items-center'>
                {
                  promoArray.map(promo => {
                    return (
                      <Card className='promoCard me-2' style={{ width: '20em', height: '20em' }} key={promo.id} onClick={() => {
                        setPromoHead(promo.heading)
                        handleOpen()
                      }}>
                        <CardBody className='d-flex flex-column justify-content-around align-items-center'>
                          <div>{promo.logo}</div>
                          <CardTitle className='text-center'>{promo.heading}</CardTitle>
                          <CardText className='text-center'>{promo.content}</CardText>
                        </CardBody>
                      </Card>
                    )
                  })
                }
              </Col>
            )
          }
        </TabPane>
      </TabContent>
    </>
  )
}

export default Promotions