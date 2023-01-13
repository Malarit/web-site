import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from utils import create_folder
from routers import admin, user

app = FastAPI()

app.mount("/api/media", StaticFiles(directory="media"), name="media")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)


app.include_router(user.router)
app.include_router(admin.router)


if __name__ == "__main__":
    create_folder(r"./", "media")
    create_folder(r"./media/", "banners")
    create_folder(r"./media/", "product")
    create_folder(r"./media/", "category")

    uvicorn.run("main:app", port=5000, log_level="info", reload=True)
