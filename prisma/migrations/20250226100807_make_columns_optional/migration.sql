/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "user_picture" TEXT;
