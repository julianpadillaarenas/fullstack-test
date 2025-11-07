-- CreateEnum
CREATE TYPE "AuthorizationRequestTypeOfRequest" AS ENUM ('deployment', 'access', 'technical_change');

-- CreateEnum
CREATE TYPE "AuthorizationRequestStatus" AS ENUM ('approve', 'denied', 'pending');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorization_requests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requestingUserId" TEXT NOT NULL,
    "responsibleUserId" TEXT NOT NULL,
    "typeOfRequest" "AuthorizationRequestTypeOfRequest" NOT NULL,
    "status" "AuthorizationRequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorization_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorization_request_histories" (
    "id" TEXT NOT NULL,
    "authorizationRequestId" TEXT NOT NULL,
    "status" "AuthorizationRequestStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionUserId" TEXT NOT NULL,
    "commentary" TEXT NOT NULL,

    CONSTRAINT "authorization_request_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "authorization_requests_requestingUserId_idx" ON "authorization_requests"("requestingUserId");

-- CreateIndex
CREATE INDEX "authorization_requests_responsibleUserId_idx" ON "authorization_requests"("responsibleUserId");

-- CreateIndex
CREATE INDEX "authorization_request_histories_authorizationRequestId_idx" ON "authorization_request_histories"("authorizationRequestId");

-- AddForeignKey
ALTER TABLE "authorization_requests" ADD CONSTRAINT "authorization_requests_requestingUserId_fkey" FOREIGN KEY ("requestingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorization_requests" ADD CONSTRAINT "authorization_requests_responsibleUserId_fkey" FOREIGN KEY ("responsibleUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorization_request_histories" ADD CONSTRAINT "authorization_request_histories_authorizationRequestId_fkey" FOREIGN KEY ("authorizationRequestId") REFERENCES "authorization_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
