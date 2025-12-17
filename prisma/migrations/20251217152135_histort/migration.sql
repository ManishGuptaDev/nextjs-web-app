-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "usdValue" INTEGER NOT NULL,
    "convertedCurrency" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "convertedValue" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
