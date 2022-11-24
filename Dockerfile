FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish "./API/API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5000

ENTRYPOINT ["dotnet", "API.dll"]