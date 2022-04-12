-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "code" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
