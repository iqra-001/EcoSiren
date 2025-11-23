from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EcoSiren"
    API_V1_STR: str = "/api/v1"
    EE_PROJECT_ID: str = "ecosiren" 
    
    class Config:
        env_file = ".env"

settings = Settings()
