import supertest from "supertest";
import app from "../../../server";
import * as UserFn from "../../user/user";
import * as Auth from "../../../authentication/authentication";
describe("User Routes", () => {
  it("should return with status 400 if the inputs was missing while register new user", async () => {
    await supertest(app)
      .post("/api/register/user")
      .send({
        first_name: "test",
        last_name: "user",
      })
      .expect(400);
  });
  it("should return with status 200 if the inputs was sent correctly and not already registered", async () => {
    await supertest(app)
      .post("/api/register/user")
      .send({
        first_name: "test",
        last_name: "user",
        password: "12345",
      })
      .expect(200);
  });
  it("should return with error 400 if the user is already registered", async () => {
    spyOn(UserFn, "getUser").and.returnValue(
      Promise.resolve({
        first_name: "test",
        last_name: "test",
        password: "123456",
        user_name: "test_user",
      })
    );
    await supertest(app)
      .post("/api/register/user")
      .send({
        first_name: "test",
        last_name: "user",
        password: "123456",
      })
      .expect(400);
  });
  it("should return with error 401 if the user was not logged in with expired token", async () => {
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: "",
        err: true,
      })
    );
    await supertest(app)
      .get("/api/userDetails")
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(401);
  });

  it("should return succeffully with the user if the token was not expired", async () => {
    spyOn(UserFn, "getUser").and.returnValue(
      Promise.resolve({
        first_name: "test",
        last_name: "test",
        password: "123456",
        user_name: "test_user",
      })
    );
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: {
          first_name: "test",
          last_name: "test",
          password: "123456",
          user_name: "test_user",
        },
        err: false,
      })
    );
    await supertest(app)
      .get("/api/userDetails")
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(200);
  });

  it("should return succeffully with the all users if the token was not expired", async () => {
    spyOn(UserFn, "getAllUsers").and.returnValue(
      Promise.resolve([
        {
          first_name: "test",
          last_name: "test",
          password: "123456",
          user_name: "test_user",
        },
      ])
    );
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: {
          first_name: "test",
          last_name: "test",
          password: "123456",
          user_name: "test_user",
        },
        err: false,
      })
    );
    await supertest(app)
      .get("/api/users")
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(200);
  });

  it("should return with error 401 if the user was not logged in with expired token", async () => {
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: "",
        err: true,
      })
    );
    await supertest(app)
      .get("/api/users")
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(401);
  });
});
