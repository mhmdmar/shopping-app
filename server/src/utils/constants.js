const message = {
    error: {
        UNKNOWN_ERROR: "something went wrong, try again later :( ",
        PRODUCT_DOESNT_EXISTS: "product doesn't exists",
        INVALID_CREDENTIALS: "invalid email and/or password",
        INVALID_REQUEST_BODY: "invalid request body",
        INVALID_END_POINT: "end point doesn't exists",
        EMAIL_DOESNT_EXISTS: "email doesn't exists in the database",
        UNKNOWN_DATABASE_ERROR: "database error, ops...",
        UNAUTHORIZED: "unauthorized request",
        UPDATE_INVALID_ITEM:
            "cannot update item that doesn't exist in the database",
        MISSING_EMAIL_FROM_Query: "email is missing from the request query",
        SENDING_EMAIL_ERROR:
            "encountered an error while sending an email, please try again later"
    },
    success: {
        ADDED: "added successfully",
        UPDATED: "updated successfully",
        RESTORE_PASSWORD:
            "your password was sent to your email, check your email and please change the password as soon as you can if you think it's compromised"
    }
};
export {message};
