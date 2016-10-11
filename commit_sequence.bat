@echo off

echo STARTING SEQUENCE
echo.
git checkout master
echo.
echo RUNNING ADD COMMAND FOR MASTER
echo.
git add .
echo.
echo RUNNING COMMIT COMMAND FOR MASTER
echo.
git commit -m "Latest Commit"
echo.
echo RUNNING PUSH COMMAND FOR MASTER
git push origin master
echo.
echo CHANGE TO ANOTHER BRANCES
echo.
git checkout gh-pages
echo.
echo COPYING ANYTHING FROM MAIN BRANCES
echo.
git merge master
echo.
echo RUNNING PUSH COMMAND FOR gh-pages
echo.
git push origin gh-pages
echo.
echo RETURN TO MAIN BRANCES
git checkout master
