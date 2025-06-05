"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const pointer = req.originalUrl;
    const errorResponse = {
        401: {
            errors: {
                code: 401,
                details: 'You must be logged in to access this resource.',
                source: { pointer }
            }
        },
        403: {
            errors: {
                code: 403,
                details: 'You do not have the necessary permissions to access this resource.',
                source: { pointer }
            }
        },
        404: {
            errors: {
                code: 404,
                details: 'We cannot find the request you requested for.',
                source: { pointer }
            }
        },
        405: {
            errors: {
                code: 405,
                details: 'The method is not allowed for the requested URL.',
                source: { pointer }
            }
        },
        422: {
            errors: {
                code: 422,
                details: err.message || 'Validation failed.',
                source: { pointer }
            }
        },
        500: {
            errors: {
                code: 500,
                details: 'An internal server error occurred. Please try again later.',
                message: err.message,
                file: err.fileName || null,
                line: err.lineNumber || null,
                source: { pointer }
            }
        }
    };
    const response = errorResponse[status] || errorResponse[500];
    console.error(`[Error ${status}]`, err);
    res.status(status).json(response);
}
