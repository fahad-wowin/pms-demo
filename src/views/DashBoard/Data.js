// ** Custom Components

export const PaymentData = [
    { id: '1', code: '258347961', name:'alam khann', roomno:'502', checkindate:'01-05-2022', checkoutdate:'08-07-2022', amount: 10000, status: 'success' },
    { id: '1', code: '258347961', name:'alam khann', roomno:'502', checkindate:'01-05-2022', checkoutdate:'08-07-2022', amount: 10000, status: 'success' },
    { id: '1', code: '258347961', name:'alam khann', roomno:'502', checkindate:'01-05-2022', checkoutdate:'08-07-2022', amount: 10000, status: 'success' }
]

// ** Get initial Data
// axios.get('/api/datatables/initiPaymentData').then(response => {
//     data = response.data
// })

export const PaymentColumn = [
    {
        name: 'Booking ID',
        minWidth: '110px',
        sortable: row => row.id,
        selector: row => row.id
    },
    {
        name: 'Booking Code',
        sortable: true,
        minWidth: '140px',
        selector: row => row.code
    },
    {
        name: 'Guest Name',
        sortable: true,
        minWidth: '165px',
        selector: row => row.name
    },
    {
        name: 'Room No.',
        sortable: true,
        minWidth: '130px',
        selector: row => row.roomno
    },
    {
        name: 'Check-In Date',
        sortable: true,
        minWidth: '165px',
        selector: row => row.checkindate
    },
    {
        name: 'Check-Out Date',
        sortable: true,
        minWidth: '165px',
        selector: row => row.checkoutdate
    },
    {
        name: 'Amount',
        sortable: true,
        minWidth: '140px',
        selector: row => row.amount
    },
    {
        name: 'Status',
        sortable: true,
        minWidth: '120px',
        selector: row => row.status
    }
]

