FROM postgres:15.3
ENV POSTGRES_USER test
ENV POSTGRES_PASSWORD test1234
ENV POSTGRES_DB todoTask
ENV PGDATA /var/lib/postgresql/data/pgdata
COPY ./initSQL/init.sql /docker-entrypoint-initdb.d/