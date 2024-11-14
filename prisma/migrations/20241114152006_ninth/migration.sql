BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Material] ALTER COLUMN [numero] VARCHAR(50) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
