var faker = require('faker');
var mysql = require('mysql');
     
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'gvdambros',  //your username
  database : 'join_us'         //the name of your db
});

// Not efficient
for(var i = 0; i < 500; i++){
    var person = {
        email: faker.internet.email(),
        created_at: faker.date.past()
    };
    
    connection.query('INSERT INTO users SET ?', person, function(error, result) {
      if (error) throw error;
      console.log('The solution is: ', result[0]);
    });
}

// Only one INSERT command
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}
 
connection.query('INSERT INTO users (email, created_at) VALUES ?', [data], function(err, result) {
  if(err) console.log(err);
  console.log(result);
});

connection.query('SELECT COUNT(*) AS hotmails FROM users WHERE email LIKE \'%hotmail%\'', function(err, results) {
  if(err) console.log(err);
  console.log(results[0].hotmails);
});
