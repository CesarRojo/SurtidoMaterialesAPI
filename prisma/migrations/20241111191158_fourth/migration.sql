/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `nombreMaterial` on the `Solicitudes` table. All the data in the column will be lost.
  - You are about to drop the column `numeroMaterial` on the `Solicitudes` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Material] DROP COLUMN [cantidad];

-- AlterTable
ALTER TABLE [dbo].[Solicitudes] DROP COLUMN [nombreMaterial],
[numeroMaterial];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
