export default {
    tableSpace: "pg_default",
    owner: "postgres",
    tables: [
        {
            name: 'public."Users"',
            columns: [
                'email text COLLATE pg_catalog."default" NOT NULL',
                'username text COLLATE pg_catalog."default" NOT NULL',
                'password text COLLATE pg_catalog."default" NOT NULL',
                '"profilePicture" text COLLATE pg_catalog."default"',
                'CONSTRAINT "Users_pkey" PRIMARY KEY (email)'
            ]
        },
        {
            name: 'public."Products"',
            columns: [
                'id text COLLATE pg_catalog."default" NOT NULL',
                'picture text COLLATE pg_catalog."default"',
                'title text COLLATE pg_catalog."default"',
                "price integer",
                "rating smallint",
                'CONSTRAINT "Products_pkey" PRIMARY KEY (id)'
            ]
        },
        {
            name: 'public."Carts"',
            columns: [
                '"cartId" integer NOT NULL DEFAULT nextval(\'"Carts_cartId_seq"\'::regclass)',
                '"userId" text COLLATE pg_catalog."default" NOT NULL',
                '"dateCreated" date',
                '"checkedOut" boolean NOT NULL',
                'CONSTRAINT "Carts_pkey1" PRIMARY KEY ("cartId")'
            ]
        },
        {
            name: 'public."CartItems"',
            columns: [
                "id integer NOT NULL DEFAULT nextval('\"CartItems_id_seq\"'::regclass)",
                '"cartId" integer NOT NULL',
                '"productId" text COLLATE pg_catalog."default" NOT NULL',
                "quantity integer NOT NULL",
                'CONSTRAINT "CartItems_pkey" PRIMARY KEY (id)'
            ]
        }
    ]
};
