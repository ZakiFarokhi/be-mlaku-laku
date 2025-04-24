"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedemptionStatus = exports.PointType = exports.TripStatus = exports.MembershipLevel = exports.Gender = exports.Role = void 0;
var Role;
(function (Role) {
    Role["OWNER"] = "OWNER";
    Role["STAFF"] = "STAFF";
    Role["TOURIST"] = "TOURIST";
})(Role || (exports.Role = Role = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));
var MembershipLevel;
(function (MembershipLevel) {
    MembershipLevel["BRONZE"] = "BRONZE";
    MembershipLevel["SILVER"] = "SILVER";
    MembershipLevel["GOLD"] = "GOLD";
})(MembershipLevel || (exports.MembershipLevel = MembershipLevel = {}));
var TripStatus;
(function (TripStatus) {
    TripStatus["PLANNED"] = "PLANNED";
    TripStatus["COMPLETED"] = "COMPLETED";
    TripStatus["CANCELLED"] = "CANCELLED";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
var PointType;
(function (PointType) {
    PointType["EARN"] = "EARN";
    PointType["REDEEM"] = "REDEEM";
})(PointType || (exports.PointType = PointType = {}));
var RedemptionStatus;
(function (RedemptionStatus) {
    RedemptionStatus["PENDING"] = "PENDING";
    RedemptionStatus["APPROVED"] = "APPROVED";
    RedemptionStatus["REJECTED"] = "REJECTED";
})(RedemptionStatus || (exports.RedemptionStatus = RedemptionStatus = {}));
//# sourceMappingURL=interface.js.map