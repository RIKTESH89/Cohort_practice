import { Client } from 'pg'

const client = new Client({
  connectionString: "postgresql://test1_owner:rPT9kYXGUJ5l@ep-red-lake-a5th3d0b.us-east-2.aws.neon.tech/cohort-SQL?sslmode=require"
})

async function gettableUsers() {
    await client.connect();
    const getQuery = 'SELECT * FROM users where email = $1'
    const result = await client.query(getQuery,['test1@t.com']);
    console.log(result.rows[0]);
}

gettableUsers();