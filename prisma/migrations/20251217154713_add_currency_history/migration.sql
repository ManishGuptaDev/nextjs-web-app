/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "usdValue" DOUBLE PRECISION NOT NULL,
    "convertedCurrency" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "convertedValue" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);
