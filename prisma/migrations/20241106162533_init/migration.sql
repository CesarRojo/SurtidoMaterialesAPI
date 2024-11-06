BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Linea] (
    [idLinea] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [materialista] VARCHAR(100),
    [fecha] DATETIME2,
    CONSTRAINT [Linea_pkey] PRIMARY KEY CLUSTERED ([idLinea])
);

-- CreateTable
CREATE TABLE [dbo].[Area] (
    [idArea] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [idLinea] INT,
    CONSTRAINT [Area_pkey] PRIMARY KEY CLUSTERED ([idArea])
);

-- CreateTable
CREATE TABLE [dbo].[Material] (
    [idMaterial] INT NOT NULL IDENTITY(1,1),
    [numero] INT NOT NULL,
    [nombre] VARCHAR(100) NOT NULL,
    [cantidad] INT NOT NULL,
    [idArea] INT,
    CONSTRAINT [Material_pkey] PRIMARY KEY CLUSTERED ([idMaterial])
);

-- CreateTable
CREATE TABLE [dbo].[UbicacionRack] (
    [idRack] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [digitos] INT,
    [idMaterial] INT,
    CONSTRAINT [UbicacionRack_pkey] PRIMARY KEY CLUSTERED ([idRack])
);

-- CreateTable
CREATE TABLE [dbo].[Solicitudes] (
    [idSolicitud] INT NOT NULL IDENTITY(1,1),
    [idArea] INT,
    [numeroMaterial] INT NOT NULL,
    [nombreMaterial] VARCHAR(100) NOT NULL,
    [cantidad] INT NOT NULL,
    [estado] VARCHAR(50) NOT NULL,
    [fechaSolicitud] DATETIME2,
    CONSTRAINT [Solicitudes_pkey] PRIMARY KEY CLUSTERED ([idSolicitud])
);

-- AddForeignKey
ALTER TABLE [dbo].[Area] ADD CONSTRAINT [Area_idLinea_fkey] FOREIGN KEY ([idLinea]) REFERENCES [dbo].[Linea]([idLinea]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Material] ADD CONSTRAINT [Material_idArea_fkey] FOREIGN KEY ([idArea]) REFERENCES [dbo].[Area]([idArea]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UbicacionRack] ADD CONSTRAINT [UbicacionRack_idMaterial_fkey] FOREIGN KEY ([idMaterial]) REFERENCES [dbo].[Material]([idMaterial]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitudes] ADD CONSTRAINT [Solicitudes_idArea_fkey] FOREIGN KEY ([idArea]) REFERENCES [dbo].[Area]([idArea]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
