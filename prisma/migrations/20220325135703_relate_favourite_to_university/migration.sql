-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
