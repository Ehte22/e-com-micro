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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrict = exports.protectedRoute = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.protectedRoute = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies.user);
    if (!req.cookies.user) {
        return res.status(404).json({ message: "No cookie found" });
    }
    const JWT_KEY = process.env.JWT_KEY;
    if (!JWT_KEY) {
        return res.status(404).json({ message: "JWT key not found" });
    }
    jsonwebtoken_1.default.verify(req.cookies.user, JWT_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(403).json({ message: "JWT error", error: err });
        }
        console.log(decoded);
        req.user = decoded;
        req.body.userId = decoded.userId;
        next();
    });
}));
const restrict = (role) => {
    return (req, res, next) => {
        console.log(role, req.user);
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: "You don't have permission to perform this action" });
        }
        next();
    };
};
exports.restrict = restrict;
