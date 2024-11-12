BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Area] DROP CONSTRAINT [Area_idLinea_fkey];

-- AlterTable
ALTER TABLE [dbo].[Solicitudes] ADD [idLinea] INT;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitudes] ADD CONSTRAINT [Solicitudes_idLinea_fkey] FOREIGN KEY ([idLinea]) REFERENCES [dbo].[Linea]([idLinea]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
