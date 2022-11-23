from typing import Optional

from pydantic import BaseModel, UUID4


class category(BaseModel):
    name: str
    parent_id: Optional[int] = None
