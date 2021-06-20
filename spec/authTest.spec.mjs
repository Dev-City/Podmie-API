import request from "request";

describe("login user", () => {
  it("should return 200 as OK and authenticate user", (done) => {
    request("http://localhost:5000/api/auth/login", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("should return data of a user", (done) => {
    request("http://localhost:5000/api/auth/login", (err, res) => {
      expect(JSON.parse(res.token).length).toBeGreaterThan(0);
    });
  });
});
