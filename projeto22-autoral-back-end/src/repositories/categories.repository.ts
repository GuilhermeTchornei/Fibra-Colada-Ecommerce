import { PrismaService } from "@/config/prisma.service";
import { FilterDto } from "@/interfaces/dto/categories.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllMainCategories() {
        return this.prisma.main_categories.findMany({
            select: {
                categories: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
    }

    async findAllProductsByCategory(categoryId: number, filter: FilterDto) {
        const products = await this.prisma.products_stamps.findMany({
            include: {
                product: {
                    include: {
                        products_categories: {
                            include: {
                                categories: true,
                            },
                        }
                    }
                },
                products_variations: {
                    select: {
                        id: true,
                        price: true,
                        size: true,
                        enabled: true,
                    }
                },
                products_images: true,
                stamp: true,
            },
            where: {
                product: {
                    products_categories: {
                        some: {
                            category_id: categoryId,
                            product: {
                                products_categories: {
                                    some: {
                                        category_id: {
                                            in: filter.categoriesIds
                                        }
                                    }
                                }
                            }

                        }
                    }
                },
                stamp_id: {
                    in: filter.stampsIds,
                },
                products_variations: {
                    some: {
                        size_id: {
                            in: filter.sizesIds,
                        }
                    }
                }
            },
            orderBy: {
                id: 'asc',
            }
        });

        const _products = products.map(p => ({
            id: p.product.id,
            name: p.product.name,
            productStampId: p.id,
            variations: p.products_variations.map(v => ({
                id: v.id,
                price: v.price / 100,
                size: v.size,
                enabled: v.enabled,
            })),
            enabled: p.enabled,
            stamp: {
                id: p.stamp.id,
                name: p.stamp.name,
            },
            images: p.products_images.map(i => i.image),
            categories: p.product.products_categories.map(c => ({
                id: c.categories.id,
                name: c.categories.name
            }))
        }));
        return _products;
    }

    async findFiltersOptions(categoryId: number) {
        const categories = await this.prisma.categories.findMany({
            where: {
                products_categories: {
                    some: {
                        product: {
                            products_categories: {
                                some: {
                                    category_id: categoryId,
                                }
                            }
                        }
                    }
                },
            },
            orderBy: {
                id: 'asc',
            },
            skip: 1,
        });

        const sizes = await this.prisma.sizes.findMany({
            where: {
                products_variations: {
                    some: {
                        products_stamps: {
                            product: {
                                products_categories: {
                                    some: {
                                        category_id: categoryId,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const stamps = await this.prisma.stamps.findMany({
            where: {
                products_stamps: {
                    some: {
                        product: {
                            products_categories: {
                                some: {
                                    category_id: categoryId,
                                }
                            }
                        }
                    }
                }
            }
        });

        return {
            categories,
            stamps,
            sizes
        };
    }
}