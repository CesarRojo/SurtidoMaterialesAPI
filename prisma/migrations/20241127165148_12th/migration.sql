BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Linea] ADD [Floor] VARCHAR(20);

-- AlterTable
ALTER TABLE [dbo].[Material] ADD [Rack] VARCHAR(20);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
