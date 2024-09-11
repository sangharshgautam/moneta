import {gql} from "@apollo/client";

export const BUSINESS_ID = "QnVzaW5lc3M6MDJmNWQxYmYtZGE1MC00Y2E0LTliZDktZTQ3ZTEwZjZlNzY1";
export const GET_CUSTOMERS = gql`
      query Business($id: ID!) {
        business(id: $id) {
            customers(page: 1, pageSize: 10, email: null) {
                edges {
                    node {
                        id
                        name
                        email
                        website
                    }
                }
            }
        }
    }
`;
export const GET_SERVICES = gql`
    query Business($id: ID!) {
        business(id: $id) {
            products(page: 1, pageSize: 10, isSold: true) {
                edges {
                    node {
                        id
                        name
                        description
                    }
                }
            }
        }
    }
`;
export const GET_INVOICES = gql`
    query Business($id: ID!) {
        business(id: $id) {
            invoices(page: 1, pageSize: 10) {
                edges {
                    node {
                        id,
                        invoiceDate,
                        dueDate,
                        total {
                            raw
                            currency {
                                symbol
                            }
                        }
                    }
                }
            }
        }
    }
`;
