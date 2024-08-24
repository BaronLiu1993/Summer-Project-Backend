# Stage for resolving and downloading dependencies
FROM maven:3.8.3-openjdk-17 AS deps

WORKDIR /build

# Copy the mvnw wrapper with executable permissions
COPY --chmod=0755 mvnw mvnw
COPY .mvn/ .mvn/

# Download dependencies as a separate step to leverage Docker's caching
RUN --mount=type=bind,source=pom.xml,target=pom.xml \
    --mount=type=cache,target=/root/.m2 \
    ./mvnw dependency:go-offline -DskipTests

# Stage for building the application
FROM deps AS package

WORKDIR /build

COPY . .

# Ensure the mvnw script is executable
RUN chmod +x mvnw

RUN --mount=type=bind,source=pom.xml,target=pom.xml \
    --mount=type=cache,target=/root/.m2 \
    ./mvnw package -DskipTests && \
    mv target/demo-0.0.1-SNAPSHOT.jar target/app.jar

# Stage for running the application with Redis tools
FROM openjdk:17-jdk-slim AS final

# Switch to root to install additional tools
USER root

# Install Redis tools
RUN apt-get update && apt-get install -y redis-tools

# Create a non-privileged user that the app will run under
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Switch back to non-privileged user
USER appuser

# Copy the executable from the "package" stage
COPY --from=package /build/target/app.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
