// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        checkInDate: '',
        checkOutDate: '',
        roomBooked: null,
        cost: '',
        gst: '',
        total: '',
        discount: '',
        guest_created: [],
        guest_details: null,
        payment_details: null,
        bookingSource_store: null,
        bookingSourceDropdown_store: null,
        sourceType_store: null,
        guestDetailDropdown_store: null,
        paymentTypeDropdown_store: null,
        paymentModeDropdown_store: null,
        bookingDetail_store: [],
        paymentType_store: null,
        paymentMode_store: null,
        bookingCreatedBy_store: null,
        customerId_store: null,
        roomsAvailView: null,
        bookingId_store: null,
        roomAllocationId_store: null,
        loader_store: false
    },
    reducers: {
        setCheckInDate: (state, action) => { state.checkInDate = action.payload },
        setCheckOutDate: (state, action) => { state.checkOutDate = action.payload },
        setRoomsBooked: (state, action) => { state.roomBooked = action.payload },
        setPrice: (state, action) => {
            state.cost = action.payload.cost
            state.gst = action.payload.gst
            state.total = action.payload.total
            state.discount = action.payload.discount
        },
        setGuest: (state, action) => {
            state.guest_details = action.payload
        },
        registerGuest: (state, action) => {
            state.guest_created.push(action.payload)
        },
        setPaymentDetails: (state, action) => {
            state.payment_details = action.payload
        },
        setBookingSourceStore: (state, action) => {
            state.bookingSource_store = action.payload
        },
        setSourceTypeStore: (state, action) => {
            state.sourceType_store = action.payload
        },
        setBookingSourceDropdownStore: (state, action) => {
            state.bookingSourceDropdown_store = action.payload
        },
        setGuestDetailDropdownStore: (state, action) => {
            state.guestDetailDropdown_store = action.payload
        },
        setPaymentTypeDropdownStore: (state, action) => {
            state.paymentTypeDropdown_store = action.payload
        },
        setPaymentModeDropdownStore: (state, action) => {
            state.paymentModeDropdown_store = action.payload
        },
        setBookingDetailStore: (state, action) => {
            state.bookingDetail_store.push(action.payload)
        },
        setPaymentTypeStore: (state, action) => {
            state.paymentType_store = action.payload
        },
        setPaymentModeStore: (state, action) => {
            state.paymentMode_store = action.payload
        },
        setBookingCreatedByStore: (state, action) => {
            state.bookingCreatedBy_store = action.payload
        },
        setCustomerIdStore: (state, action) => {
            state.customerId_store = action.payload
        },
        setRoomsAvailViewStore: (state, action) => {
            state.roomsAvailView = action.payload
        },
        setBookingID: (state, action) => {
            state.bookingId_store = action.payload
        },
        setRoomAllocationID: (state, action) => {
            state.roomAllocationId_store = action.payload
        },
        setLoaderStore: (state, action) => {
            state.loader_store = action.payload
        }
    }
})

export const {
    setCheckInDate,
    setCheckOutDate,
    setRoomsBooked,
    setPrice,
    setGuest,
    registerGuest,
    setPaymentDetails,
    setBookingSourceStore,
    setSourceTypeStore,
    setBookingSourceDropdownStore,
    setGuestDetailDropdownStore,
    setPaymentTypeDropdownStore,
    setPaymentModeDropdownStore,
    setBookingDetailStore,
    setPaymentTypeStore,
    setPaymentModeStore,
    setBookingCreatedByStore,
    setCustomerIdStore,
    setRoomsAvailViewStore,
    setLoaderStore,
    setBookingID,
    setRoomAllocationID
} = bookingSlice.actions

export default bookingSlice.reducer