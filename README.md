# YourNewWebApp

[Your New Web App](https://yournewwebapp.com "Helping You Build Your New Web App") is a blog where I write coding guides. You can view its up-to-date source code in this repository.

Your New Web App consists of three self-built apps:
- A Server-Side Rendered Vue.js App,, and:
- Two Express.js REST API's.

If you want to test the code locally, you will also need to have local instances of both MongoDB and Redis running.

In addition, I use several .env variables throughout the application, which I have not committed to this public Github repo. If you want the app to properly function, make sure to add the following environment variables:

```
// frontend/.env
APP_PORT=3000

NODE_ENV=production
SSR=true

VITE_BLOG_SERVER=http://localhost:1234
VITE_USER_SERVER=http://localhost:5678

// backend/blogApp/.env


// backend/userApp/.env
```