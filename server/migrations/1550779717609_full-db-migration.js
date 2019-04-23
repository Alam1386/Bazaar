exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "bazaar"."users" (
      "user_id" SERIAL PRIMARY KEY,
      "first_name" TEXT,
      "last_name"  TEXT,
      "email" TEXT NOT NULL,
      "user_name" TEXT,
      "password" TEXT NOT NULL,
      "status" TEXT, 
      "country" TEXT,
      "date_created" DATE,
      "age"   INT,
      "gender" TEXT,
      "rating" INT
    );
  `),
  
  pgm.sql(`
    CREATE TABLE "bazaar"."items"(
      "item_id" SERIAL PRIMARY KEY,
      "name" TEXT,
      "type" TEXT,
      "status" TEXT,
      "price" FLOAT,
      "inventory" TEXT,
      "description" TEXT,
      "thumbnail_url" TEXT,
      "condition" TEXT,
      "owner_id" INT,
      "date_created" DATE,
      "amount_sold" FLOAT,
      FOREIGN KEY (owner_id) REFERENCES bazaar.users (user_id) 
    );
  `)
  pgm.sql(`
    CREATE TABLE "bazaar"."stripe"(
      "stripe_id" SERIAL PRIMARY KEY,
      "user_id" INT,
      "last_updated" DATE,
      FOREIGN KEY (user_id) REFERENCES bazaar.users (user_id) 
    );
  `)
  pgm.sql(`
  CREATE TABLE "bazaar"."transactions"(
    "transaction_id" SERIAL PRIMARY KEY,
    "stripe_charge_id" INT,
    "purchase_date" DATE,
    FOREIGN KEY (stripe_charge_id) REFERENCES bazaar.stripe (stripe_id) 
  );
`)
  pgm.sql(`
    CREATE TABLE "bazaar"."purchased_items"(
      "purchased_id" SERIAL PRIMARY KEY,
      "item_id" INT,
      "purchased_from" INT,
      "shipping_status" TEXT,
      "purchase_date" DATE,
      "owner_id" INT,
      "purchased_quantity" INT,
      "transaction_id" INT,
      FOREIGN KEY (item_id) REFERENCES bazaar.items (item_id),
      FOREIGN KEY (purchased_from) REFERENCES bazaar.users (user_id),
      FOREIGN KEY (owner_id) REFERENCES bazaar.users (user_id),
      FOREIGN KEY (transaction_id) REFERENCES bazaar.transactions (transaction_id)    
    );
  `)
 
  pgm.sql(`
    CREATE TABLE "bazaar"."ratings"(
      "rating_id" SERIAL PRIMARY KEY,
      "rater_id" INT,
      "ratee_id" INT,
      "rating" INT,
      "review" TEXT,
      FOREIGN KEY (rater_id) REFERENCES bazaar.users (user_id),
      FOREIGN KEY (ratee_id) REFERENCES bazaar.users (user_id)
    );
  `)
  
  /* TODO: add more migrations */
};