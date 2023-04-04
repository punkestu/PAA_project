-- CreateTable
CREATE TABLE "Menu" (
    "Id" SERIAL NOT NULL,
    "nama_menu" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "user_id" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("menu_id","user_id")
);
