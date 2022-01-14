import supertest from "supertest";
import app from "../../../server";
import * as ProductFn from "../../product/product";
import * as Auth from "../../../authentication/authentication";
describe("Product Routes", () => {
  it("should return with status 400 if the inputs was missing while adding new product", async () => {
    await supertest(app)
      .post("/api/new/product")
      .send({
        category: "test",
      })
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(400);
  });
  it("should return the new product with status 200 if the inputs was sent correctly and not already exist", async () => {
    spyOn(ProductFn, "getProductByName").and.returnValue(
      Promise.resolve(undefined)
    );
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: {},
        err: false,
      })
    );
    await supertest(app)
      .post("/api/new/product")
      .send({
        name: "tv",
        category: "elec",
        price: 8000,
      })
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(200);
  });

  it("should return with status 401 if the token was expired", async () => {
    spyOn(ProductFn, "getProductByName").and.returnValue(
      Promise.resolve(undefined)
    );
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: {},
        err: true,
      })
    );
    await supertest(app)
      .post("/api/new/product")
      .send({
        name: "tv",
        category: "test",
      })
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(401);
  });
  it("should return with error 400 if the product is already exist", async () => {
    spyOn(ProductFn, "getProductByName").and.returnValue(
      Promise.resolve({
        name: "tv",
      })
    );
    spyOn(Auth, "verifyToken").and.returnValue(
      Promise.resolve({
        decoded: {},
        err: false,
      })
    );
    await supertest(app)
      .post("/api/new/product")
      .send({
        name: "tv",
        category: "elec",
        price: 8000,
      })
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(400);
  });

  it("should return succeffully with the product", async () => {
    spyOn(ProductFn, "getProductById").and.returnValue(
      Promise.resolve({
        name: "tv",
      })
    );
    await supertest(app)
      .get("/api/product/1")
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(200);
  });

  it("should return succeffully with the all products if the token was not expired", async () => {
    spyOn(ProductFn, "getAllProducts").and.returnValue(
      Promise.resolve([
        {
          name: "tv",
          category: "elec",
          price: 8000,
        },
      ])
    );
    await supertest(app)
      .get("/api/products")
      .set("authorization", "8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A")
      .expect(200);
  });
});
