import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Listing, Prisma } from '@prisma/client';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async listing(
    listingWhereUniqueInput: Prisma.ListingWhereUniqueInput,
  ): Promise<Listing | null> {
    return this.prisma.listing.findUnique({
      where: listingWhereUniqueInput,
    });
  }

  async listings(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ListingWhereInput;
  }): Promise<{ listings: Listing[]; count: number }> {
    const { skip, take, where } = params;
    const [count, listings] = await this.prisma.$transaction([
      this.prisma.listing.count({where}),
      this.prisma.listing.findMany({ skip, take, where, }),
    ]);
    return { listings, count };
  }

  async createListing(data: Prisma.ListingCreateInput): Promise<Listing> {
    return this.prisma.listing.create({
      data,
    });
  }
}
