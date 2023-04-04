-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
