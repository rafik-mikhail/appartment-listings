import { PrismaService } from '../prisma.service';
import { Listing, Prisma } from '@prisma/client';
export declare class ListingsService {
    private prisma;
    constructor(prisma: PrismaService);
    listing(listingWhereUniqueInput: Prisma.ListingWhereUniqueInput): Promise<Listing | null>;
    listings(params: {
        skip?: number;
        take?: number;
        where?: Prisma.ListingWhereInput;
    }): Promise<{
        listings: Listing[];
        count: number;
    }>;
    createListing(data: Prisma.ListingCreateInput): Promise<Listing>;
}
