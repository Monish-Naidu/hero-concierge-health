import { gql } from "@apollo/client";

export const GET_BOOKING_SERVICES = gql`
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

export const GET_GOOGLE_REVIEWS = gql`
  query GoogleReviews {
    googleReviews {
      reviews {
        id
        name
        rating
        reviews {
          authorName
          rating
          text
          relativeTimeDescription
          retrievalDate
          status
          idReview
          nReviewUser
          nPhotoUser
          urlUser
        }
      }
    }
  }
`;