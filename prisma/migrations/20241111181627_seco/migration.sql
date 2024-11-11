BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Material] DROP CONSTRAINT [Material_idArea_fkey];

-- AlterTable
ALTER TABLE [dbo].[Solicitudes] ADD [idMaterial] INT;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitudes] ADD CONSTRAINT [Solicitudes_idMaterial_fkey] FOREIGN KEY ([idMaterial]) REFERENCES [dbo].[Material]([idMaterial]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
