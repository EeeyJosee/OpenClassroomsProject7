-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "firstName" character varying(255) COLLATE pg_catalog."default",
    "lastName" character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;

-- Table: public.Posts

-- DROP TABLE IF EXISTS public."Posts";

CREATE TABLE IF NOT EXISTS public."Posts"
(
     id integer NOT NULL DEFAULT nextval('"Posts_id_seq"'::regclass),
    message character varying(255) COLLATE pg_catalog."default",
    "media" character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default",
    read integer[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    CONSTRAINT "Posts_pkey" PRIMARY KEY (id),
    CONSTRAINT "Posts_UserId_fkey" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Posts"
    OWNER to postgres;