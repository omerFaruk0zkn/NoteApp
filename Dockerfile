# Kullanılacak base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .

# Projeyi build et
RUN dotnet restore "NoteAppAPI.csproj"
RUN dotnet build "NoteAppAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NoteAppAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NoteAppAPI.dll"]
