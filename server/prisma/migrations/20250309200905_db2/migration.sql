/*
  Warnings:

  - A unique constraint covering the columns `[groupId,userId]` on the table `GroupChatMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupChatMember_groupId_userId_key" ON "GroupChatMember"("groupId", "userId");
