import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { Listing } from '@prisma/client';

@Controller()
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get('listing/:id')
  async getListingById(@Param('id') id: string): Promise<Listing> {
    return this.listingsService.listing({ id: Number(id) });
  }

  @Get('listings')
  async getFilteredListings(
    @Query('page') page?: string,
    @Query('search') search?: string,
  ): Promise<{ listings: Listing[]; count: number }> {
    /**
     * page size is 5
     * this could be controlled through another search parametr
     */
    const unvalidatedPreviousPages = +page - 1; // number of pages to skip
    let where = {};
    if (search !== '') {
      const or: object[] = [
        { project: { contains: search, mode: 'insensitive', }, },
        { name: {contains: search, mode: 'insensitive', }, },
      ];

      if (!isNaN(+search)) or.push({ unitNumber: { equals: +search, }, });
      where = { where: {OR: or }};
    }
    return this.listingsService.listings({
      /**
       * skip number of items on previous pages; 5 items in each page
       * (or zero if no valid page query param was received)
       * take 5 items (full page)
       */
      skip: (unvalidatedPreviousPages > 0 ? unvalidatedPreviousPages : 0) * 5,
      take: 5,
      ...where,
    });
  }

  @Post('listing')
  async createListing(
    @Body() listingData: { name: string; project: string; unitNumber: number },
  ): Promise<Listing> {
    const { name, project, unitNumber } = listingData;
    return this.listingsService.createListing({ name, project, unitNumber, });
  }
}
