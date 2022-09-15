# Activities Social Network

## Full-Stack application to users share their activities, and follow activities from others

## Deploy on [Heroku](https://dotnet-react-social-network.herokuapp.com/)

## Features

### Users can

- Register
- Authenticate by email or Facebook
- Check users profiles to see bio, photos, events, followers and following
- Edit their own profile
- Follow and unfollow users
- Create activities
- Edit the activities their are hosting
- Join others users activities
- Cancel attendance
- Chat in the activity
- Filter timeline by: All Activities, I'm going, I'm hosting or by date

### Methodologies

- Clean Architecture
- CQRS
- Code First Migrations

### Technologies and Tools

- [.NET Core 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

- [PostgreSQL](https://www.postgresql.org/)

- [JWT Bearer](https://jwt.io/introduction)

- [Cloudinary Media API](https://cloudinary.com/products/programmable_media)

- [SendGrid Email API](https://sendgrid.com/solutions/email-api/)

- [React](https://reactjs.org/docs/getting-started.html)

- [Typescript](https://www.typescriptlang.org/)

- [Axios](https://axios-http.com/)

- [SignalR](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr)

- [React Router](https://v5.reactrouter.com/web/guides/quick-start)

- [Rimraf](https://github.com/isaacs/rimraf)

- [Yup](https://github.com/jquense/yup)

- [MobX](https://mobx.js.org/)

- [mobx-react-lite](https://mobx.js.org/react-integration.html)

- [Formik](https://formik.org/)

- [React Calendar](https://github.com/wojtekmaj/react-calendar)

- [React Cropper](https://github.com/react-cropper/react-cropper)

- [React Inifinite Scroller](https://github.com/danbovey/react-infinite-scroller)

- [UUID](https://github.com/uuidjs/uuid)

- [React Toastify](https://github.com/fkhadra/react-toastify)

- [Semantic UI React](https://react.semantic-ui.com/)

- [Raect dropzone](https://react-dropzone.js.org/)

- [Facebook JavaScript SDK](https://developers.facebook.com/docs/javascript/quickstart)

## How to run

### Prerequisites

- [.NET Core 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

- [PostgreSQL](https://www.postgresql.org/)

- [Node](https://nodejs.org/en/)

- [NPM](https://www.npmjs.com/)

1. Config appsettings.json
2. Build the React app:

```bash
cd client-app
npm run build
```

3. Run the API:

```bash
cd ../API
dotnet run
```
