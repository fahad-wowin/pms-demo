import React, { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'

const Help = () => {

  const questions = [
    {
      id: '1',
      question: 'WHAT IS ADD ON SERVICES?',
      answer: 'Fees or charges that are added to the basic price of a good or service for additional features or benefits as those added to the price You need to click Add On Services in rate management section .'
    },
    {
      id: '2',
      question: 'HOW TO SERVICES?',
      answer: 'Fees or charges that are added to the basic price of a good or service for additional features or benefits as those added to the price You need to click Add On Services in rate management section .'
    },
    {
      id: '3',
      question: 'WHEN TO SERVICES?',
      answer: 'Fees or charges that are added to the basic price of a good or service for additional features or benefits as those added to the price You need to click Add On Services in rate management section .'
    }
  ]

  const [filterString, setFilterString] = useState('')

  const [open, setOpen] = useState('')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>FAQ's</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='mb-1'>
            <Col>
              <Label className='fw-bold fs-5'>Search Questions</Label>
              <Input
                type='text'
                name='Question'
                placeholder='Enter your question here..'
                value={filterString}
                onChange={e => setFilterString(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {
                questions.filter(qt => qt.question.includes(filterString.toUpperCase())).map((q, index) => {
                  return (
                    <Accordion key={index} className='accordion-margin' open={open} toggle={toggle} >
                      <AccordionItem>
                        <AccordionHeader targetId={q.id}>
                          {q.question}
                        </AccordionHeader>
                        <AccordionBody accordionId={q.id}>
                          {q.answer}
                        </AccordionBody>
                      </AccordionItem>
                    </Accordion>
                  )
                })
              }
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default Help