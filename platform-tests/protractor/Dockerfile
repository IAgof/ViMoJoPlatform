# vim:set ft=dockerfile:
# Vimojo platform End2End test runner
FROM mrsheepuk/protractor
MAINTAINER jliarte@videona.com
RUN echo "deb http://ftp.uk.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        ffmpeg
RUN npm install protractor-video-reporter
RUN npm install jasmine-reporters
RUN npm install jasmine-spec-reporter
RUN npm install jasmine-spec-name-patch
RUN npm install jasmine-expect
RUN npm install jasmine-protractor-matchers
RUN npm install protractor-jasmine2-screenshot-reporter
COPY ./platform-tests/protractor/* /project/