# Ubuntu with timezone set to Oslo

FROM ubuntu:latest

RUN apt update && apt install -y tzdata && apt -y install locales

RUN sed -i '/nb_NO.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
    
ENV LANG nb_NO.UTF-8
ENV LANGUAGE nb_NO:nb
ENV LC_ALL nb_NO.UTF-8

ENV TZ="Europe/Oslo"