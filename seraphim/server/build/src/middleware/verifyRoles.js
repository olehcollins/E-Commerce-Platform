"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = void 0;
const verifyRoles = (req, res, next) => {
    const { isAdmin } = req.body;
    if (!isAdmin)
        return res.sendStatus(401);
    next();
};
exports.verifyRoles = verifyRoles;
