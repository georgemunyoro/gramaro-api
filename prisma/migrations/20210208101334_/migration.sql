-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "owner" TEXT,
    "title" TEXT,
    "content" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT,

    PRIMARY KEY ("id")
);
