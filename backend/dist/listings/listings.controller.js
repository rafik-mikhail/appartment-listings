"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsController = void 0;
const common_1 = require("@nestjs/common");
const listings_service_1 = require("./listings.service");
let ListingsController = class ListingsController {
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    async getListingById(id) {
        return this.listingsService.listing({ id: Number(id) });
    }
    async getFilteredListings(page, search) {
        const unvalidatedPreviousPages = +page - 1;
        let where = {};
        if (search !== '') {
            const or = [
                { project: { contains: search, mode: 'insensitive', }, },
                { name: { contains: search, mode: 'insensitive', }, },
            ];
            if (!isNaN(+search))
                or.push({ unitNumber: { equals: +search, }, });
            where = { where: { OR: or } };
        }
        return this.listingsService.listings({
            skip: (unvalidatedPreviousPages > 0 ? unvalidatedPreviousPages : 0) * 5,
            take: 5,
            ...where,
        });
    }
    async createListing(listingData) {
        const { name, project, unitNumber } = listingData;
        return this.listingsService.createListing({ name, project, unitNumber, });
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.Get)('listing/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getListingById", null);
__decorate([
    (0, common_1.Get)('listings'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "getFilteredListings", null);
__decorate([
    (0, common_1.Post)('listing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "createListing", null);
exports.ListingsController = ListingsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], ListingsController);
//# sourceMappingURL=listings.controller.js.map