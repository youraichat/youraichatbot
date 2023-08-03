# YOUR AI CHAT BOT

### License
[MIT](./LICENSE)

###  Services
![YOURAICHATBOT](https://img.shields.io/badge/youraichatbot-%23662200.svg?style=for-the-badge&logo=pibble&logoColor=white)
![Flowise](https://img.shields.io/badge/flowise.ai-%23404d59.svg?style=for-the-badge&logo=flowise&logoColor=%231143FB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Nest.js](https://img.shields.io/badge/nest.js-%23404d59.svg?style=for-the-badge&logo=nest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23714d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


### How to start
Install Docker


```
git clone https://github.com/youraichat/youraichatbot.git
```

```
cp .env.example .env
```

Set your environment variables
```
BACKEND_DN=http://localhost:5000  # * this is important you need to backend final public url - ex: https://api.yourdomain.com
FLOWISE_PORT=3030
BACKEND_PORT=5000
FRONTEND_PORT=3000

# FLOWISE
FLOWISE_USERNAME=youraichat
FLOWISE_PASSWORD=12341234
DEBUG=false
DATABASE_PATH=/root/.flowise
APIKEY_PATH=/root/.flowise
PASSPHRASE=MYPASSPHRASE
SECRETKEY_PATH=/root/.flowise
LOG_PATH=/root/.flowise/logs

# DATABASE_TYPE=postgres
# DATABASE_PORT=""
# DATABASE_HOST=""
# DATABASE_NAME="flowise"
# DATABASE_USER=""
# DATABASE_PASSWORD=""
# OVERRIDE_DATABASE=true

# FLOWISE_USERNAME=user
# FLOWISE_PASSWORD=1234
# DEBUG=true
# LOG_LEVEL=debug (error | warn | info | verbose | debug)
# EXECUTION_MODE=main (child | main)
# TOOL_FUNCTION_BUILTIN_DEP=crypto,fs
# TOOL_FUNCTION_EXTERNAL_DEP=moment,lodash

# LANGCHAIN_TRACING_V2=true
# LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
# LANGCHAIN_API_KEY=your_api_key
# LANGCHAIN_PROJECT=your_project


DB_HOST=db                                # Don't change this
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=youraichat

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=                                
MAIL_FROM=                                

DEFAULT_ADMIN_EMAIL=                      #DEFAULT ADMIN email - required
DEFAULT_ADMIN_FIRSTNAME=                  #DEFAULT ADMIN Firstname - required
DEFAULT_ADMIN_LASTNAME=                   #DEFAULT ADMIN Lastname - required
DEFAULT_ADMIN_PASSWORD=                   #DEFAULT ADMIN PASSWORD - required


JWT_SECRET=UZKKyFwXs5                     #JWT SECRET - required
```

Start Project
```
docker compose up
```

Set up the Nginx or your proxy server

ex:

!-- Backend: api.youraichatbot.com

!-- Frontend: mgmt.youraichatbot.com

!-- Flowise: flowise.youraichatbot.com


### Issue Report

Github

https://github.com/youraichat/youraichatbot/issues


Discord

https://discord.gg/8vHtX34cJe
