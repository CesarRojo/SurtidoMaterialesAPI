/*
  Warnings:

  - You are about to drop the column `fecha` on the `Linea` table. All the data in the column will be lost.
  - You are about to drop the column `materialista` on the `Linea` table. All the data in the column will be lost.
  - Added the required column `IdentificadorLinea` to the `Linea` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Linea] DROP COLUMN [fecha],
[materialista];
ALTER TABLE [dbo].[Linea] ADD [IdentificadorLinea] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
