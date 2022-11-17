from fastapi import FastAPI
from uuid import uuid4

app = FastAPI()
uuid = uuid4()


@app.get("/")
async def root():
    return {'uuid': uuid}