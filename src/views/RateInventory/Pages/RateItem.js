import React, { useState } from 'react'
import {
    Row, Col, Input, AccordionBody, AccordionHeader, AccordionItem
} from 'reactstrap'

function RateItem({rateItem, theKey, index, displayName, defaultItem}) {
    console.log(index, " - ", rateItem)
    const [rate, setRate] = useState(rateItem?.rate)
    const [child, setChild] = useState(rateItem?.child)
    const [adult, setAdult] = useState(rateItem?.adult)

    const changeRate = (val) => {
        rateItem.rate = +val
        setRate(val)
    }
    const changeChild = (val) => {
        rateItem.child = +val
        setChild(val)
    }
    const changeAdult = (val) => {
        rateItem.adult = +val
        setAdult(val)
    }
    return (
        <AccordionItem key={`${theKey}`}>
            <AccordionHeader targetId={`${index}`}>{displayName}</AccordionHeader>
            <AccordionBody accordionId={`${index}`}>
                <Row>
                    <Col md='4' className='my-50'>
                        <span>Set Rate</span>
                        <Input type='number' name="Rate" placeholder={defaultItem?.RoomRate} value={rate} bssize='small' onChange={(e) => changeRate(e.target.value)} />
                    </Col>
                    <Col md='4' className='my-50'>
                        <span>Extra Adult Rate</span>
                        <Input type='number' name="Adult" placeholder={defaultItem?.ExtraAdultPrice} value={adult} bssize='small' onChange={(e) => changeAdult(e.target.value)} />
                    </Col>
                    <Col md='4' className='my-50'>
                        <span>Extra Child Rate</span>
                        <Input type='number' name="Child" placeholder={defaultItem?.ExtraChildPrice} value={child} bssize='small' onChange={(e) => changeChild(e.target.value)} />
                    </Col>
                </Row>
            </AccordionBody>
        </AccordionItem>
    )


}

export default RateItem