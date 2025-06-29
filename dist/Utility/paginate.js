"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
// utils/paginator.ts
const paginate = (modelQuery, req) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;
    const total = yield modelQuery.clone().countDocuments(); // total records
    const data = yield modelQuery
        .skip((page - 1) * perPage)
        .limit(perPage);
    return {
        data,
        pagination: {
            total,
            per_page: perPage,
            current_page: page,
            last_page: Math.ceil(total / perPage),
            from: (page - 1) * perPage + 1,
            to: (page - 1) * perPage + data.length,
        }
    };
});
exports.paginate = paginate;
