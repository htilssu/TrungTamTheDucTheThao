FROM gradle:8.10.1-jdk22-alpine AS build

WORKDIR /app

COPY build.gradle settings.gradle gradlew gradlew.bat ./
COPY ./src ./src

RUN gradle build -x test

FROM amazoncorretto:22-alpine-full AS runtime
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
