const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src");
const should = chai.should();

chai.use(chaiHttp);

describe("User Accounts", () => {
  it("Fetch all registered users", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, result) => {
        result.should.have.status(200);
        done();
      });
  });

  it("Create account", (done) => {
    chai
      .request(server)
      .post("/signup")
      .send({
        email: "test@account",
        password: "1234567890",
        username: "test_user",
      })
      .end((err, result) => {
        result.should.have.status(200);
        done();
      });
  });

  it("Block creation of multiple accounts with one email", (done) => {
    chai
      .request(server)
      .post("/signup")
      .send({
        email: "test@account",
        password: "1234567890",
        username: "test_user",
      })
      .end((err, result) => {
        chai.assert.equal(
          result.body.message,
          "The email is already registered to a user"
        );
        done();
      });
  });

  it("Login to account", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({ email: "test@account", password: "1234567890" })
      .end((err, result) => {
        result.should.have.status(200);
        done();
      });
  });

  it("Reject login with incorrect password", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({ email: "test@account", password: "WRONG_PASS" })
      .end((err, result) => {
        chai.assert.equal(result.body.message, "Incorrect password");
        done();
      });
  });

  it("Reject login with non existant email", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({ email: "non@existant", password: "1234567890" })
      .end((err, result) => {
        chai.assert.equal(result.body.message, "Could not find user");
        done();
      });
  });
});

describe("Notes", () => {
  const notes = [
    {
      title: "Title A",
      contents: "Hello, World!",
      owner: "adam",
      status: "active",
    },
    {
      title: "Title B",
      contents: "A Foo walks into a Bar",
      owner: "eve",
      status: "active",
    },
    {
      title: "Title C",
      contents: "England is my city",
      owner: "team_10",
      status: "active",
    },
  ];

  let createdNotes = [];

  it("Create notes", (done) => {
    notes.forEach((note) => {
      chai
        .request(server)
        .post("/notes")
        .send(note)
        .end((err, result) => {
          result.should.have.status(200);

          if (note == notes[notes.length - 1]) {
            chai
              .request(server)
              .get("/notes/all")
              .end((_err, _result) => {
                _result.should.have.status(200);
                chai.assert.equal(_result.body.data.notes.length, 3);
                done();
              });
          }
        });
    });
  });

  it("Fetch a list of all notes", (done) => {
    chai
      .request(server)
      .get("/notes/all")
      .end((err, result) => {
        result.should.have.status(200);
        createdNotes = result.body.data.notes;
        chai.assert.equal(result.body.data.notes.length, 3);
        done();
      });
  });

  it("Fetch a note", (done) => {
    createdNotes.forEach((note) => {
      chai
        .request(server)
        .get("/notes/id/" + note.id)
        .end((err, result) => {
          result.should.have.status(200);
          chai.assert.equal(result.body.data.note.id, note.id);
        });
    });
    done();
  });

  it("Fetch a user's notes", (done) => {
    ["eve", "adam", "team_10"].forEach((user) => {
      chai
        .request(server)
        .get("/notes/u/" + user)
        .end((err, result) => {
          result.should.have.status(200);
        });
    });
    done();
  });

  it("Update notes", (done) => {
    createdNotes.forEach((note) => {
      note.contents = "CONTENTS";
      (note.title = "TITLE"),
        chai
          .request(server)
          .patch("/notes/" + note.id)
          .send(note)
          .end((err, result) => {
            result.should.have.status(200);
          });
    });
    done();
  });

  it("Trash notes", (done) => {
    createdNotes.forEach((note) => {
      chai
        .request(server)
        .patch("/notes/trash/" + note.id)
        .end((err, result) => {
          result.should.have.status(200);

          // Ensure no notes left in database
          if (note.id == createdNotes[createdNotes.length - 1].id) {
            chai
              .request(server)
              .get("/notes/all")
              .end((_err, _result) => {
                _result.should.have.status(200);
                chai.assert.equal(
                  _result.body.data.notes.filter(
                    (note) => note.status == "trash"
                  ).length,
                  3
                );
                done();
              });
          }
        });
    });
  });

  it("Delete notes", (done) => {
    createdNotes.forEach((note) => {
      chai
        .request(server)
        .delete("/notes/" + note.id)
        .end((err, result) => {
          result.should.have.status(200);

          // Ensure no notes left in database
          if (note.id == createdNotes[createdNotes.length - 1].id) {
            chai
              .request(server)
              .get("/notes/all")
              .end((_err, _result) => {
                _result.should.have.status(200);
                chai.assert.equal(_result.body.data.notes.length, 0);
                done();
              });
          }
        });
    });
  });
});
