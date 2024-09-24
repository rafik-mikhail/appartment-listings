import { ListingsService } from './listings.service';
import { Listing } from '@prisma/client';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    getListingById(id: string): Promise<Listing>;
    getFilteredListings(page?: string, search?: string): Promise<{
        listings: Listing[];
        count: number;
    }>;
    createListing(listingData: {
        name: string;
        project: string;
        unitNumber: number;
    }): Promise<Listing>;
}
