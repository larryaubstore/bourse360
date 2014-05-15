var neo4j = require("neo4j-js");


describe("neo4j-js tests", function () {

  var graph;
  beforeEach(function () {
    var dbConnected = false;
    var count = 0;
    var batch;
    var query;

    runs(function () {
      neo4j.connect('http://localhost:7474/db/data/', function (err, db) {
          if (!err) {
            graph = db;
            dbConnected = true;
          }
      });
    });

    waitsFor(function() {
      return dbConnected == true;
    }, "DB connection failed", 2000);

    runs(function () {
      batch = graph.createBatch();
      query = [
          'MATCH (n {debug : "true"})-[r]->(m) delete r'
      ];
      graph.query(batch, query.join('\n'), null, function (err, results) {
          debugger;
          if (!err) {
            count++;
          }
      });

      query = [
          'MATCH (n {debug : "true", id : "6"}) delete n'
      ];
      graph.query(batch, query.join('\n'), null, function (err, results) {
          if (!err) {
            count++;
          }
      });
      batch.run();
    });

    waitsFor(function () {
      return count == 2;
    }, "BeforeEach Queries never executed", 2500);
  });


  it("create nodes", function () {

      var batch, query, queryResults, count = 0;

      batch = graph.createBatch();
      query = [
          'CREATE (person_1 {id: "6", debug: "true"})'
      ];
      graph.query(batch, query.join('\n'), null, function (err, results) {
          if (!err) {
            count++;
          }
      });

      query = [
          'MATCH (m { id: "6", debug: "true" }) return m'
      ];
      graph.query(batch, query.join('\n'), null, function (err, results) {
          if (!err) {
            queryResults = results;
            count++;
          }
      });
      batch.run();

      waitsFor(function () {
        return count == 2;
      }, "Queries never executed", 2500);
  });


//  MATCH (u:User {username:'admin'}), (r:Role {name:'ROLE_WEB_USER'})
//  CREATE (u)-[:HAS_ROLE]->(r)

  it("create node and add a relationships in second time", function () {

      var batch, query, queryResults, count = 0;

      batch = graph.createBatch();
      query = [
          'CREATE (person_1 {id: "6", debug: "true"})',
      ];
      graph.query(batch, query.join('\n'), null, function (err, results) {

          
          if (!err) {
            count++;
          }
      });

      query = [
          'CREATE (person_2 {id: "7", debug: "true"})',
      ];
      graph.query(batch, query.join('\n'), null, function (err, results) {
          if (!err) {
            count++;
          }
      });

      batch.run();

      waitsFor(function () {
        return count == 2;
      }, "Creation queries never executed", 2500);

      runs(function () {
        batch = graph.createBatch();
        query = [
          'MATCH (m { id: "6", debug: "true" }), (r { id: "7", debug: "true" })',
          'CREATE (m)-[:EMAILED]->(r)'
        ];
        graph.query(batch, query.join('\n'), null, function (err, results) {
            if (!err) {
              queryResults = results;
              count++;
            } else {
              debugger;
            }
        });
        batch.run();
      });

      waitsFor(function () {
        return count == 3;
      }, "Query with relationship never executed", 2500);
  


  });



});
