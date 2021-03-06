# YourNewWebApp

[Your New Web App](https://yournewwebapp.com "Helping You Build Your New Web App") is a blog where I write coding guides. You can view its up-to-date source code in this repository.

You will not find detailed comments within my code itself. If you would like to know more about how I built Your New Web App, be sure to check out [the blog page](https://yournewwebapp.com/blogs "The Latest Coding Guides at Your New Web App") where I write about some of the topics in more detail. 

Your New Web App consists of three self-built apps:
- A Server-Side Rendered Vue.js App, and:
- Two Express.js REST API's.

If you want to test the code locally, you will need to have instances of both MongoDB and Redis running.

To bundle the front-end app, be sure to set the environment variable to production and run the following commands. You can also find these commands in the package.json file.
```
npm run build:server
npm run build:client
```

In addition, I use several .env variables throughout the application, which I have not committed to this public Github repo. If you want the app to function properly, make sure to add the following environment variables:

```
## frontend/.env
APP_PORT=3000
SSR=true

VITE_BLOG_SERVER=http://localhost:1234
VITE_USER_SERVER=http://localhost:5678

// If production
NODE_ENV=production
```
```
## backend/blogApp/.env
ALLOWED_ORIGIN_HOSTS=['http://localhost:3000, 'http://anotherhost:2345']
APP_PORT=1234

JWT_ACCESS_KEY=supermagicpasswordone

MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=YNWABlogApp

REDIS_HOST=localhost
REDIS_PORT=6379

USER_SERVER=http://localhost:5678

// If production
MONGO_INITDB_ROOT_USERNAME=someuser
MONGO_INITDB_ROOT_PASSWORD=somepassword
REDIS_PASSWORD=someotherpassword

NODE_ENV=production
```
```
## backend/userApp/.env
ALLOWED_ORIGIN_HOSTS=['http://localhost:3000', 'http://anotherhost:3456']

APP_PORT=5678

JWT_ACCESS_KEY=supermagicpasswordone
JWT_REFRESH_KEY=supermagicpasswordtwo

MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=YNWAUserApp

REDIS_HOST=localhost
REDIS_PORT=6379

// If production
MONGO_INITDB_ROOT_USERNAME=someuser
MONGO_INITDB_ROOT_PASSWORD=somepassword
REDIS_PASSWORD=someotherpassword

NODE_ENV=production

// Nodemailer Configuration.
NODEMAILER_USER=somebody
NODEMAILER_PASSWORD=something
NODEMAILER_SENDER=someemail
SMTP_HOST=somehost
```