import React from 'react'
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap'
import { ChevronDown, MoreVertical, Edit, FileText, Archive, Trash, Eye, EyeOff } from 'react-feather'

import DataTable from 'react-data-table-component'

import './promotion.scss'

const PromoTable = () => {

    const data = [
        {
            id: '1',
            type: 'Basic',
            details: 'something',
            dates: '22/8/2022',
            applicability: 'all',
            action: 'btns'
        }
    ]

    const basicColumns = [
        {
            name: 'Promotion Type',
            sortable: true,
            selector: row => row.type
        },
        {
            name: 'Promotion Details',
            sortable: true,
            // minWidth: '225px',
            selector: row => row.details
        },
        {
            name: 'Dates',
            sortable: true,
            // minWidth: '310px',
            selector: row => row.dates
        },
        {
            name: 'Applicability',
            sortable: true,
            // minWidth: '250px',
            selector: row => row.applicability
        },
        {
            name: 'Action',
            //sortable: true,
            maxWidth: '100px',
            //selector: row => row.action,
            allowOverflow: true,
            //cell: (row) => {
                cell: () => {
                return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                    <DropdownToggle className='pe-1' tag='span'>
                        <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                        <FileText size={15} />
                        <span className='align-middle ms-50'> Activate/Deactivate</span>
                        </DropdownItem>

                        <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                        <Edit size={15} />
                        <span className='align-middle ms-50'>Update</span>
                        </DropdownItem>
                        
                        <DropdownItem className='w-100' onClick={e => e.preventDefault('Validate')}>
                        <Trash color='red' size={15} />
                        <span className='align-middle text-danger ms-50'>Remove</span>
                        </DropdownItem>

                    </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                )
            }
        }
    ]

    return (
        <div className='react-dataTable'>
            <DataTable
                noHeader
                pagination
                data={data}
                columns={basicColumns}
                className='react-dataTable ms-3'
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                
            />
        </div>
    )
}

export default PromoTable