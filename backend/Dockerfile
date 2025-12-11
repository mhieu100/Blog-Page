# Build Stage
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy only pom.xml first for better layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Then copy source and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# Run Stage - Use Alpine for minimal size
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install only bash (very small overhead)
RUN apk add --no-cache bash

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Create optimized startup script to fix DB_URL if needed
RUN printf '#!/bin/bash\n\
if [[ "$DB_URL" != jdbc:* ]]; then\n\
  export DB_URL="jdbc:$DB_URL"\n\
  echo "Auto-fixed DB_URL to include jdbc: prefix"\n\
fi\n\
exec java \\\n\
  -XX:+UseContainerSupport \\\n\
  -XX:MaxRAMPercentage=75.0 \\\n\
  -XX:+UseG1GC \\\n\
  -XX:+UseStringDeduplication \\\n\
  -Djava.security.egd=file:/dev/./urandom \\\n\
  -jar /app/app.jar\n' > /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 8080
ENTRYPOINT ["/app/start.sh"]
