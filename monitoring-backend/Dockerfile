FROM openjdk:11.0.4-jre-slim

# Add the .jar file to the image
# docker build -t <image-name>:<tag> --build-arg SPRING_ACTIVE_PROFILE=profile .
ARG SPRING_ACTIVE_PROFILE="production"

ADD /build/libs/service-monitor-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-Dspring.profiles.active=${SPRING_ACTIVE_PROFILE}","-jar","/app.jar"]
