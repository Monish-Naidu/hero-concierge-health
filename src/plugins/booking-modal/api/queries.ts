import { gql } from "@apollo/client";

// Request to get booking categories
export const GET_BOOKING_CATEGORIES = gql`
  query BookingServices {
    bookingServices {
        id
        slug
        description
        benefits
        ingredients
        frequency
        imageURL
        categoryId
        name
        categoryName
        price
        status
        options {
            id
            name
            price
            description
            benefit
            question
        }
    }
}
`;

// Request to get available days
export const GET_BOOKING_AVAILABLE_DAYS = gql`
  query BookingAvailableDays {
    bookingAvailableDays {
      date
      status
      reason
    }
  }
`;

// Request to get available time slots for one day
export const GET_BOOKING_AVAILABLE_SLOTS = gql`
  query BookingAvailableSlots(
    $categoryName: String!
    $serviceName: String!
    $toDate: String!
  ) {
    bookingAvailableSlots(
      categoryName: $categoryName
      serviceName: $serviceName
      toDate: $toDate
    ) {
      date
      time
      status
    }
  }
`;

// New unified API: Booking Calendar
export const GET_BOOKING_CALENDAR = gql`
  query BookingCalendar(
    $categoryName: String!
    $serviceName: String!
    $fromDate: String
    $toDate: String
    $includeSlots: Boolean = false
  ) {
    bookingCalendar(
      categoryName: $categoryName
      serviceName: $serviceName
      fromDate: $fromDate
      toDate: $toDate
      includeSlots: $includeSlots
    ) {
      config {
        timezone
        dateFormat
        maxBookingDays
        rangeMinutes
        minHoursBeforeBooking
      }
      defaultWorkingHours {
        Mon {
          start
          end
          maxBookingsPerTimeSlot
        }
        Tue {
          start
          end
          maxBookingsPerTimeSlot
        }
        Wed {
          start
          end
          maxBookingsPerTimeSlot
        }
        Thu {
          start
          end
          maxBookingsPerTimeSlot
        }
        Fri {
          start
          end
          maxBookingsPerTimeSlot
        }
        Sat {
          start
          end
          maxBookingsPerTimeSlot
        }
        Sun {
          start
          end
          maxBookingsPerTimeSlot
        }
      }
      days {
        date
        status
        reason
        workingHours {
          start
          end
          maxBookingsPerTimeSlot
        }
        closedPeriods {
          fromTime
          toTime
          reason
        }
        slotsSummary {
          total
          available
          reserved
          booked
          needCall
          closed
        }
        slots @include(if: $includeSlots) {
          time
          status
          endTime
        }
      }
      summary {
        totalDays
        openDays
        closedDays
        partialDays
      }
    }
  }
`;

// Request to get the site configuration
export const GET_BOOKING_CONFIG = gql`
  query PluginsConfig {
    pluginsConfig(shortName: "booking_reservation")
}

`;


// Mutation for creating a client and booking
export const CREATE_CLIENT_AND_BOOKING = gql`
  mutation createClientAndBooking(
    $name: String!
    $phoneNumber: String!
    $serviceIDs: [ID!]!
    $date: String!
    $time: String!
    $email: String
  ) {
    createClientAndBooking(
      name: $name
      phoneNumber: $phoneNumber
      serviceIDs: $serviceIDs
      date: $date
      time: $time
      email: $email
    ) {
      id
      serviceIDs
      userID
      date
      time
      endTime
      status
      generationcode
      createdAt
      expireAt
    }
  }
`;


// Mutation for booking confirmation
export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking(
    $generationCode: String!
    $bookingID: ID!
  ) {
    confirmBooking(
      generationCode: $generationCode
      bookingID: $bookingID
    ) {
      id
      serviceIDs
      userID
      date
      time
      endTime
      status
      generationcode
    }
  }
`;


// Request to get the site configuration
export const GET_WEBSITES_CONFIG = gql`
  query PluginsConfig {
    pluginsConfig(shortName: "websites") {
      plugins {
        shortName
        config {
          phoneNumber
          email
          nameCompany
          timeOpen
          timeClose
          timezone
          dateTimeFormat
        }
      }
    }
  }
`;