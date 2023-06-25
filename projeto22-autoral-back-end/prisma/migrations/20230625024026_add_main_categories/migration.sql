-- CreateTable
CREATE TABLE "main_categories" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "main_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "main_categories" ADD CONSTRAINT "main_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
