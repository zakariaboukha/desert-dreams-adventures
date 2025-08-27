@echo off
echo Running Database Manager...
node --experimental-modules create_table.js %*
pause