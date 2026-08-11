# from fastapi import FastAPI, UploadFile, File
# from fastapi.staticfiles import StaticFiles
# #Turns a normal folder into something a browser can access.
# import shutil
# #Turns a normal folder into something a browser can access.
# import os
# #This is the “talk to your computer’s file system” tool
# # Check if folders exist, Create folders, Work with file paths
# app = FastAPI()

# # serve images folder
# if not os.path.exists("images"):
#     # “Check if a folder called images exists.
#     os.makedirs("images")
#     # If it doesn’t, create it.”
# # It checks and creates the folder inside your backend project directory, not your whole computer.
# app.mount("/images", StaticFiles(directory="images"), name="images")
# #/images is folder that when user visit /images it just give them specific file inside it, it doesn't run the code.
# # StaticFiles = the engine that knows how to serve files
# # app.mount() = the connector that attaches that engine to a URL
# # directory="images" tells FastAPI where the files are
# # name="images" is just a label for FastAPI’s internal use (optional)
# @app.post("/upload/")
# async def upload_image(file: UploadFile = File(...)):
#     #file --> This is just the parameter name, it's what your function receives
#     #uploadfile --> This parameter will be an uploaded file.
#     # File(...) is what makes FastAPI treat this parameter as an uploaded file
#     # The ... means required
#     file_path = f"images/{file.filename}"
#     #the original filename provided by the client
#     with open(file_path, "wb") as buffer:
#         #This creates a file at that location (if it doesn’t exist)
#         #with auto close file 
#         #wb --> “Open this file for writing in binary mode.” why bc image and videos and pdf aren't text 
#         shutil.copyfileobj(file.file, buffer)
#         #shutil.copyfileobj --> transfers data:
#         #Copies data from the uploaded file into your local file.
#         #file.file → the uploaded file stream (coming from the user)
#         #buffer → A buffer is a temporary place where data is held before being processed or saved.

#     return {"url": f"http://127.0.0.1:8000/images/{file.filename}"}